import { combineReducers } from 'redux';
import { mapStateReducer, mapDimensionsReducer } from './reducers';

const NYCETAppReducers = combineReducers({
  mapComponents: mapStateReducer,
  mapDimensions: mapDimensionsReducer
});

export default NYCETAppReducers;
