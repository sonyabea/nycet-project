import React from 'react'
import { VictoryChart, VictoryBoxPlot, VictoryAxis, VictoryLabel } from 'victory'
import _ from 'lodash'

const Plot = ({data}) => {

  let boxPlotData = data
    .map(d => ({ ...d, min: d.ci_low, max: d.ci_high, label: d.x.replace(' ', '\n') }))
    .map(d => _.pick(d, ['x', 'min', 'median', 'max', 'q1', 'q3', 'label']))

  return (
    <VictoryChart domainPadding={20}>
      <VictoryBoxPlot
        boxWidth={20}
        data={boxPlotData}
        maxLabels={(d) => d.label}
        maxLabelComponent={
          <VictoryLabel
            dx={-10} dy={-10}
            textAnchor="middle"
            style={{fontSize: 6}}
          />
        }
      />
      <VictoryAxis dependentAxis style={{tickLabels: {fontSize: 8}}}/>
    </VictoryChart>
  )
}

export default Plot
