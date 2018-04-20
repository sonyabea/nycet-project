import React, { Component } from 'react'
import { VictoryChart, VictoryBoxPlot } from 'victory'

class PlotDesc extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    // let protoEvent = (target) => {
    //   target: target,
    //   eventHandlers: {
    //     onMouseOver: () => ({ target: `${target}Labels`, mutation: () => ({ active: true }) }),
    //     onMouseOut: () => ({ target: `${target}Labels`, mutation: () => ({ active: false }) })
    //   }
    // }
    //
    // let targets = ['max', 'q3', 'median', 'q1', 'min']
    // data={this.props.data} viewbox="0,0, 100%, 100%"
    //   events:{events}
    var atts = {
      data: [{ x: 1, min: 2, median: 5, max: 8, q1: 3, q3: 7 }],
      // events: targets.map(t => protoEvent(t))
    }



    return (
      <div style={{height: '40%'}}>
        <VictoryBoxPlot {...atts}/>
      </div>
    )
  }

}

PlotDesc.defaultProps = {
  data: [
    { x: 1, min: 2, median: 5, max: 8, q1: 3, q3: 7 }
  ]
}

export default PlotDesc
