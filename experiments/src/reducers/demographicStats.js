import { CHANGE_DEMOGRAPHICS_FILTER } from '../actions/'
import { changeFilter } from './index'
  
const initialState = {
  selectors: {
    election: null,
    demo_type_1: null,
    demo_type_2: null
  },
  data: null
}

const demographicStats = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DEMOGRAPHICS_FILTER:
      return changeFilter(state, action)
    case LOAD_DEMOGRAPHICS_DATA:
      return { ...state, data: action.data }
    default:
      return state
  }
}

export default demographicStats