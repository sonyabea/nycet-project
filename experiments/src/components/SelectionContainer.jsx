import React, {Component} from 'react'
import Selector from './Selector'

class SelectionContainer extends Component {
  constructor(props) {
    super(props)
  }

  changeSelection(selectorsInfo) {
    this.setState(selectorsInfo)
  }

  handler() {
    this.setState({
      messageShown: true
    })
  }

  render() {
    let selectorObjs = this.props.selectorsInfo.map((selectionInfo, index) =>
      <Selector key={index} {...selectionInfo} />
    )
    return <div>{selectorObjs}</div>;
  }
}

export default SelectionContainer
