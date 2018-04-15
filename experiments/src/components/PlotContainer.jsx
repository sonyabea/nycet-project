import React, { Component } from 'react'
import { connect } from 'react-redux'
import Plot from './Plot'
import DemoSelections from './DemoSelections'
import { getExperimentsPlotData, getDemographicsPlotData, getLoading } from '../selectors'

class PlotContainer extends Component {

  render () {
    return (
      <div>
        <Plot data={this.props.plotData} />
        {this.props.children}
      </div>
    )
  }
}

class PlotContainerWithSelector extends Component {

  constructor (props) {
    super(props)
    this.state = {
      currentlySelected: []
    }
  }

  handleClick (event, element) {
    let { currentlySelected } = this.state
    let newState = element.checked ?
      [...currentlySelected, element.label] :
      currentlySelected.filter(selection => selection !== element.label)
    this.setState({currentlySelected: newState})
  }

  render() {
    let demoSelectionOptions = this.props.plotData.map(d => d.x)
    let filteredPlotData = this.props.plotData.filter(d => this.state.currentlySelected.includes(d.x))
    return (
      <PlotContainer plotData={filteredPlotData}>
        <DemoSelections options={demoSelectionOptions} handleClick={this.handleClick.bind(this)} />
      </PlotContainer>
    )
  }
}

export const ExperimentsPlotContainer = connect(
  state => ({ plotData: getExperimentsPlotData(state), loading: getLoading(state) })
)(PlotContainer)

export const DemographicsPlotContainer = connect(
  state => ({ plotData: getDemographicsPlotData(state), loading: getLoading(state) })
)(PlotContainerWithSelector)