import React from 'react';
import { Tab } from 'semantic-ui-react'
const d3 = require('d3')

const DemoTab = ({tab, height, width}) => {

  let y = d3.scaleLinear()
    .domain([0, d3.max(tab.data)])
    .rangeRound([height, 0]);

  let x = d3.scaleBand()
    .domain(tab.labels)
    .rangeRound([0, width]);

  //lets not shit ourselves you'll make this a custom comp in like a day
  let rects = tab.data.map((d, i) => (
    <rect
        x={x(tab.labels[i])}
        y={y(d)}
        width={x.bandwidth()}
        height={height-y(d)}
    />))

  return (
    <Tab.Pane>

      <svg width={ 300 } height={ 500 }>
        <g className='barchart-layer'>
          { rects }   
        </g>
      </svg> 
  
    </Tab.Pane>
  )
}

export default DemoTab;

