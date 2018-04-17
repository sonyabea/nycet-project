import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const DemoSelections = ({options, onChange}) => {
  function makeDict(val) {
    var dict = {}
    dict['key'] = val
    dict['text'] = val
    dict['value'] = val
    return dict
  }

  let demoOptions = options.map(label => makeDict(label))
  return <Dropdown placeholder='Select up to 8 demographic combinations' fluid multiple selection options={demoOptions} onChange={onChange} />
}

export default DemoSelections
