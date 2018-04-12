import React, { Component } from 'react'
import { connect } from 'react-redux'
import CustomDropdown from './CustomDropdown'
import { getExperimentsDropdownOptions, getDemographicsDropdownOptions } from '../selectors'
import { changeExperimentsFilter, changeDemographicsFilter } from '../actions'

class DropdownContainer extends Component {

  componentDidMount() {
    // set default values
    return
  }

  handleChange(e) {
    debugger
    return
  }

  render() {
    let { dropdownOptions } = this.props
    let selectorObjs = Object.keys(dropdownOptions).map((key, index) =>
      <CustomDropdown key={index} type={key} options={dropdownOptions[key]} />
    )
    return <div>{selectorObjs}</div>
  }
}

export const ExperimentsDropdownContainer = connect(
  state => ({ dropdownOptions: getExperimentsDropdownOptions(state) }),
  { changeFilter: changeExperimentsFilter }
)(DropdownContainer)

export const DemographicsDropdownContainer = connect(
  state => ({ dropdownOptions: getDemographicsDropdownOptions(state) }),
  { changeFilter: changeDemographicsFilter } 
)(DropdownContainer)