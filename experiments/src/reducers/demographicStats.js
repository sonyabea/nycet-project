import { CHANGE_DEMOGRAPHICS_FILTER } from '../actions/'
import { changeFilter } from './index'
  
const initialState = {
  selected: {
    election: null,
    demo_type_1: null,
    demo_type_2: null
  }
}

const demographicStats = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DEMOGRAPHICS_FILTER:
      return changeFilter(state, action)
    default:
      return state
  }
}

export default demographicStats