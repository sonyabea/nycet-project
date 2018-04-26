import React, {Component} from 'react';
import { connect } from 'react-redux';
import Competitiveness from './components/Competitiveness'
import {loadHLData, loadEDData} from './actions/index'
import { withRouter } from 'react-router-dom';
import './App.css';
const queryString = require('query-string')

class AppContainer extends Component {

  //do some checks so we're not calling backend 5 times a load
  static getDerivedStateFromProps(nextProps, prevState) {

    if (nextProps.isLoading) {
      return null;
    }
    else {
      let parentDistType = (typeof(nextProps.match.params.parentDistType) === 'undefined') ? 'AD' : nextProps.match.params.parentDistType 
      let parentDistId = (typeof(nextProps.match.params.parentDistId) === 'undefined') ? 0 : nextProps.match.params.parentDistId
      let params = queryString.parse(nextProps.location.search)
      let election = params.election
      let childDistrict = params.ED
      if ((typeof(childDistrict) !== 'undefined') && (nextProps.county)) {
        nextProps.loadEDData(childDistrict, nextProps.county)
        return null;
      }
      else {
        nextProps.loadHLData(parentDistType, parentDistId, election, childDistrict)
        return null;
      }
    }
  }

  render() {
    return (
      <div className='App'>
        <Competitiveness />
      </div>
      )
  }
}

const App = withRouter(connect(null, { loadHLData: loadHLData,
                                       loadEDData: loadEDData })(AppContainer))

export default App
