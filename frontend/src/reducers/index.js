import { combineReducers } from 'redux';
import { topLevelMapReducer,
         EDLevelMapReducer,
         mapDimensionsReducer, 
         depthLevelReducer } from './reducers';

const NYCETAppReducers = combineReducers({
  topLevelMap: topLevelMapReducer,
  EDLevelMap: EDLevelMapReducer,
  mapDimensions: mapDimensionsReducer,
  depthLevel: depthLevelReducer
});

export default NYCETAppReducers;
