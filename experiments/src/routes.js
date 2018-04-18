// import React from 'react'
import { ExperimentsByOrg, DemographicStats } from './components/Experiments'
import AboutContainer from './components/AboutContainer'
import MethodologyContainer from './components/MethodologyContainer'

// import { Redirect } from 'react-router-dom'

// const redirectFromHome = () => {
//   return <Redirect to='/experiments'/>
// }

const routes = [
  // {'exact path': '/', 'render': redirectFromHome},
  {'path': '/experiments', 'component': ExperimentsByOrg, 'name': 'Experiments By Org'},
  {'path': '/demographics', 'component': DemographicStats, 'name': 'Demographic Stats'},
  {'path': '/methodology', 'component': MethodologyContainer, 'name': 'Methodology'},
  {'path': '/about', 'component': AboutContainer, 'name': 'About'},
]

export default routes
