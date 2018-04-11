import React, {Component} from 'react'
import ExperimentInfo from './ExperimentInfo'
import Plot from './Plot'

const PlotContainer = ({plotInfo, plotData}) => {
  return (
    <div class='plotContainer'>
      <ExperimentInfo info={plotInfo} />
      <Plot data={plotData} />
    </div>
  )
}

export default PlotContainer
