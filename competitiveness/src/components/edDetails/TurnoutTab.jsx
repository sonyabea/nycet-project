import React from 'react';
import { Tab } from 'semantic-ui-react'
import Axis from './Axis'
const d3 = require('d3')

const TurnoutTab = ({tab, plotHeight, plotWidth}) => {

  let windowHeight = (typeof(plotHeight) === 'undefined') ? 200 : plotHeight;
  let windowWidth = (typeof(plotWidth) === 'undefined') ? 200 : plotWidth;
  let margin = {top: 20, right: 70, bottom: 20, left: 35}
  let width = windowWidth - margin.left - margin.right
  let height = windowHeight - margin.top - margin.bottom
  
  //hardcode years for now
  let dateStrings = ["201211", "201311", "201411", "201511", "201611"]
  let parseTime = d3.timeParse("%Y%m");
  let dates = dateStrings.map((d) => parseTime(d))
  console.log(dates)


  let cats = new Set(tab.cols.map((d) => d.split("_")[0]))
  let datasets = {}
  cats.forEach((cat) => {
    //ugh so inefficient
    let data = []
    tab.cols.forEach((col, i) => (
      col.split("_")[0] === cat) ? data.push(tab.data[i]) : null)
    datasets[cat] = data.map((d, i) => ({date: dates[i], data: d}))
  })

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

  let lines = Object.keys(datasets).map((d, i) => {
    let finalDatum = datasets[d][datasets[d].length - 1]

    console.log(finalDatum)
    return (
    <g key={`turnout-line-${i}`}>
      <path 
        className='turnout-line'
        d={line(datasets[d])}
        style={{stroke: z(d)}}
      />
      <text
        transform={`translate(${x(finalDatum.date)}, ${y(finalDatum.data)})`}
        x={3}
        dy="0.35em"
        style={{font: '10px sans-serif'}}
      >
        { d } 
      </text>
    </g>
    )
  })

  return (
    <Tab.Pane style={{borderTop: "1px solid #d4d4d5"}}>
      <div width={windowWidth} height={windowHeight}>
        <svg width={ windowWidth } height={ windowHeight }>
            <g className='linechart-layer'
               transform={`translate(${margin.left},${margin.top})`}
            >
          <Axis axis={yAxis} />
          <Axis axis={xAxis} translate={`translate(0, ${height})`}/>
            { lines }
          </g>
        </svg>
      </div>
    </Tab.Pane>
  )
}

export default TurnoutTab;

