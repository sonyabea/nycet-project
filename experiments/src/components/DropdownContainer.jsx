import React, { Component } from 'react'
import { connect } from 'react-redux'
import CustomDropdown from './CustomDropdown'
import { getExperimentsDropdownOptions, getDemographicsDropdownOptions, getAllSelected } from '../selectors'
import { changeExperimentsFilter, changeDemographicsFilter } from '../actions'

class DropdownContainer extends Component {

  handleChange(event, element) {
    this.props.changeFilter({[element.type]: event.target.innerText})
  }

  render() {
    let { dropdownOptions, selected } = this.props
    let selectorObjs = Object.keys(dropdownOptions).map((key, index) =>
      <CustomDropdown
        type={key}
        key={index}
        options={dropdownOptions[key]}
        text={selected[key]}
        handleChange={this.handleChange.bind(this)}
      />
    )
    return <div>{selectorObjs}</div>
  }
}

export const ExperimentsDropdownContainer = connect(
  state => ({ 
    dropdownOptions: getExperimentsDropdownOptions(state),
    selected: getAllSelected('experiments')(state) 
  }),
  { changeFilter: changeExperimentsFilter }
)(DropdownContainer)

export const DemographicsDropdownContainer = connect(
  state => ({ 
    dropdownOptions: getDemographicsDropdownOptions(state),
    selected: getAllSelected('demographics')(state)
  }),
  { changeFilter: changeDemographicsFilter } 
)(DropdownContainer)