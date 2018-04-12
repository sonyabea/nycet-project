import React, { Component } from 'react'
import connect from 'react-redux'
import ExperimentInfo from './ExperimentInfo'
import Plot from './Plot'
import { getExperimentsPlotData, getDemographicsPlotData } from '../selectors'

class PlotContainer extends Component {
  render() {
    return (
      <div class='plot-container'>
        <ExperimentInfo info={plotInfo} />
        <Plot data={plotData} />
      </div>
    )
  }
}

export const ExperimentsPlotContainer = connnect(
  state => {plotData: getExperimentsPlotData}
)(PlotContainer)

export const DemographicsPlotContainer = connect(
  state => {plotData: getDemographicsPlotData}
)(PlotContainer)
