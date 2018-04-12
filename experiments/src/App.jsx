import React from 'react'
import { Switch, Route } from 'react-router'
import routesInfo from './routes'
import Headers from './components/Headers'
import './App.css'

const App = (props) => {

  let linksInfo = routesInfo.filter(r => r.path)
  let routes = routesInfo.map(r => <Route { ...r } key={r.name}/>)
  return (
    <div className="App">
      <Headers linksInfo={linksInfo} />
      <Switch>
        {routes}
      </Switch>
    </div>
  )

}

// const AppWithRouter = withRouter(App)
// export default AppWithRouter;
export default App;
