// import React from 'react'
import { ExperimentsByOrg, DemographicStats } from './components/Experiments'
import About from './components/About'
import Methodology from './components/Methodology'

// import { Redirect } from 'react-router-dom'

// const redirectFromHome = () => {
//   return <Redirect to='/experiments'/>
// }

const routes = [
  // {'exact path': '/', 'render': redirectFromHome},
  {'path': '/organizations', 'component': ExperimentsByOrg, 'name': 'Experiments By Org'},
  {'path': '/demographics', 'component': DemographicStats, 'name': 'Demographic Stats'},
  {'path': '/methodology', 'component': Methodology, 'name': 'Methodology'},
  {'path': '/about', 'component': About, 'name': 'About'},
]

export default routes
