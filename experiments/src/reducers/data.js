import { LOAD_DATA, SET_LOADING } from '../actions'

const initialState = {
  all: null,
  loading: true
}

const data = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DATA:
      return { ...state, all: action.data }
    case SET_LOADING:
      return { ...state, loading: action.loading }
    default:
      return state
  }
}

export default data