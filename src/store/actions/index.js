import api from '~/services/api';
import * as type from '~/store/types'

function forecast(data) {
  return {
    type: type.GET_FORECAST_REQUESTED,
    payload: data
  }
}

export default forecast;