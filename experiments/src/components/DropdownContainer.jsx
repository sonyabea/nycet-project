import React, { Component } from 'react'
import { connect } from 'react-redux'
import CustomDropdown from './CustomDropdown'
import { getDropdownOptions, getAllSelected, getData, getOrder } from '../selectors'
import { changeExperimentsFilter, changeDemographicsFilter } from '../actions'

class DropdownContainer extends Component {

  handleChange(event, element) {
    // look at column after this one
    // if it currently has a value that this one doesn't have, change that value
    // then look at the column after that (just use reduce i guess)
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

const getSelectors = type => state => ({
  dropdownOptions: getDropdownOptions(type)(state),
  selected: getAllSelected(type)(state),
  data: getData(type)(state),
  order: getOrder(type)(state)
})

export const ExperimentsDropdownContainer = connect(
  getSelectors('experiments'),
  { changeFilter: changeExperimentsFilter }
)(DropdownContainer)

export const DemographicsDropdownContainer = connect(
  getSelectors('demographics'),
  { changeFilter: changeDemographicsFilter } 
)(DropdownContainer)