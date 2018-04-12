import { combineReducers } from 'redux'
import data from './data'
import demographics from './demographics'
import experiments from './experiments'

export default combineReducers({
	data,
	demographics,
	experiments
})

export const changeFilter = (state, action) => {
	return { 
		...state,
		selectors: {
			...state.selectors, 
			[action.category]: action.value
		}
	}
}