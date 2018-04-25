import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const addPadding = {
  'paddingRight': '10px'
}

const CustomDropdown = ({name, display, selected, ...props}) =>
  <div style={addPadding}>
    <span style={addPadding}>{display}:</span>
    <Dropdown
      selection compact
      type={name}
      text={selected}
      { ...props }
    />
  </div>

export default CustomDropdown