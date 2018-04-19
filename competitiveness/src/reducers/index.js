import { combineReducers } from 'redux';
import { mapDataReducer,
         mapDimensionsReducer,
         districtTypeReducer,
         parentDistrictTypeReducer,
         selectedDistrictReducer,
         //temp and hardcoded, will allow diane to do her magic
         selectedElectionReducer,
         highlightedEdDataReducer } from './reducers';


const NYCETAppReducers = combineReducers({
  mapData: mapDataReducer,
  mapDimensions: mapDimensionsReducer,
  districtType: districtTypeReducer,
  parentDistrictType: parentDistrictTypeReducer,
  selectedDistrict: selectedDistrictReducer,
  selectedElection: selectedElectionReducer,
  highlightedEdData: highlightedEdDataReducer
});

export default NYCETAppReducers;
