import { CHANGE_EXPERIMENTS_FILTER, LOAD_INITIAL_EXPERIMENTS_SELECTION } from '../actions/'
import { changeFilter, loadInitialSelection } from './index'
  
const initialState = {
  selected: {
    year: null,
    election: null,
    dem1_value: null
  },
  columns: [
    { name: 'year', display: 'Year' },
    { name: 'election', display: 'Election' },
    { name: 'dem1_value', display: 'Organization' }
  ]
}

// experiments and demographics have almost the same reducer.  abstract this
const experiments = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_EXPERIMENTS_FILTER:
      return changeFilter(state, action)
    case LOAD_INITIAL_EXPERIMENTS_SELECTION:
      return loadInitialSelection(state, action)
    default:
      return state
  }
}

export default experiments
