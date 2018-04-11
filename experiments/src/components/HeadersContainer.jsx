import React from 'react'
import {ExperimentsByOrg, DemographicStats} from './ExperimentsContainer'

const HeadersContainer = ({linksInfo}) => {
  let headers = linksInfo.map(l => <Header { ...l } />)
  return <div>{headers}</div>
}

export default HeadersContainer
