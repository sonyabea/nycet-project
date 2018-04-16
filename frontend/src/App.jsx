import React from 'react';
import { connect } from 'react-redux';
import Competitiveness from './components/Competitiveness'
import './App.css';

//can add more complexity here in the children eventually
const AppContainer = (props) => {
  let isEd = props.match.params.parentDistType === 'ED'
  return (
    <div className='App'>
      {(props.isLoading) ? "Loading!" : <Competitiveness isEd={{isEd}}/> }
    </div>
  )
}

const mapStateToProps = (state) => ({
  isLoading: state.isLoading
})

const App = connect(mapStateToProps)(AppContainer)

export default App
