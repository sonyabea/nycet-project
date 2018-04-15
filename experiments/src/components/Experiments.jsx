import React, { Component } from 'react'
// import { Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { ExperimentsDropdownContainer, DemographicsDropdownContainer } from './DropdownContainer'
import { ExperimentsPlotContainer, DemographicsPlotContainer } from './PlotContainer'
import CACEContainer from './CACEContainer'
import { getLoading } from '../selectors'


class Experiments extends Component {
  render () {
    let { dropdownContainer, plotContainer, loading } = this.props
    return loading ? null : (
      <div className='flex-container vertical' style={{width: '80%', margin: 'auto'}}>
        <div className='plot-top'>
          <div>{dropdownContainer}</div>
          <CACEContainer/>
        </div>
          {plotContainer}
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
