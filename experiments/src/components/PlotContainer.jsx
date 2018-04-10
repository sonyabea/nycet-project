import React, {Component} from 'react'
import ExperimentInfo from './ExperimentInfo.jsx'
import Plot from './Plot.jsx'

class PlotContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let expInfo = <ExperimentInfo info={this.props.expInfo} />
    let plot = <Plot data={this.props.plotData} />
    return <div class='plotContainer'>{expInfo}{plot}</div>
  }

}

export default PlotContainer
