import React, {Component} from 'react'
import SelectionContainer from './SelectionContainer'
import PlotContainer from './PlotContainer'
import axios from 'axios'


class ExperimentsContainer extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    let divStyle = {
      backgroundColor: 'white'
    }

    return (
      <div style={divStyle}>
        <SelectionContainer selectorsInfo={this.props.selectorsInfo} />
          {this.props.children}
        <PlotContainer {...this.props.plotInfo} />
      </div>
    )
  }

}

class ExperimentsWithGroupSizes extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <ExperimentsContainer { ...this.props }>
        <GroupSizes />
      </ExperimentsContainer>
    )
  }

}

export const ExperimentsByOrg = withData(ExperimentsContainer, experimentsByOrgParams)
export const DemographicStats = withData(ExperimentsWithGroupSizes, demographicStatsParams)