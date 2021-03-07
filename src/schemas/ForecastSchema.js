export default class ForecastSchema {
  static schema = {
    name: 'forecast',
    properties: {
      date: 'string',
      weekday: 'string',
      max: 'int',
      min: 'int',
      description: 'string',
      condition: 'string',
    },
  };
}
