import { CHANGE_DEMOGRAPHICS_FILTER, LOAD_INITIAL_DEMOGRAPHICS_SELECTION } from '../actions/'
import { changeFilter, loadInitialSelection } from './index'
  
const initialState = {
  selected: {
    election: null,
    dem1: null,
    dem2: null
  },
  order: ['election', 'dem1', 'dem2']
}

const demographics = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DEMOGRAPHICS_FILTER:
      return changeFilter(state, action)
    case LOAD_INITIAL_DEMOGRAPHICS_SELECTION:
      return loadInitialSelection(state, action, ['election', 'dem1', 'dem2'])
    default:
      return state
  }
}

export default demographics