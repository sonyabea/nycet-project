import React, {Component} from 'react'
import Selector from './componenets/selector.jsx'

class SelectionContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
          selectorsInfo: []
          // {'type': "",
          // 'options': [] }

        };
    }

    changeSelection(selectorsInfo) {
      this.setState(selectorsInfo)
    }

    // This method will be sent to the child component
    handler() {
        this.setState({
            messageShown: true
        });
    }

    // Render the child component and set the action property with the handler as value
    render() {
      let selectorObjs = this.state.selectorsInfo.map(selectionInfo => < Selector {...selectioninfo} />)
      return <div>{selectorObjs}</div>;
    }
}

export SelectionContainer
