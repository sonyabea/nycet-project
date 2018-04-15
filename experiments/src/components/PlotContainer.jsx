import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Plot from './Plot'
import DemoSelections from './DemoSelections'
import GroupSizes from './GroupSizes'
import { getExperimentsPlotData, getDemographicsPlotData, getLoading } from '../selectors'

class PlotContainer extends Component {

  render () {
    return (
      <div>
        {this.props.primaryInfo}
        <Plot data={this.props.plotData} />
        {this.props.children}
      </div>
    )
  }
}

class DemographicsPlot extends Component {

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
    let { plotData } = this.props
    let groupSizes = plotData
      .map(d => _.pick(d, ['control_pop', 'treatment_pop']))
      .reduce((a, b) => ({
        control_pop: a.control_pop + parseInt(b.control_pop),
        treatment_pop: a.treatment_pop + parseInt(b.treatment_pop)
      }), {control_pop: 0, treatment_pop: 0})
    let demoSelectionOptions = this.props.plotData.map(d => d.x)
    let filteredPlotData = this.props.plotData.filter(d => this.state.currentlySelected.includes(d.x))
    return (
      <PlotContainer 
        plotData={filteredPlotData}
        primaryInfo={ <GroupSizes { ...groupSizes } /> }
      >
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
)(DemographicsPlot)