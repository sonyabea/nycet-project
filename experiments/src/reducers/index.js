import { combineReducers } from 'redux'
import data from './data'
import demographicStats from './demographicStats'
import experimentsByOrg from './experimentsByOrg'

export default combineReducers({
	data,
	demographicStats,
	experimentsByOrg
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