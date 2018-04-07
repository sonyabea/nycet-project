import React, {Component} from 'react'
import SelectionContainer from './SelectionContainer.jsx'

class ExperimentsContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      'view': 'experimentsByOrg',
      'selectorsInfo': [{'type': 'Org',
                        'options': [{'text': 'AAFE'}, {'text':'AAA'}]
                      },
                        {'type': 'Experiments',
                        'options': ['xxx']}

      ],
      'plotInfo': {'expInfo': '',
                  'plotData': ''}
    };
  }

  render() {
    // according to selected view, render
    // appropriate selection dropdowns
    // plotContainer
    // and caceContainer
    let dropdowns = <SelectionContainer selectorsInfo={this.state.selectorsInfo} />
    // let plotContainer = <PlotContainer{this.state.plotInfo} />
    // let CACEContainer = <CACEContainer/>
    return <div>{dropdowns}</div>
    // return <div>hey</div>
  }
}

export default ExperimentsContainer
