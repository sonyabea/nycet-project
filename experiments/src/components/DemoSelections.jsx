import React from 'react'
import { Checkbox } from 'semantic-ui-react'

const DemoSelections = ({options, handleClick}) => {
  return options.map(data => <Checkbox key={data} label={data} onClick={handleClick}/>)
}

export default DemoSelections