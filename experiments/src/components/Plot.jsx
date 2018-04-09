import React, { Component } from 'react'
import { VictoryChart } from 'victory';
import { VictoryBoxPlot } from 'victory';

class Plot extends Component {
  render () {
    const plot = <VictoryChart domainPadding={20}>
      <VictoryBoxPlot
        boxWidth={20}
        data={[
          { x: 'A', min: 2, median: 5, max: 10, q1: 3, q3: 7 },
          { x: 'B', min: 1, median: 4, max: 9, q1: 3, q3: 6 },
          { x: 'Z', min: 1, median: 6, max: 12, q1: 4, q3: 10 },
        ]}
      />
    </VictoryChart>

    return plot
  }
}

export default Plot
