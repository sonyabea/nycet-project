import React, {Component} from 'react';
import { connect } from 'react-redux';
import Competitiveness from './components/Competitiveness'
import {loadMapData} from './actions/index'
import './App.css';

//can add more complexity here in the children eventually
class AppContainer extends Component {
  componentDidMount() {
    //check for mapData?
    let parentDistType = (typeof(this.props.match.params.parentDistType) === 'undefined') ? 'AD' : this.props.match.params.parentDistType 
    let parentDistId= (typeof(this.props.match.params.parentDistId) === 'undefined') ? 0 : this.props.match.params.parentDistId
    this.props.loadMap({parentDistType, parentDistId})
  }

  render() {
  return (
    <div className='App'>
      {(this.props.isLoading) ? "Loading!" : <Competitiveness mapComponents={this.props.mapData}/> }
    </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  isLoading: state.isLoading,
  mapData: state.mapData
})

const App = connect(mapStateToProps, { loadMap: loadMapData })(AppContainer)

export default App
