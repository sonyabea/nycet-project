import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getLoading } from './selectors'
import routesInfo from './routes'
import Main from './components/Main'
import Headers from './components/Headers'
import './App.css'

class App extends Component {

  render() {
    let linksInfo = routesInfo.filter(r => r.path)
    return (
      <div className="App">
        <Headers linksInfo={linksInfo} />
        <Main routesInfo={routesInfo} loading={this.props.loading} />
      </div>
    )
  }

}

const SmartApp = connect(
  state => ({loading: getLoading(state)})
)(App)

export default SmartApp;
