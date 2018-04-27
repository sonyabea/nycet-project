import React from 'react';
import { Tab, Table } from 'semantic-ui-react'
import Axis from './Axis'
const d3 = require('d3')

const DemoTab = ({tab, plotHeight, plotWidth}) => {
  let windowHeight = (typeof(plotHeight) === 'undefined') ? 200 : plotHeight;
  let windowWidth = (typeof(plotWidth) === 'undefined') ? 200 : plotWidth;
  let margin = {top: 20, right: 20, bottom: 5, left: 35}
  let width = windowWidth - margin.left - margin.right
  let height = windowHeight - margin.top - margin.bottom

  let y = d3.scaleLinear()
    .domain([0, 1])
    .rangeRound([height, 0]);


  let x = d3.scaleBand()
    .domain(tab.labels)
    .rangeRound([0, width])
    .padding(0.1);

  let yAxis = d3.axisLeft(y).ticks(5, "%")

  //lets not shit ourselves you'll make this a custom component in like a day
  let rects = tab.data.map((d, i) => (
    <rect
        x={x(tab.labels[i])}
        y={`${y(d)}`}
        width={x.bandwidth()}
        height={`${height-y(d)}`}
        className='bar'
        key={`demo-rect-${i}`}
      />))

  let labels = tab.labels.map((l, i) => (
    <Table.Cell style={{width: x.bandwidth() + (x.padding() * x.bandwidth())}}
                key={`demo-label-${i}`}
                className='bar-label'>
         { l } 
    </Table.Cell>
    ))

  return (
    <Tab.Pane style={{borderTop: "1px solid #d4d4d5"}}>
      <div>
        <svg width={ windowWidth } height={ windowHeight }>
          <g className='barchart-layer'
             transform={`translate(${margin.left} ,${margin.top})`}
          >
            <Axis axis={yAxis} />
            { rects }   
          </g>
        </svg> 
      </div>
      <Table className='label-container'
        style={{paddingLeft: margin.left + x.bandwidth() * x.padding()}}>
        <Table.Body style={{verticalAlign: "top"}}>
          <Table.Row>
             { labels }
          </Table.Row>
        </Table.Body>
     </Table>
    </Tab.Pane>
  )
}

export default DemoTab;

