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

      <body className="Site">
        <header>
          <Header as="h1" style={headerStyle}>
            <img src={ require('./nycet.jpeg') } />
            Get-Out-the-Vote Experiments
          </Header>
          <MainMenu linksInfo={linksInfo} />
        </header>
        <main className='Site-content'>
          <Switch>
            {routes}
            <Redirect from="/" to="/experiments" />
          </Switch>
        </main>
        <footer className="footer">
          <p>
            Made with <span style={{'color':'red'}}>&hearts;</span> by <b>Lee Araneta | Diane Cai | Lorena De La Parra | Adam Emrich | Jack Ferguson | Liz Kalina</b> on behalf of the CKM Pro Bono Committee
          </p>
        </footer>
      </body>




    </div>
  )
}

export default App;
