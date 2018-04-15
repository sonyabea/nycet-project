import React from 'react'
import routesInfo from './routes'
import { Switch, Route } from 'react-router'
import MainMenu from './components/MainMenu'
import './App.css'

const App = (props) => {
  let linksInfo = routesInfo.filter(r => r.path)
  let routes = routesInfo.map(r => <Route { ...r } key={r.name}/>)
  return (
    <div className="App">
      <MainMenu linksInfo={linksInfo} />
      <Switch>{routes}</Switch>
    </div>
  )
}

export default App;
