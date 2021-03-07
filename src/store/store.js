import { createStore, applyMiddleware } from 'redux';
import reducers from '~/store/reducers/index'
import createSagaMiddleware from 'redux-saga';
import forecastSaga from './sagas/weatherForecastSaga'
import Reactotron from 'reactotron-react-native'

const sagaMonitor = Reactotron.createSagaMonitor()
const sagaMiddleware = createSagaMiddleware({ sagaMonitor } )

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(forecastSaga)


export default store;