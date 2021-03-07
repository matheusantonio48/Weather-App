import Realm from 'realm';

import WeatherForecastSchema from '../schemas/WeatherForecastSchema';
import ForecastSchema from '../schemas/ForecastSchema';

export default function getRealm() {
  return Realm.open({
    schema: [WeatherForecastSchema, ForecastSchema],
  });
}
