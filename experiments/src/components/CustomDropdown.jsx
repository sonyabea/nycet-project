import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const addPadding = {
  'paddingRight': '10px'
}

const CustomDropdown = ({name, display, options, selected, onChange}) =>
  <div style={addPadding}>
    <span style={addPadding}>{display}:</span>
    <Dropdown
      selection compact
      type={name}
      options={options}
      text={selected}
      onChange={onChange}
    />
  </div>

export default CustomDropdown