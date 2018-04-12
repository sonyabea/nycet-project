import axios from 'axios'
export const LOAD_DATA = 'LOAD_DATA'
export const CHANGE_EXPERIMENTS_FILTER = 'CHANGE_EXPERIMENTS_FILTER'
export const CHANGE_DEMOGRAPHICS_FILTER = 'CHANGE_DEMOGRAPHICS_FILTER'

const changeFilter = (type, category, value) => { 
  return { type, category, value }
}
const dispatchFilter = type => (category, value) => dispatch => dispatch(changeFilter(type, category, value))

export const changeExperimentsFilter = dispatchFilter(CHANGE_EXPERIMENTS_FILTER)
export const changeDemographicsFilter = dispatchFilter(CHANGE_DEMOGRAPHICS_FILTER)

export const loadData = () => dispatch => {
  axios({ method: 'post', url: 'http://localhost:8080/table/cace_metrics/', data: {} })
    .then(res => dispatch({ type: LOAD_DATA, data: res.data })
  )
}
