import { combineReducers } from 'redux';
import { mapDataReducer,
         mapDimensionsReducer,
         sidebarDimensionsReducer,
         districtTypeReducer,
         parentDistrictTypeReducer,
         selectedDistrictReducer,
         //temp and hardcoded, will allow diane to do her magic
         selectedElectionReducer,
         winningPartyReducer,
         highlightedEdDataReducer } from './reducers';


const NYCETAppReducers = combineReducers({
  mapData: mapDataReducer,
  mapDimensions: mapDimensionsReducer,
  sidebarDimensions: sidebarDimensionsReducer,
  districtType: districtTypeReducer,
  parentDistrictType: parentDistrictTypeReducer,
  selectedDistrict: selectedDistrictReducer,
  selectedElection: selectedElectionReducer,
  winningParty: winningPartyReducer,
  highlightedEdData: highlightedEdDataReducer
});

export default NYCETAppReducers;
