import {combineReducers} from 'redux'
import forecast from './weatherForecastReducer'

const rootReducer = combineReducers({
forecast: forecast
});

export default rootReducer;

