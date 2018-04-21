import React, {Component} from 'react';
import { connect } from 'react-redux';
import Competitiveness from './components/Competitiveness'
import {loadData} from './actions/index'
import { withRouter } from 'react-router-dom';
import './App.css';

//can add more complexity here in the children eventually
class AppContainer extends Component {

  static getDerivedStateFromProps(nextProps, prevState) {
    let parentDistType = (typeof(nextProps.match.params.parentDistType) === 'undefined') ? 'AD' : nextProps.match.params.parentDistType 
    let parentDistId = (typeof(nextProps.match.params.parentDistId) === 'undefined') ? 0 : nextProps.match.params.parentDistId
    nextProps.loadMap({parentDistType, parentDistId})
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

const App = withRouter(connect(null, { loadMap: loadData })(AppContainer))

export default App
