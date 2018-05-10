import { CHANGE_DEMOGRAPHICS_FILTER, LOAD_INITIAL_DEMOGRAPHICS_SELECTION } from '../actions/'
import { changeFilter, loadInitialSelection } from './index'

const initialState = {
  selected: {
    year: null,
    election: null,
    dem1: null,
    dem2: null,
  },
  columns: [
    { name: 'year', display: 'Year' },
    { name: 'election', display: 'Election' },
    { name: 'dem1', display: 'Primary Category' },
    { name: 'dem2', display: 'Secondary Category' }
  ]
}

const demographics = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DEMOGRAPHICS_FILTER:
      return changeFilter(state, action)
    case LOAD_INITIAL_DEMOGRAPHICS_SELECTION:
      return loadInitialSelection(state, action)
    default:
      return state
  }
}

export default demographics
