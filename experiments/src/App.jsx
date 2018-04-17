import React from 'react'
import routesInfo from './routes'
import { Switch, Route, Redirect } from 'react-router'
import { Header } from 'semantic-ui-react'
import MainMenu from './components/MainMenu'
import './App.css'

const App = (props) => {
  let linksInfo = routesInfo.filter(r => r.path)
  let routes = routesInfo.map(r => <Route { ...r } key={r.name}/>)

  let headerStyle = {
    'textAlign': 'left',
    'marginLeft': '2%',
    'marginTop': '2%'
  }
  return (
    <div className="App">
      <Header as="h1" style={headerStyle}>Get-Out-the-Vote Experiments</Header>
      <MainMenu linksInfo={linksInfo} />
      <Switch>
        {routes}
        <Redirect from="/" to="/experiments" />
      </Switch>
    </div>
  )
}

export default App;
