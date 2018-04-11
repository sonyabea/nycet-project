import { CHANGE_DEMOGRAPHICS_FILTER } from '../actions/'
  
const initialState = {
  selectors: {
    experiment: null,
    demo1: null,
    demo2: null
  }
}

const demographicStats = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DEMOGRAPHICS_FILTER:
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

export default demographicStats