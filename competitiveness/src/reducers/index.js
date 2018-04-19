import { combineReducers } from 'redux';
import { mapDataReducer,
         mapDimensionsReducer,
         districtTypeReducer,
         parentDistrictTypeReducer,
         selectedDistrictReducer } from './reducers';

const NYCETAppReducers = combineReducers({
  mapData: mapDataReducer,
  mapDimensions: mapDimensionsReducer,
  districtType: districtTypeReducer,
  parentDistrictType: parentDistrictTypeReducer,
  selectedDistrict: selectedDistrictReducer
});

export default NYCETAppReducers;
