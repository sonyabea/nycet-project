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
    // let expInfo = <ExperimentInfo{...this.props.expInfo} />
    let plot = <Plot{...this.props.plotData} />
    // let plots = this.props.plotStats.map(stats =>
    //   <Plot {stats} />
    // )
    return <div>{plot}</div>
  }

}

export default PlotContainer
