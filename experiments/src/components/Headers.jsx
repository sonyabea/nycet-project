import React from 'react'

const Headers = ({linksInfo}) => {
  let headers = linksInfo.map(l => <Header { ...l } />)
  return <div>{headers}</div>
}

export default Headers
