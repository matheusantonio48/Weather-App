export default class WeatherForecast {
  static schema = {
    name: 'Weather',
    properties: {
      currently: 'string',
      date: 'string',
      description: 'string',
      temp: 'int',
      time: 'string',
      city: 'string',
      condition_slug:'string'
    },
  };
}
