import React from 'react'
import { VictoryBoxPlot, VictoryTooltip, VictoryLabel, VictoryGroup } from 'victory'

const PlotDesc = () => {
  const changeColorAndShowTooltip = (target) => {
    return (
    {
      'target': target,
      'eventHandlers': {
        onMouseOver: () => {
          return [
            { target: `${target}Labels`, mutation: () => ({ active: true }) },
            { target: target, mutation: () => ({ style: {stroke: 'red', fill: 'grey'} }) }
          ]},
        onMouseOut: () => {
          return [
            { target: `${target}Labels`, mutation: () => ({ active: false }) },
            { target: target, mutation: () => ({ style: {stroke: target.includes('q') ? 'white': 'black', fill: 'grey'} }) }
          ]}
      }
    })
  }

  const addLabelAtt = (atts, target) => (
    {...atts,
      [`${target}Labels`]: `hot take on ${target}`,
      [`${target}LabelComponent`]:
        <VictoryTooltip
          style={{fontSize: 40}}
          orientation="right"
          pointerLength={0}
        />
    }
  )

  const targets = ['max', 'q3', 'median', 'q1', 'min']

  var atts = {
    data: [{ x: 1, min: 2, median: 5, max: 8, q1: 3, q3: 7 }],
    events: targets.map(changeColorAndShowTooltip),
    boxWidth: 90,
  }

  var allAtts = targets.reduce(addLabelAtt, atts)

  return (
    <div style={{height: '35%', textAlign: 'center', 'verticalAlign': 'middle',
      border: '1px dashed grey', borderRadius: '5px', padding: '5%'}}>
      <div>
        <VictoryGroup height={500} padding={{top:80, bottom: 50}}>
          <VictoryLabel text="How to Read a Box Plot" dx={30} dy={30} style={{fontSize: 40}}/>
          <VictoryBoxPlot {...allAtts}/>
          <VictoryLabel text="Hover over me!" dx={120} dy={490} style={{fontSize:30}}/>
        </VictoryGroup>
      </div>
    </div>
  )

}

export default PlotDesc
