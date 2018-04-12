import { CHANGE_EXPERIMENTS_FILTER, LOAD_INITIAL_EXPERIMENTS_SELECTION } from '../actions/'
import { changeFilter, loadInitialSelection } from './index'
  
const initialState = {
  selected: {
    election: null,
    dem1_value: null
  },
}

const experiments = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_EXPERIMENTS_FILTER:
      return changeFilter(state, action)
    case LOAD_INITIAL_EXPERIMENTS_SELECTION:
      return loadInitialSelection(state, action, ['election', 'dem1_value'])
    default:
      return state
  }
}

export default experiments
