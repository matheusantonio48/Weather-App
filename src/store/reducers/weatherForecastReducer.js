import * as type from '../types'
 
const initialState = {
  weatherForecast: [],
  loading: false,
  error: null
}

export default function weatherForecast(state = initialState, action) {
  switch (action.type){
    case type.GET_FORECAST_SUCESS:
      return{
        ...state,
        loading: false,
        weatherForecast: action.weatherForecast
      }
      case type.GET_FORECAST_FAILED:
      return{
        ...state,
        loading: false,
        error: action.message
      }
      case type.GET_FORECAST_REQUESTED:
        return{
          ...state,
          loading: true
        }
    default:
      return state;
  }
}