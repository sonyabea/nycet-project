import { combineReducers } from 'redux';
import { mapDataReducer,
         mapDimensionsReducer,
         isLoadingReducer} from './reducers';

const NYCETAppReducers = combineReducers({
  mapData: mapDataReducer,
  mapDimensions: mapDimensionsReducer,
  isLoading: isLoadingReducer
});

export default NYCETAppReducers;
