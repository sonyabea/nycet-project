import React from 'react'
import { Dropdown, Header } from 'semantic-ui-react'

const addPadding = {
  'padding-right': '10px'
}

const CustomDropdown = ({type, options, text, handleChange}) => (
  <div style={addPadding}>
    <Header as='h4'>
      <Header.Content>
        <span style={addPadding}>{type}:</span>
        <Dropdown 
          selection compact
          type={type}
          options={options}
          text={text}
          onChange={handleChange}
        />
      </Header.Content>
    </Header>
  </div>
)


export default CustomDropdown