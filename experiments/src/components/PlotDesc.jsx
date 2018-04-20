import React, { Component } from 'react'
import { VictoryChart, VictoryBoxPlot, VictoryTooltip } from 'victory'

class PlotDesc extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    const protoEvent = (target) => {
      return (
      {
        'target': target,
        'eventHandlers': {
          onMouseOver: () => ({ target: `${target}Labels`, mutation: () => ({ active: true }) }),
          onMouseOut: () => ({ target: `${target}Labels`, mutation: () => ({ active: false }) })
        }
      })
    }

    const targets = ['max', 'q3', 'median', 'q1', 'min']

    var atts = {
      data: [{ x: 1, min: 2, median: 5, max: 8, q1: 3, q3: 7 }],
      events: targets.map(t => protoEvent(t))
    }

    for (var t=0;t<targets.length;t++) {
      let target = targets[t]
      atts[`${target}Labels`] = `hot take on ${target}`
      atts[`${target}LabelComponent`] = <
        VictoryTooltip style={{fontSize: 30}}
        orientation="right"
        pointerLength={0}
        />
    }


    return (
      <div style={{height: '40%', textAlign: 'center'}}>
        <h5>How to Read the Box Plot</h5>
        <h6>Note: HOVER OVER ME!</h6>
        <div style={{margin:-10}}><VictoryBoxPlot {...atts}/></div>

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
