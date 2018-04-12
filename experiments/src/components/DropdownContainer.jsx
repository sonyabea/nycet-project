import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dropdown from './Dropdown'
import { getExperimentsDropdownOptions, getDemographicsDropdownOptions } from '../selectors'
import { changeExperimentsFilter, changeDemographicsFilter } from '../actions'

class DropdownContainer extends Component {

  componentDidMount() {
    // set default values
    let { dropdownOptions } = this.props

  }

  handleChange(e) {
    debugger
  }

  render() {
    let { selectionOptions } = this.props
    let selectorObjs = Object.keys(dropdownOptions).map((key, index) =>
      <Selector key={index} type={key} options={dropdownOptions[key]} />
    )
    return <div>{selectorObjs}</div>
  }
}

export const ExperimentsDropdownContainer = connect(
  state => { dropdownOptions: getExperimentsDropdownOptions(state) }, 
  { changeFilter: changeExperimentsFilter }
)(DropdownContainer)

export const DemographicsDropdownContainer = connect(
  state => { dropdownOptions: getDemographicsDropdownOptions(state) },
  { changeFilter: changeDemographicsFilter } 
)(DropdownContainer)