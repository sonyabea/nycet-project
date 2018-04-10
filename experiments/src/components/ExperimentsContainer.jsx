import React, {Component} from 'react'
import SelectionContainer from './SelectionContainer.jsx'
import PlotContainer from './PlotContainer.jsx'

const axios = require('axios');

class ExperimentsContainer extends Component {
  constructor(props) {
    super(props)
    const 'view' = 'experimentsByOrg'
    const table = 'by_org'


    const orgs = ''

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
      'plotInfo': {'expInfo': 'blah blah blah this is experiment info',
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
    // debugger
    let dropdowns = <SelectionContainer selectorsInfo={this.state.selectorsInfo} />
    let plotContainer = <PlotContainer{...this.state.plotInfo} />
    // let CACEContainer = <CACEContainer/>
    return <div style={divStyle}>{dropdowns}{plotContainer}</div>

  }

  function setStateAtt (json) {
    axios({
      method:'post',
      url: `localhost:8080/${table}/`,
      json: json
    })
  }

  componentDidMount() {
    let jsonFilters = [
      {'unique': true, 'columns': ['org']},
      {'unique': true, 'columns': ['election']},
      {'columns': ['org', 'election', 'contact_rate', 'CACE', 'control', 'treatment']},
      {'columns': ['org', 'election', 'q1', 'q3', 'min', 'max', 'median']}
    ]

    let attributes = ['orgs', 'elections', 'plotInfo', 'plotStats']
    let promises = jsonFilters.map(e => setStateAtt(e))
    Promise.all(promises)
      .then(values => {
        values.map((value, index) => this.setState(attributes[index], value))
      })

  }
}

export default ExperimentsContainer
