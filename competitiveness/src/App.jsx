import React, {Component} from 'react';
import { connect } from 'react-redux';
import Competitiveness from './components/Competitiveness'
import {loadHLData, loadEDData} from './actions/index'
import { withRouter } from 'react-router-dom';
const queryString = require('query-string')

class AppContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  //do some checks so we're not calling backend 5 times a load
  static getDerivedStateFromProps(nextProps, prevState) {

    let parentDistrictType = (typeof(nextProps.match.params.parentDistrictType) === 'undefined') ? 'CD' : nextProps.match.params.parentDistrictType 
    let selectedDistrict = (typeof(nextProps.match.params.selectedDistrict) === 'undefined') ? 0 : nextProps.match.params.selectedDistrict
    let params = queryString.parse(nextProps.location.search)
    let election = params.election
    let childDistrict = params.ED

    if (!nextProps.isLoading) {
      if (typeof(prevState.parentDistrictType) === 'undefined') {
        nextProps.loadHLData(parentDistrictType, selectedDistrict, election, childDistrict)
      }
      else if ((parentDistrictType !== prevState.parentDistrictType) ||
               (selectedDistrict !== prevState.selectedDistrict) ||
               (election !== prevState.election)) {
        nextProps.loadHLData(parentDistrictType, selectedDistrict, election, childDistrict)
      }
      else if ((childDistrict !== prevState.childDistrict) && (nextProps.election)) {
        nextProps.loadEDData(childDistrict, nextProps.election)
      }
  }
      return {parentDistrictType: parentDistrictType,
              selectedDistrict: selectedDistrict,
              childDistrict: childDistrict,
              election: election,
              isLoading: nextProps.isLoading}
  }

  render() {
    return (
      <div className='App'>
        <Competitiveness />
      </div>
      )
  }
}

const mapStateToProps = (state) => (
 {county: state.highlightedEdData.county,
  parentDistrictType: state.parentDistrictType,
  selectedDistrict: state.selectedDistrict,
  election: state.selectedElection,
  isLoading: state.isLoading}
)

const App = withRouter(connect(mapStateToProps, { loadHLData: loadHLData,
                                       loadEDData: loadEDData })(AppContainer))

export default App
