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
      <footer className="footer">
        <p>
          Made with <span style={{'color':'red'}}>&hearts;</span> by <b>Lee Araneta | Diane Cai | Lorena de la Prada | Adam Emrich | Jack Ferguson | Liz Kalina</b> on behalf of the CKM Pro Bono Committee
        </p>

      </footer>
    </div>
  )
}

export default App;
