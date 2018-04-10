import React, {Component} from 'react'
import ExperimentInfo from './ExperimentInfo.jsx'
import Plot from './Plot.jsx'

class PlotContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    // debugger
    let expInfo = <ExperimentInfo info={this.props.expInfo} />
    let plot = <Plot data={this.props.plotData} />
    // let plots = this.props.plotStats.map(stats =>
    //   <Plot {stats} />
    // )
    return <div class='plotContainer'>{expInfo}{plot}</div>
  }

}

export default PlotContainer
