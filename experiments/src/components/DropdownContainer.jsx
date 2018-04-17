import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import CustomDropdown from './CustomDropdown'
import { getDropdownOptions, getAllSelected, getData, getColumnNames } from '../selectors'
import { changeExperimentsFilter, changeDemographicsFilter } from '../actions'

class DropdownContainer extends Component {

  deriveSelected (category, value) {
    let { allSelected, data, columnNames } = this.props
    let selected = { ...allSelected, [category]: value }
    let index = columnNames.indexOf(category) + 1
    let [ previousColumns, relevantColumns ] = [ columnNames.slice(0, index), columnNames.slice(index) ]
    let initialObject = { data: _.filter(data, _.pick(selected, previousColumns)), selected }
    return relevantColumns.reduce((a, column) => {
      let { data, selected } = a
      let value = _.chain(data).filter(_.pick(selected, column)).isEmpty().value() ?
        _.maxBy(data, 'control_pop')[column] : selected[column]
      let newSelected = { [column]: value }
      return { data: _.filter(data, newSelected), selected: { ...selected, ...newSelected } }
    }, initialObject).selected
  }

  handleChange (event, element) {
    let newSelected = this.deriveSelected(element.type, element.value)
    this.props.changeFilter(newSelected)
  }

  render () {
    let { dropdownOptions } = this.props
    let dropdowns = dropdownOptions.map(d =>
      <CustomDropdown { ...d } key={d.name} handleChange={this.handleChange.bind(this)} />
    )
    return <div className='flex-container'>{dropdowns}</div>
  }
}

const getSelectors = type => state => ({
  dropdownOptions: getDropdownOptions(type)(state),
  allSelected: getAllSelected(type)(state),
  data: getData(type)(state),
  columnNames: getColumnNames(type)(state),
})

export const ExperimentsDropdownContainer = connect(
  getSelectors('experiments'),
  { changeFilter: changeExperimentsFilter }
)(DropdownContainer)

export const DemographicsDropdownContainer = connect(
  getSelectors('demographics'),
  { changeFilter: changeDemographicsFilter } 
)(DropdownContainer)