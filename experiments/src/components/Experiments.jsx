import React from 'react'
import {ExperimentsSelectionContainer, DemographicsSelectionContainer} from './SelectionContainer'
import {ExperimentsPlotContainer, DemographicsPlotContainer} from './PlotContainer'

const Experiments = (props) => {
  let divStyle = {
    backgroundColor: 'white'
  }

  return (
    <div style={divStyle}>
      {this.props.selectionContainer}
        {this.props.children}
      {this.props.plotContainer}
    </div>
  )
}

export const ExperimentsByOrg = (props) => {
  return (
    <ExperimentsContainer 
      selectionContainer={ <ExperimentsSelectionContainer /> }
      plotContainer = { <ExperimentsPlotContainer /> }
    />
  )
}

export const DemographicStats = (props) => {
  return (
    <Experiments 
      selectionContainer={ <DemographicsSelectionContainer /> }
      plotContainer={ <DemographicsPlotContainer /> }
    >
      <GroupSizes />
    </Experiments>
  )
}