import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getLoading } from './selectors'
import routesInfo from './routes'
import { Switch, Route } from 'react-router'
import Headers from './components/Headers'
import './App.css'

const App = (props) => {
  let linksInfo = routesInfo.filter(r => r.path)
  let routes = routesInfo.map(r => <Route { ...r } key={r.name}/>)
  return (
    <div className="App">
      <Headers linksInfo={linksInfo} />
      <Switch>{routes}</Switch>
    </div>
  )
}

const SmartApp = connect(
  state => ({loading: getLoading(state)})
)(App)

export default SmartApp;
