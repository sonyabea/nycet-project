import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const addPadding = {
  'paddingRight': '10px'
}

const CustomDropdown = ({name, display, options, width, selected, onChange}) =>
  <div style={{ ...addPadding, display: 'flex', alignItems: 'center'}}>
    <span style={addPadding}>{display}:</span>
    <div style={{width}}>
      <Dropdown
        compact fluid selection
        type={name}
        options={options}
        text={selected}
        onChange={onChange}
      />
    </div>
  </div>

export default CustomDropdown