import React, { Component } from 'react'
import { VictoryChart } from 'victory';
import { VictoryBoxPlot } from 'victory';

class Plot extends Component {
  render () {
    const plot = <VictoryChart domainPadding={20}>
      <VictoryBoxPlot
        boxWidth={20}
        data={this.props.data}
      />
    </VictoryChart>

    return plot
  }
}

export default Plot
