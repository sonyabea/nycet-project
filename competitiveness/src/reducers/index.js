import { combineReducers } from 'redux';
import { mapDataReducer,
         mapDimensionsReducer,
         isLoadingReducer,
         districtTypeReducer,
         parentDistrictTypeReducer,
         selectedDistrictReducer } from './reducers';

const NYCETAppReducers = combineReducers({
  mapData: mapDataReducer,
  mapDimensions: mapDimensionsReducer,
  isLoading: isLoadingReducer,
  districtType: districtTypeReducer,
  parentDistrictType: parentDistrictTypeReducer,
  selectedDistrict: selectedDistrictReducer
});

export default NYCETAppReducers;
