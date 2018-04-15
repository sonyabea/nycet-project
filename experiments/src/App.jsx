import React from 'react'
import routesInfo from './routes'
import { Switch, Route } from 'react-router'
import { Header } from 'semantic-ui-react'
import MainMenu from './components/MainMenu'
import './App.css'

const App = (props) => {
  let linksInfo = routesInfo.filter(r => r.path)
  let routes = routesInfo.map(r => <Route { ...r } key={r.name}/>)
  let headerStyle = {
    'text-align': 'left',
    'margin-left': '2%',
    'margin-top': '2%'
  }
  return (
    <div className="App">
      <Header as="h1" style={headerStyle}>Get-Out-the-Vote Experiments</Header>
      <MainMenu linksInfo={linksInfo} />
      <Switch>{routes}</Switch>
    </div>
  )
}

export default App;
