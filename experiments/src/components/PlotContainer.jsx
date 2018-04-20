import React, { Component } from 'react'
import { connect } from 'react-redux'
import Plot from './Plot'
import PlotDesc from './PlotDesc'
import DemoSelections from './DemoSelections'
import { getPlotData, getElectionGroupSizes } from '../selectors'
import _ from 'lodash'

const PlotTemplate = ({ groupSizes, plotData, children }) =>
  <div className='flex-container'>
    <div style={{width: '20%', textAlign: 'left', marginTop: '2%'}}>
      <PlotDesc/>
      {children}
    </div>
    <Plot data={plotData} groupSizes={groupSizes}/>
  </div>

class DemographicsPlot extends Component {

  constructor (props) {
    super(props)
    this.state = {
      currentlySelected: [],
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    let demoPreselections = _.chain(nextProps.plotData)
                            .sortBy('total_pop')
                            .reverse()
                            .slice(0,6)
                            .map('x')
                            .value()

    return {currentlySelected: demoPreselections}
  }

  shouldComponentUpdate (nextProps, nextState) {
    let { length: selectionsLength } = nextState.currentlySelected
    return (selectionsLength >= 1 && selectionsLength <= 6)
  }

  handleChange (event, element) {
    this.setState({currentlySelected: element.value})
  }

  render () {
    let { plotData, groupSizes } = this.props
    let { currentlySelected, error } = this.state
    let demoSelectionOptions = plotData.map(d => ({key: d.x, text: d.x, value: d.x}))
    let filteredPlotData = plotData.filter(d => currentlySelected.includes(d.x))
    return (
      <PlotTemplate plotData={filteredPlotData} groupSizes={groupSizes}>
        <div style={{'marginTop': '10%'}}>
          <DemoSelections
            options={demoSelectionOptions}
            onChange={this.handleChange.bind(this)}
            value={currentlySelected}
          />
        </div>
      </PlotTemplate>
    )
  }
}

const getSelectors = type => state => ({
  plotData: getPlotData(type)(state),
  groupSizes: getElectionGroupSizes(type)(state)
})

export const ExperimentsPlotContainer = connect(
  getSelectors('experiments')
)(PlotTemplate)

export const DemographicsPlotContainer = connect(
  getSelectors('demographics')
)(DemographicsPlot)
