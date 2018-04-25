import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import OfficeDropdown from './OfficeDropdown'
import { loadData } from '../../actions/index.js'

class DropdownContainer extends Component {
  handleChange (event, element) {
    let election = element.value.toLowerCase()
    let distType = this.props.parentDistrictType
    let distId = this.props.parentDistrictID
    this.props.loadData({parentDistType: distType, parentDistId: distId, election: election})
  }

  render() {
    return <OfficeDropdown onChange={this.handleChange.bind(this)}/>
  }
}

const mapStateToProps = (state) => (
  {parentDistrictID: state.selectedDistrict,
   parentDistrictType: state.parentDistrictType
  })

export const OfficeDropdownContainer = connect(mapStateToProps, { loadData: loadData })(DropdownContainer)
