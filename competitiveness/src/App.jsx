import React, {Component} from 'react';
import { connect } from 'react-redux';
import Competitiveness from './components/Competitiveness'
import {loadData} from './actions/index'
import { withRouter } from 'react-router-dom';
import './App.css';

class AppContainer extends Component {

  //do some checks so we're not calling backend 5 times a load
  static getDerivedStateFromProps(nextProps, prevState) {
    let parentDistType = (typeof(nextProps.match.params.parentDistType) === 'undefined') ? 'AD' : nextProps.match.params.parentDistType 
    let parentDistId = (typeof(nextProps.match.params.parentDistId) === 'undefined') ? 0 : nextProps.match.params.parentDistId
    let childDistId = nextProps.match.params.childDistId
    if (typeof(childDistId) !== 'undefined') {
      nextProps.loadMap({parentDistType: 'ED', parentDistId: childDistId, county: nextProps.county})
    }
    else {
      nextProps.loadMap({parentDistType: parentDistType, parentDistId: parentDistId})
    }
    
    return null
  }

  render() {
    return (
      <div className='App'>
        <Competitiveness />
      </div>
      )
  }
}

const mapStateToProps = (state, ownProps) => (
  {parentDistType: state.parentDistrictType,
   parentDistId: state.parentDistrictId,
   selectedEd: state.highlightedEdData.ed,
   county: state.highlightedEdData.county})

const App = withRouter(connect(mapStateToProps, { loadMap: loadData })(AppContainer))

export default App
