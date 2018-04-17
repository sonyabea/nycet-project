import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const DemoSelections = ({options, onChange, value}) => {
  let demoOptions = options.map(val => ({key: val, text: val, value: val}))
  return (
    <div> 
      <b>Demographic Combinations</b>
      <Dropdown
        fluid multiple selection
        options={demoOptions} onChange={onChange} value={value}
      />
    </div>
  )
}

export default DemoSelections
