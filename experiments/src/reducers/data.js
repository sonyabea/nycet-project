import { LOAD_DATA } from '../actions'

const initialState = {
  all: null
}

const data = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DATA:
      return { ...state, all: aciton.data}
  }
}

export default data