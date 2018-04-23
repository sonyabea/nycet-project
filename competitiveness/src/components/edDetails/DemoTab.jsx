import React from 'react';
import { Tab, Table } from 'semantic-ui-react'
import Axis from './Axis'
const d3 = require('d3')

const DemoTab = ({tab, height, width}) => {

  let y = d3.scaleLinear()
    .domain([0, d3.max(tab.data)])
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
    <Tab.Pane>
      <div>
        <svg width={ width } height={ height }>
          <g className='barchart-layer'>
            <Axis axis={yAxis} />
            { rects }   
          </g>
        </svg> 
      </div>
      <Table className='label-container'
        style={{paddingLeft: x.bandwidth() * x.padding()}}>
        <Table.Body>
          <Table.Row>
             { labels }
          </Table.Row>
        </Table.Body>
     </Table>
    </Tab.Pane>
  )
}

export default DemoTab;

