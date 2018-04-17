import React from 'react'
import { VictoryChart, VictoryBoxPlot, VictoryAxis, VictoryLabel, VictoryTooltip } from 'victory'

const Plot = ({data}) => 

  <VictoryChart domainPadding={20}>
    <VictoryBoxPlot
      boxWidth={20}
      data={data.map(d => ({ ...d, min: d.ci_low, max: d.ci_high }))}
      maxLabels={d => d.x.replace(' ', '\n')}
      maxLabelComponent={
        <VictoryLabel
          dx={-10} dy={-10}
          textAnchor="middle"
          style={{fontSize: 6}}
        />
      }
      medianLabels={d => `Treatment Size: ${d.treatment_pop}\n Control Size: ${d.control_pop}`}
      medianLabelComponent={ <VictoryTooltip /> }
    />
    <VictoryAxis dependentAxis style={{tickLabels: {fontSize: 8}}}/>
  </VictoryChart>

export default Plot
