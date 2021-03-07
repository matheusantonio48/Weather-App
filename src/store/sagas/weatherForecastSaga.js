import { call, put, takeLatest, delay } from 'redux-saga/effects';
import api from '~/services/api'
import getRealm from '~/services/realm';
import weather from '~/schemas/WeatherForecastSchema'
import forecast from '~/schemas/ForecastSchema'
import NetInfo from "@react-native-community/netinfo";
import Geolocation from 'react-native-geolocation-service';
import { ToastAndroid  } from 'react-native';

function* feedRealm(action) {
  try {
    const online = yield NetInfo.fetch();
    const positions = []

    if (online.isConnected) {
      Geolocation.getCurrentPosition(
        (position) => {
          positions.push({latitude: position.coords.latitude, longitude: position.coords.longitude})
        },
        (error) => { console.log(error.code, error.message) },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      )
        yield delay(500)
      const response = yield call(
        api.get,
        `/weather?key=c136124e&lat=${positions[0].latitude}&lon=${positions[0].longitude}&user_ip=remote`
      );

      const weatherForecast = response ? response.data.results : [];

      const realm = yield getRealm();

      realm.write(() => {
        realm.delete(realm.objects('Weather'));
        realm.delete(realm.objects('forecast'));
        realm.create('Weather', weatherForecast)
        weatherForecast.forecast.forEach((values) => {
          realm.create('forecast', values)
        });
      })

      realm.close()

      yield delay(500)
    } else {
      ToastAndroid.show("Sem conexão com a internet.", ToastAndroid.SHORT);
    }

    const Realm = require('realm');
    const todayData = []
    const forecastData = []

    const databaseToday = {
      schema: [weather, forecast]
    };

    Realm.open(databaseToday).then(realm => {
      let today = realm.objects('Weather')
      today.map((category) => {
        todayData.push({
          temp: category.temp,
          time: category.time,
          date: category.date,
          description: category.description,
          currently: category.currently,
          city: category.city,
          condition_slug: category.condition_slug
        });
      });
      let forecast = realm.objects('forecast')
      forecast.map((category) => {
        forecastData.push({
          description: category.description,
          condition: category.condition,
          weekday: category.weekday,
          date: category.date,
          max: category.max,
          min: category.min
        });
      });
    });

    yield delay(500)
    const allData = [
      ...todayData,
      ...forecastData
    ]

    yield delay(500)
    yield put({ type: 'GET_FORECAST_SUCESS', weatherForecast: allData})
  } catch (e) {
    yield put({ type: 'GET_FORECAST_FAILED', message: e.message })
  }
}

function* forecastSaga() {
  yield takeLatest('GET_FORECAST_REQUESTED', feedRealm);
}

export default forecastSaga;