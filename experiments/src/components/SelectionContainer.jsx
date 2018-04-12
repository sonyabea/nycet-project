import React, {Component} from 'react'
import { connect } from 'react-redux'
import Selector from './Selector'
import { getExperimentsSelectionOptions, getDemographicsSelectionOptions } from '../selectors'
import { changeExperimentsFilter, changeDemographicsFilter } from '../actions'

class SelectionContainer extends Component {

  componentDidMount() {
    return
  }

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
  state => { selectionOptions: getExperimentsSelectionOptions(state) }, 
  { changeFilter: changeExperimentsFilter }
)(SelectionContainer)

export const DemographicsSelectionContainer = connect(
  state => { selectionOptions: getDemographicsSelectionOptions(state) },
  { changeFilter: changeDemographicsFilter } 
)(SelectionContainer)