import { combineReducers } from 'redux';
import { mapDataReducer,
         mapDimensionsReducer,
         isLoadingReducer,
         districtTypeReducer} from './reducers';

const NYCETAppReducers = combineReducers({
  mapData: mapDataReducer,
  mapDimensions: mapDimensionsReducer,
  isLoading: isLoadingReducer,
  districtType: districtTypeReducer
});

export default NYCETAppReducers;
