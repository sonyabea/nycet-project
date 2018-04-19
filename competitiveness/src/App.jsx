import React, {Component} from 'react';
import { connect } from 'react-redux';
import Competitiveness from './components/Competitiveness'
import {loadData} from './actions/index'
import './App.css';

//can add more complexity here in the children eventually
class AppContainer extends Component {
  componentWillMount() {
    let parentDistType = (typeof(this.props.match.params.parentDistType) === 'undefined') ? 'AD' : this.props.match.params.parentDistType 
    let parentDistId = (typeof(this.props.match.params.parentDistId) === 'undefined') ? 0 : this.props.match.params.parentDistId
    let election = this.props.election
    this.props.loadMap({parentDistType, parentDistId, election})
  }

  render() {
  return (
    <div className='App'>
      <Competitiveness mapComponents={this.props.mapData}
                       districtType={this.props.districtType} />
    </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  mapData: state.mapData,
  districtType: state.districtType,
  election: state.selectedElection
})

const App = connect(mapStateToProps, { loadMap: loadData })(AppContainer)

export default App
