import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const Selector = ({type, options}) => {
  return (
    <Dropdown placeholder={'select ' + type} fluid search selection options={options} />
  )
}

export default Selector
