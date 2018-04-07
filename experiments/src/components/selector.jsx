import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const Selector = (props) => {
  debugger
  const placeholderText = `Select ${props.type}`

    return (
        <Dropdown placeholder={placeholderText} fluid search selection options={props.options} />
    )
}

export default Selector
