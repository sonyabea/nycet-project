import { PULL_ALL_DATA } from '../actions/'
import axios from 'axios'
  
const initialState = {
  all: null
}

const data = (state = initialState, action) => {
  switch (action.type) {
    case PULL_ALL_DATA:
      return { ...state, all: action.data}
    default:
      return state
  }
}

export default data
