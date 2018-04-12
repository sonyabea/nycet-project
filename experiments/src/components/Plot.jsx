import React, { Component } from 'react'
import { VictoryChart, VictoryBoxPlot } from 'victory'
import _ from 'lodash'

const Plot = ({data}) => {
  let boxPlotData = _.pick(['x', 'min', 'median', 'max', 'q1', 'q3'])
  // figure out what column is on the xaxis
  return (
    <VictoryChart domainPadding={20}>
      <VictoryBoxPlot
        boxWidth={20}
        data={boxPlotData}
      />
    </VictoryChart>
  )
}

export default Plot
