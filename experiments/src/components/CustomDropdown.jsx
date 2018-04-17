import React from 'react'
import { Dropdown, Header } from 'semantic-ui-react'

const addPadding = {
  'paddingRight': '10px'
}

const CustomDropdown = ({name, display, options, selected, onChange}) =>
  <div style={addPadding}>
    <Header as='h4'>
      <Header.Content>
        <span style={addPadding}>{display}:</span>
        <Dropdown
          selection compact
          type={name}
          options={options}
          text={selected}
          onChange={onChange}
        />
      </Header.Content>
    </Header>
  </div>

export default CustomDropdown