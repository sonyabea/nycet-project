import React from 'react'
import { Message } from 'semantic-ui-react'
import { VictoryChart, VictoryBoxPlot, VictoryAxis, VictoryLabel, VictoryTooltip, VictoryVoronoiContainer } from 'victory'

const withCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

const GroupLabel = (props) =>
  <VictoryLabel
    { ...props }
    textAnchor="middle"
    style={{fontSize: 8, fontWeight: 400}}
  />

const Disclaimer = () =>
  <Message style={{fontSize: 9}} size='mini'>These plots illustrate the difference in voter turnout for specific experiments conducted by NYCET member organizations. Due to small sample sizes and other data inconsistencies, these results are only a snapshot of the overall efficacy of GOTV campaigns.</Message>

const Plot = ({ data, groupSizes: {treatment_pop, control_pop}, ...props }) =>
  <div style={{width: '100%'}}>
    <VictoryChart {...props}>
      <GroupLabel
        text={`Election Treatment Size: ${withCommas(treatment_pop)}`}
        x={150} y={30}
      />
      <GroupLabel
        text={`Election Control Size: ${withCommas(control_pop)}`}
        x={300} y={30}
      />
      <VictoryBoxPlot
        data={data.map(d => ({ ...d, min: d.ci_low, max: d.ci_high }))}
        maxLabels={d => d.x.replace(' ', '\n')}
        maxLabelComponent={
          <VictoryLabel
            dx={-10} dy={-10}
            textAnchor="middle"
            style={{fontSize: 6}}
          />
        }
        q3Labels={d => `Treatment Size: ${withCommas(d.treatment_pop)}\n Control Size: ${withCommas(d.control_pop)}`}
        events={['maxLabels', 'max', 'q3', 'median', 'q1', 'min'].map(c => ({
          target: c,
          eventHandlers: {
            onMouseOver: () => ({ target: "q3Labels", mutation: () => ({ active: true }) }),
            onMouseOut: () => ({ target: "q3Labels", mutation: () => ({ active: false }) })
          }
        }))}
        q3LabelComponent={
          <VictoryTooltip
            style={{fontSize: 6}}
            orientation="right"
            pointerLength={0}
          />
        }
      />
      <VictoryAxis tickFormat={t => ''}/>
      <VictoryAxis
        tickFormat={(t) => `${t}%`}
        dependentAxis
        label="Difference in Voter Turnout (CACE)"
        style={{
          tickLabels: {fontSize: 5},
          axisLabel: {fontSize: 7}
        }}/>
    </VictoryChart>
    <div style={{width: '73%', float: 'right', marginTop: '-12%', marginRight: '13%'}}>
      <Disclaimer></Disclaimer>
    </div>
  </div>

export default Plot
