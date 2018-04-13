import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const CustomDropdown = ({type, options, text, handleChange}) => (
  <div>
    {type}
    <Dropdown 
      fluid search selection
      type={type}
      options={options}
      text={text}
      onChange={handleChange}
    />
  </div>
)

export default CustomDropdown
