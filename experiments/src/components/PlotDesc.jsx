import React from 'react'
import { VictoryBoxPlot, VictoryTooltip, VictoryLabel, VictoryGroup } from 'victory'

const PlotDesc = () => {
  const changeColorAndShowTooltip = (target) => {
    let groupedTargets = targets[target]

    let highlights = groupedTargets.map(
      t => ( {target: t, mutation: () => ({ style: {stroke: 'red', fill: 'grey', strokeWidth: 3} }) } )
    )

    let unhighlights = groupedTargets.map(
      t => ( {target: t, mutation: () => ({ style: {stroke: target.includes('q') ? 'white': 'black', fill: 'grey'} }) } )
    )

    return ({
    target,
    eventHandlers: {
      onMouseOver: () => [ { target: `${target}Labels`, mutation: () => ({ active: true }) } ].concat(highlights),
      onMouseOut: () => [ { target: `${target}Labels`, mutation: () => ({ active: false }) } ].concat(unhighlights)
      }
    })
  }

  const addLabelAtt = (atts, target) => {
    return ({
      ...atts,
      [`${target}Labels`]: d => blurbs[target],
      [`${target}LabelComponent`]:
        <VictoryTooltip
          style={{fontSize: 35}}
          orientation="right"
          pointerLength={0}
        />
    })
  }

  const blurbs = {'max':'95% Confidence Interval \n95% of simulations contained within this range',
                  'q3':'Interquartile Range (IQR) \nMiddle 50% of simulations',
                  'median':'Median\nMid-point where 50% of simulations fall\nbelow and 50% fall above this line',
                  'q1':'Interquartile Range (IQR) \nMiddle 50% of simulations',
                  'min':'95% Confidence Interval \n95% of simulations contained within this range'}

  const targets = {
    'max': ['max', 'min'],
    'q3': ['q3', 'q1'],
    'median': ['median'],
    'q1': ['q3', 'q1'],
    'min': ['max', 'min']
  }

  let atts = {
    data: [{ x: 1, min: 2, median: 5, max: 8, q1: 3, q3: 7 }],
    events: Object.keys(targets).map(changeColorAndShowTooltip),
    boxWidth: 90
  }

  let allAtts = Object.keys(targets).reduce(addLabelAtt, atts)
  return (
    <div style={{height: '35%', textAlign: 'center', 'verticalAlign': 'middle',
      border: '1px dashed grey', borderRadius: '5px', padding: '5%'}}>
      <div>
        <VictoryGroup height={500} padding={{top:80, bottom: 110}}>
          <VictoryLabel text="How to Read this Plot" dx={30} dy={30} style={{fontSize: 40}}/>
          <VictoryBoxPlot {...allAtts}/>
          <VictoryLabel text="Hover over me!" dx={120} dy={420} style={{fontSize:30}}/>
          <VictoryLabel text="1000 simulations run per experiment" dx={0} dy={485} style={{fontSize:30, fontStyle: "italic"}}/>
        </VictoryGroup>
      </div>
    </div>
  )

}

export default PlotDesc
