import React, { Component } from 'react'
import { connect } from 'react-redux'
// import ExperimentInfo from './ExperimentInfo'
import Plot from './Plot'
import { getExperimentsPlotData, getDemographicsPlotData, getLoading } from '../selectors'

class PlotContainer extends Component {
  render() {
    return (
      <div>
        {this.props.children}
        <Plot data={this.props.plotData} loading={this.props.loading} />
      </div>
    )
  }
}

export const ExperimentsPlotContainer = connect(
  state => ({ plotData: getExperimentsPlotData(state), loading: getLoading(state) })
)(PlotContainer)

export const DemographicsPlotContainer = connect(
  state => ({ plotData: getDemographicsPlotData(state), loading: getLoading(state) })
)(PlotContainer)
