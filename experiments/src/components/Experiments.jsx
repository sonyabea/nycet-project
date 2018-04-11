import React from 'react'
import {ExperimentsSelectionContainer, DemographicsSelectionContainer} from './SelectionContainer'
import PlotContainer from './PlotContainer'

const Experiments = (props) => {
  let divStyle = {
    backgroundColor: 'white'
  }

  return (
    <div style={divStyle}>
      {this.props.selectionContainer}
        {this.props.children}
      <PlotContainer />
    </div>
  )
}

export const ExperimentsByOrg = (props) => {
  return (
    <ExperimentsContainer selectionContainer={ <ExperimentsSelectionContainer /> } />
  )
}

export const DemographicStats = (props) => {
  return (
    <Experiments selectionContainer={ <DemographicsSelectionContainer /> } >
      <GroupSizes />
    </Experiments>
  )
}