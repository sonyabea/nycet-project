import React from 'react'
import Header from './Header'

const Headers = ({linksInfo}) => {
  let headers = linksInfo.map(l => <Header { ...l } key={l.name} />)
  return <div>{headers}</div>
}

export default Headers
