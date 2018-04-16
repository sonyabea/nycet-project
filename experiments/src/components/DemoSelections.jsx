import React from 'react'
import { Checkbox } from 'semantic-ui-react'

const DemoSelections = ({options, handleClick}) => {
  return options.map(data => <div li><Checkbox label={data} onClick={handleClick}/></div>)
}

export default DemoSelections
