import React from 'react'
import {ExperimentsDropdownContainer, DemographicsDropdownContainer} from './DropdownContainer'
import {ExperimentsPlotContainer, DemographicsPlotContainer} from './PlotContainer'

const Experiments = ({dropdownContainer, children, plotContainer}) => {
  let divStyle = {
    backgroundColor: 'white'
  }

  return (
    <div style={divStyle}>
      {dropdownContainer}
        {children}
      {plotContainer}
    </div>
  )
}

export const ExperimentsByOrg = (props) => {
  return (
    <Experiments
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
      {/* <GroupSizes /> */}
    </Experiments>
  )
}