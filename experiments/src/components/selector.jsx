import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const Selector = ({selectorType, selectionOptions}) => {

  const DropdownSelection = () => (
    <Dropdown placeholder="Select ${selectorType}" fluid search selection options={selectionOptions} />
  )

    return (
        <div>
            {/* The button will execute the handler function set by the parent component */}
            <Button onClick={this.props.action} />
        </div>
    )
}

export Selector
