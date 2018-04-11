import { combineReducers } from 'redux';
import { mapStateReducer } from './reducers';

const NYCETAppReducers = combineReducers({
  mapComponents: mapStateReducer
});

export default NYCETAppReducers;
