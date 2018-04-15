import React from 'react'
import { VictoryChart, VictoryBoxPlot, VictoryAxis } from 'victory'
import _ from 'lodash'

const Plot = ({data}) => {

  let axisStyle = {
    tickLabels: {
      fontSize: 6
    }
  }

  let boxPlotData = data
    .map(d => ({ ...d, min: d.ci_low, max: d.ci_high, x: d.x.replace(' ', '\n') }))
    .map(d => _.pick(d, ['x', 'min', 'median', 'max', 'q1', 'q3']))

  return (
    <VictoryChart domainPadding={20}>
      <VictoryBoxPlot
        boxWidth={20}
        data={boxPlotData}
      />
      <VictoryAxis style={axisStyle} />
    </VictoryChart>
  )
}

export default Plot
