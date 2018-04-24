import React from 'react'
import { VictoryBoxPlot, VictoryTooltip, VictoryLabel, VictoryGroup } from 'victory'

const PlotDesc = () => {
  const changeColorAndShowTooltip = (target) => ({
    target,
    eventHandlers: {
      onMouseOver: () => [
        { target: `${target}Labels`, mutation: () => ({ active: true }) },
        { target: target, mutation: () => ({ style: {stroke: 'red', fill: 'grey', strokeWidth: 3} }) }
      ],
      onMouseOut: () => [
        { target: `${target}Labels`, mutation: () => ({ active: false }) },
        { target: target, mutation: () => ({ style: {stroke: target.includes('q') ? 'white': 'black', fill: 'grey'} }) }
      ]
    }
  })

  const addLabelAtt = (atts, target) => ({
    ...atts,
    [`${target}Labels`]: d => blurbs[target],
    [`${target}LabelComponent`]:
      <VictoryTooltip
        style={{fontSize: 35}}
        orientation="right"
        pointerLength={0}
      />
  })

  const targets = ['max', 'q3', 'median', 'q1', 'min']
  const blurbs = {'max':'Upper Confidence Bound\n97.5% of values fall below this band',
                  'q3':'Quartile Group 3\n50% of values lie below and\n25% lie above this group',
                  'median':'Median\nMid-point where 50% of values fall\nbelow and 50% fall above this line',
                  'q1':'Quartile Group 2\n25% of values lie below and\n50% lie above this group',
                  'min':'Lower Confidence Bound\n2.5% of values fall below this band'}

  let atts = {
    data: [{ x: 1, min: 2, median: 5, max: 8, q1: 3, q3: 7 }],
    events: targets.map(changeColorAndShowTooltip),
    boxWidth: 90
  }

  let allAtts = targets.reduce(addLabelAtt, atts)

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
