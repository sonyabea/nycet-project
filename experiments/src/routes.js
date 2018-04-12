// import React from 'react'
import { ExperimentsByOrg, DemographicStats } from './components/Experiments'
// import { Redirect } from 'react-router-dom'

// const redirectFromHome = () => {
//   return <Redirect to='/experiments'/>
// }

const routes = [
  // {'exact path': '/', 'render': redirectFromHome},
  {'path': '/experiments', 'component': ExperimentsByOrg, 'name': 'Experiments By Org'},
  {'path': '/demographics', 'component': DemographicStats, 'name': 'Demographic Stats'}
]

export default routes
