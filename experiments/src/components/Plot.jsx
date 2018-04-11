import React, { Component } from 'react'
import { VictoryChart, VictoryBoxPlot } from 'victory';
import { VictoryBoxPlot } from 'victory';

const Plot = ({data}) => {
  return (
    <VictoryChart domainPadding={20}>
      <VictoryBoxPlot
        boxWidth={20}
        data={data}
      />
    </VictoryChart>
  )
}

export default Plot
