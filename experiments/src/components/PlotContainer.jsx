import React, { Component } from 'react'
import { connect } from 'react-redux'
import Plot from './Plot'
import DemoSelections from './DemoSelections'
import GroupSizes from './GroupSizes'
import { getExperimentsPlotData, getDemographicsPlotData, getElectionGroupSizes } from '../selectors'

class PlotContainer extends Component {

  render () {
    return (
      <div className='flex-container'>
        <div style={{width: '25%'}}>
          {this.props.children}
        </div>
        <Plot data={this.props.plotData} />
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
    let { plotData, groupSizes } = this.props
    let demoSelectionOptions = plotData.map(d => d.x)
    let filteredPlotData = plotData.filter(d => this.state.currentlySelected.includes(d.x))
    return (
      <PlotContainer plotData={filteredPlotData}>
        <GroupSizes { ...groupSizes } />
        <DemoSelections options={demoSelectionOptions} handleClick={this.handleClick.bind(this)} />
      </PlotContainer>
    )
  }
}

export const ExperimentsPlotContainer = connect(
  state => ({
    plotData: getExperimentsPlotData(state),
    groupSizes: getElectionGroupSizes('experiments')(state)
  })
)(PlotContainer)

export const DemographicsPlotContainer = connect(
  state => ({
    plotData: getDemographicsPlotData(state),
    groupSizes: getElectionGroupSizes('demographics')(state)
  })
)(DemographicsPlot)