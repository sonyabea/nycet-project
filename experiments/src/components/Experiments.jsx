import React from 'react'
import {ExperimentsDropdownContainer, DemographicsDropdownContainer} from './DropdownContainer'
import {ExperimentsPlotContainer, DemographicsPlotContainer} from './PlotContainer'

const Experiments = (props) => {
  let divStyle = {
    backgroundColor: 'white'
  }

  return (
    <div style={divStyle}>
      {this.props.dropdownContainer}
        {this.props.children}
      {this.props.plotContainer}
    </div>
  )
}

export const ExperimentsByOrg = (props) => {
  return (
    <ExperimentsContainer 
      dropdownContainer={<ExperimentsDropdownContainer />}
      plotContainer={<ExperimentsPlotContainer />}
    />
  )
}

export const DemographicStats = (props) => {
  return (
    <Experiments 
      dropdownContainer={ <DemographicsDropdownContainer /> }
      plotContainer={ <DemographicsPlotContainer /> }
    >
      <GroupSizes />
    </Experiments>
  )
}