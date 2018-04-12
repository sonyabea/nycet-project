import React, { Component } from 'react'
import { VictoryChart, VictoryBoxPlot } from 'victory'
import _ from 'lodash'

const Plot = ({data}) => {
  // figure out what column is on the xaxis
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
