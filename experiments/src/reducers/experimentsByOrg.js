import { CHANGE_EXPERIMENTS_FILTER } from '../actions/'
import { changeFilter } from './index'
  
const initialState = {
  selectors: {
    election: null,
    org: null
  },
  data: null
}

const experimentsByOrg = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_EXPERIMENTS_FILTER:
      return changeFilter(state, action)
    case LOAD_EXPERIMENTS_DATA:
      return { ...state, data: action.data }
    default:
      return state
  }
}

export default experimentsByOrg
