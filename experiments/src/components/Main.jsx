import React from 'react'
import { Switch, Route } from 'react-router'
import { Loader } from 'semantic-ui-react'

const Main = ({routesInfo, loading}) => {
	let routes = routesInfo.map(r => <Route { ...r } key={r.name}/>)
	if (loading) return <Loader />
  return (
		<Switch>{routes}</Switch>
  )
}

export default Main