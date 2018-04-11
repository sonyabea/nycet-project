import React, {Component} from 'react'
import { connect } from 'react-redux'
import Selector from './Selector'
import { changeExperimentsFilter, changeDemographicsFilter } from '../actions'

class SelectionContainer extends Component {

  handleChange() {
    return 
  }

  render() {
    let selectorObjs = this.props.selectorsInfo.map((selectionInfo, index) =>
      <Selector key={index} {...selectionInfo} />
    )
    return <div>{selectorObjs}</div>
  }
}

export const ExperimentsSelectionContainer = connect(
  null, 
  { changeExperimentsFilter: changeFilter }
)(SelectionContainer)

export const DemographicsSelectionContainer = connect(
  null,
  { changeDemographicsFilter: changeFilter } 
)(SelectionContainer)