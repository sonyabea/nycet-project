import React, { Component } from 'react'
import { connect } from 'react-redux'
import Plot from './Plot'
import DemoSelections from './DemoSelections'
import GroupSizes from './GroupSizes'
import { getExperimentsPlotData, getDemographicsPlotData, getElectionGroupSizes } from '../selectors'
import _ from 'lodash'

const PlotTemplate = ({ groupSizes, plotData, children }) =>
  <div className='flex-container'>
    <div style={{width: '20%', textAlign: 'left', fontSize: '12px', marginTop: '4%'}}>
      <GroupSizes { ...groupSizes } />
      {children}
    </div>
    <Plot data={plotData}/>
  </div>

class DemographicsPlot extends Component {

  constructor (props) {
    super(props)
    this.state = {
      currentlySelected: [],
      error: ''
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    let demoPreselections = _.chain(nextProps.plotData)
                            .map(dataPt => ({
                              ...dataPt,
                              total_pop: parseInt(dataPt.control_pop, 10) + parseInt(dataPt.treatment_pop, 10)
                            }))
                            .orderBy('total_pop')
                            .reverse()
                            .slice(0,6)
                            .map("x")
                            .value()

    return {currentlySelected: demoPreselections}
  }

  shouldComponentUpdate (nextProps, nextState) {
    let { length: selectionsLength } = nextState.currentlySelected
    return (selectionsLength >= 1 && selectionsLength <= 8)
  }

  handleChange (event, element) {
    this.setState({currentlySelected: element.value})
  }

  render () {
    let { plotData, groupSizes } = this.props
    let { currentlySelected, error } = this.state
    let demoSelectionOptions = plotData.map(d => d.x)
    let filteredPlotData = plotData.filter(d => currentlySelected.includes(d.x))
    return (
      <PlotTemplate plotData={filteredPlotData} groupSizes={groupSizes}>
        <div style={{'marginTop': '10%'}}>
          <DemoSelections
            error={error}
            options={demoSelectionOptions}
            onChange={this.handleChange.bind(this)}
            value={currentlySelected}
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
