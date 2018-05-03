import React from 'react';
import { Tab } from 'semantic-ui-react'
import Axis from './Axis'
import TurnoutLine from './TurnoutLine'
const d3 = require('d3')

const TurnoutTab = ({tab, plotHeight, plotWidth, overall}) => {

  let windowHeight = (typeof(plotHeight) === 'undefined') ? 200 : plotHeight;
  let windowWidth = (typeof(plotWidth) === 'undefined') ? 200 : plotWidth;
  let margin = {top: 20, right: 70, bottom: 20, left: 35}
  let width = windowWidth - margin.left - margin.right
  let height = windowHeight - margin.top - margin.bottom

  let cats = new Set(tab.cols.map((d) => d.split("_")[0]))

  let years = overall.cols.map((col) => col.split('_')[1])
  let parseTime = d3.timeParse("%Y");
  let dates = years.map((y) => parseTime(`20${y}`))

  let datasets = {}
  cats.forEach((cat) => {
    //ugh so inefficient
    let data = []
    tab.cols.forEach((col, i) => (
      col.split("_")[0] === cat) ? data.push(tab.data[i]) : null)
    datasets[cat] = data.map((d, i) => ({date: dates[i], data: d}))
  })

  let overallData = overall.data.map((d, i) => (
    {data: d, date: dates[i]}
  ))

  let x = d3.scaleTime().range([0, width]),
      y = d3.scaleLinear().domain([0, 1]).range([height, 0]),
      z = d3.scaleOrdinal(d3.schemeCategory10);

  x.domain(d3.extent(dates))
  z.domain(Object.keys(datasets))

  let line = d3.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.data); });
  
  let yAxis = d3.axisLeft(y).ticks(5, "%")
  let xAxis = d3.axisBottom(x).ticks(5, "%Y")

  let lines = Object.keys(datasets).map((d, i) => (
    <TurnoutLine label={d} 
                 line={line(datasets[d])}
                 color={z(d)}
                 labelTranslate={[x(datasets[d][0].date),
                                  y(datasets[d][0].data)]}
                 key={`turnout-line-${i}`}
                 dashed={false}
                                />
               )
  )

  let overallLine = <TurnoutLine label='Overall'
                                 line={line(overallData)}
                                 color={z('overall')}
                                 labelTranslate={[x(overallData[0].date),
                                 y(overallData[0].data)]}
                                 dashed={true}
                                 className='overall-line'
                               />


  return (
    <Tab.Pane style={{borderTop: "1px solid #d4d4d5"}}>
      <div width={windowWidth} height={windowHeight}>
        <svg width={ windowWidth } height={ windowHeight }>
            <g className='linechart-layer'
               transform={`translate(${margin.left},${margin.top})`}
            >
          <Axis axis={yAxis} />
          <Axis axis={xAxis} translate={`translate(0, ${height})`}/>
            { overallLine }
            { lines }
          </g>
        </svg>
      </div>
    </Tab.Pane>
  )
}

export default TurnoutTab;

