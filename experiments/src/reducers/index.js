import { combineReducers } from 'redux'
import _ from 'lodash'
import data from './data'
import demographics from './demographics'
import experiments from './experiments'

export default combineReducers({
	data,
	demographics,
	experiments
})

export const changeFilter = (state, action) => (
	{
		...state,
		selected: {
			...state.selected,
			...action.payload
		}
	}
)

export const loadInitialSelection = (state, action) => {
	return { 
		...state,
		selected: _.pick(action.selection, _.map(state.columns, 'name'))
	}
}