import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const CustomDropdown = ({type, options}) => {
  return (
    <Dropdown placeholder={'select ' + type} fluid search selection options={options} />
  )
}

export default CustomDropdown
