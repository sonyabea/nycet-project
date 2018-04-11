import { combineReducers } from 'redux'
import data from './data'
import demographicStats from './demographicStats'
import experimentsByOrg from './experimentsByOrg'

export default combineReducers({
	data,
	demographicStats,
	experimentsByOrg
})