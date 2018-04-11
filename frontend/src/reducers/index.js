import { combineReducers } from 'redux';
import { mapStateReducer, mapDimensionsReducer, depthLevelReducer } from './reducers';

const NYCETAppReducers = combineReducers({
  mapComponents: mapStateReducer,
  mapDimensions: mapDimensionsReducer,
  depthLevel: depthLevelReducer
});

export default NYCETAppReducers;
