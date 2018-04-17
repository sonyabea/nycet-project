import React, { Component } from 'react'
import { connect } from 'react-redux'
import Plot from './Plot'
import DemoSelections from './DemoSelections'
import GroupSizes from './GroupSizes'
import { getExperimentsPlotData, getDemographicsPlotData, getElectionGroupSizes } from '../selectors'
import _ from 'lodash'

const PlotTemplate = ({ groupSizes, plotData, children }) =>
  <div className='flex-container'>
    <div style={{width: '25%', 'textAlign': 'left'}}>
      <GroupSizes { ...groupSizes } />
      {children}
    </div>
    <Plot data={plotData} />
  </div>

class DemographicsPlot extends Component {

  constructor (props) {
    super(props)

    this.state = {
      currentlySelected: []
    }
  }

  handleClick (event, element) {
    this.setState({currentlySelected: element.value})
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let demoPreselections = _.chain(nextProps.plotData)
                            .map(dataPt =>
                              ({...dataPt,
                              total_pop: parseInt(dataPt.control_pop) + parseInt(dataPt.treatment_pop)})
                            )
                            .orderBy('total_pop')
                            .reverse()
                            .slice(0,6)
                            .map("x")
                            .value()

    return {currentlySelected: demoPreselections}
  }

  render() {
    let { plotData, groupSizes } = this.props
    let demoSelectionOptions = plotData.map(d => d.x)
    let filteredPlotData = plotData.filter(d => this.state.currentlySelected.includes(d.x))
    return (
      <PlotTemplate plotData={filteredPlotData} groupSizes={groupSizes}>
        <div style={{'marginTop': '20%'}}>
          <DemoSelections
            options={demoSelectionOptions}
            onChange={this.handleClick.bind(this)}
            value={this.state.currentlySelected}
          />
        </div>
      </PlotTemplate>
    )
  }
}

export const ExperimentsPlotContainer = connect(
  state => ({
    plotData: getExperimentsPlotData(state),
    groupSizes: getElectionGroupSizes('experiments')(state)
  })
)(PlotTemplate)

export const DemographicsPlotContainer = connect(
  state => ({
    plotData: getDemographicsPlotData(state),
    groupSizes: getElectionGroupSizes('demographics')(state)
  })
)(DemographicsPlot)
