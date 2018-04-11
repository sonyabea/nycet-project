import { CHANGE_EXPERIMENTS_FILTER } from '../actions/'
  
const initialState = {
  selectors: {
    org: null,
    experiment: null
  }
}

const experimentsByOrg = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_EXPERIMENTS_FILTER:
      return { 
        ...state,
        selectors: {
          ...state.selectors, 
          [action.category]: action.value
        }
      }
    default:
      return state
  }
}

export default experimentsByOrg