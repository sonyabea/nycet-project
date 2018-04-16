import { combineReducers } from 'redux';
import { topLevelMapReducer,
         EDLevelMapReducer,
         mapDimensionsReducer,
         isLoadingReducer} from './reducers';

const NYCETAppReducers = combineReducers({
  topLevelMap: topLevelMapReducer,
  EDLevelMap: EDLevelMapReducer,
  mapDimensions: mapDimensionsReducer,
  isLoading: isLoadingReducer
});

export default NYCETAppReducers;
