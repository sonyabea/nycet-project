import React from 'react'
import { Dropdown } from 'semantic-ui-react'


const DemoSelections = ({options, onChange, value}) => {
  let demoOptions = options.map(val => ({key: val, text: val, value: val}))
  return <Dropdown placeholder='Select up to 8 demographic combinations'
    fluid multiple selection
    options={demoOptions} onChange={onChange} value={value}/>
}

export default DemoSelections
