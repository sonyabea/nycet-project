import React from 'react'
import {ExperimentsByOrg, DemographicStats} from './ExperimentsContainer'
import {NavLink} from 'react-router-dom'

const Header = ({path, name}) => {
  return <NavLink to={path}>{name}</NavLink>
}

export default Header