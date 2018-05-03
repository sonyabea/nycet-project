import React, { Component } from 'react'
import { connect } from 'react-redux'; 
import OfficeDropdown from './OfficeDropdown'
import { withRouter } from 'react-router-dom';

class DropdownContainer extends Component {
  handleChange (event, element) {
    let election = element.value.toLowerCase()
    this.props.history.push(`?election=${election}`)
  }

  render() {
    return <OfficeDropdown onChange={this.handleChange.bind(this)}
                           selected={this.props.selected}/>
  }
}

const mapStateToProps = (state) => (
  {selected: state.selectedElection})

export const OfficeDropdownContainer = connect(mapStateToProps)(withRouter((DropdownContainer)))
