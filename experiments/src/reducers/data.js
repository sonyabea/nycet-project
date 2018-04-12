import { LOAD_DATA } from '../actions'

const initialState = {
  all: null
}

const data = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DATA:
      return { ...state, all: action.data}
    default:
      return state
  }
}

export default data