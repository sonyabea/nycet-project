import React, { Component } from 'react'
// import { Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { ExperimentsDropdownContainer, DemographicsDropdownContainer } from './DropdownContainer'
import { ExperimentsPlotContainer, DemographicsPlotContainer } from './PlotContainer'
import CACEContainer from './CACEContainer'
import { getLoading } from '../selectors'

const experimentsStyles = {
  'flex-direction': 'column',
  'width': '80%'
}

class Experiments extends Component {
  render () {
    let { dropdownContainer, plotContainer, loading } = this.props
    return loading ? null : (
      <div className='flex-container' style={experimentsStyles}>
        <div className="plot-top">
          <div>{dropdownContainer}</div>
          <CACEContainer/>
        </div>
        <div>
          {plotContainer}
        </div>
      </div>
    )
  }
}

const ExperimentsContainer = connect(
  state => ({ loading: getLoading(state) })
)(Experiments)

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
    <ExperimentsContainer
      dropdownContainer={ <DemographicsDropdownContainer /> }
      plotContainer={ <DemographicsPlotContainer /> }
    />
  )
}
