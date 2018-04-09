import React, {Component} from 'react'
import SelectionContainer from './SelectionContainer.jsx'
import PlotContainer from './PlotContainer.jsx'

class ExperimentsContainer extends Component {
  constructor(props) {
    super(props)

    const plotStats = [
      { x: 'A', min: 2, median: 5, max: 10, q1: 3, q3: 7 },
      { x: 'B', min: 1, median: 4, max: 9, q1: 3, q3: 6 },
      { x: 'Z', min: 1, median: 6, max: 12, q1: 4, q3: 10 },
    ];


    this.state = {
      'view': 'experimentsByOrg',
      'selectorsInfo': [{'type': 'Org',
                        'options': [{'text': 'AAFE'}, {'text':'AAA'}]
                      },
                        {'type': 'Experiments',
                        'options': [{'text': 'xxx'}, {'text': 'yyy'}, {'text': 'zzz'}]}

      ],
      'plotInfo': {'expInfo': '',
                  'plotData': plotStats}
    };
  }


  render() {
    let divStyle = {
      backgroundColor: 'white'
    }
    // according to selected view, render
    // appropriate selection dropdowns
    // plotContainer
    // and caceContainer
    let dropdowns = <SelectionContainer selectorsInfo={this.state.selectorsInfo} />
    let plotContainer = <PlotContainer{...this.state.plotInfo} />
    // let CACEContainer = <CACEContainer/>
    return <div style={divStyle}>{dropdowns}{plotContainer}</div>

  }
}

export default ExperimentsContainer
