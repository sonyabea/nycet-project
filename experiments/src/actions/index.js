import axios from 'axios'
import _ from 'lodash'
export const LOAD_DATA = 'LOAD_DATA'
export const SET_LOADING = 'SET_LOADING'
export const CHANGE_EXPERIMENTS_FILTER = 'CHANGE_EXPERIMENTS_FILTER'
export const CHANGE_DEMOGRAPHICS_FILTER = 'CHANGE_DEMOGRAPHICS_FILTER'
export const LOAD_INITIAL_EXPERIMENTS_SELECTION = 'LOAD_INITIAL_EXPERIMENTS_SELECTION'
export const LOAD_INITIAL_DEMOGRAPHICS_SELECTION = 'LOAD_INITIAL_DEMOGRAPHICS_SELECTION'

const changeFilter = (type, payload) => { 
  return { type, payload }
}
const dispatchFilter = type => (payload) => dispatch => dispatch(changeFilter(type, payload))

export const changeExperimentsFilter = dispatchFilter(CHANGE_EXPERIMENTS_FILTER)
export const changeDemographicsFilter = dispatchFilter(CHANGE_DEMOGRAPHICS_FILTER)

const getInitialSelection = data => filter => _.chain(data)
  .filter(filter)
  .sortBy(d => (1 / d.control))
  .value()[0]

export const loadData = () => dispatch => {
  axios({ method: 'post', url: 'http://localhost:8080/table/cace_metrics/', data: {} })
    .then(res => {
      dispatch({ type: LOAD_DATA, data: res.data })
      let initiate = getInitialSelection(res.data)
      dispatch({ type: LOAD_INITIAL_EXPERIMENTS_SELECTION, selection: initiate({dem1: 'org', dem2: null}) })
      dispatch({ type: LOAD_INITIAL_DEMOGRAPHICS_SELECTION, selection: initiate({dem1: 'race'}) })
      dispatch({ type: SET_LOADING, loading: false })
    }
  )
}
