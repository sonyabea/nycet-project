import React, {Component} from 'react'
import SelectionContainer from './SelectionContainer'
import PlotContainer from './PlotContainer'
import axios from 'axios'

function withData (WrappedComponent, {table, filters}) {

  return class extends Component {

    getData (data) {
      axios({
        method:'post',
        url: `localhost:8080/table/${table}/`,
        data
      })
    }
  
    componentDidMount () {
      let attributes = Object.keys(filters)
      let queries = Object.values(filters).map(getData)
  
      Promise.all(queries)
        .then(values => {
          values.map((value, index) => this.setState(attributes[index], value))
        })
    }

    render () {
      return <WrappedComponent { ...this.state } />
    }
  }

}

class ExperimentsContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      filters: ''
    }
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

const experimentsByOrgParams = {
  filters: {
    orgs: {'unique': true, 'columns': ['org']},
    elections: {'unique': true, 'columns': ['election']},
    plotInfo: {'columns': ['org', 'election', 'contact_rate', 'CACE', 'control', 'treatment']},
    plotStats: {'columns': ['org', 'election', 'q1', 'q3', 'ci_low', 'ci_high', 'median']}
  },
  table: 'by_org'
}

const demographicStatsParams = {
  filters: {
    elections: {'unique': true, 'columns': ['election']},
    dems1: {'unique': true, 'columns': ['dem1']},
    dems2: {'unique': true, 'columns': ['dem2']},
    plotInfo: {'columns': ['org', 'election', 'contact_rate', 'CACE', 'control', 'treatment']},
    plotStats: {'columns': ['org', 'election', 'q1', 'q3', 'ci_low', 'ci_high', 'median']}
  },
  table: 'cace_metrics'
}

export const ExperimentsByOrg = withData(ExperimentsContainer, experimentsByOrgParams)
export const DemographicStats = withData(ExperimentsWithGroupSizes, demographicStatsParams)