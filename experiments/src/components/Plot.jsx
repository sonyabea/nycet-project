import React from 'react'
import { Message } from 'semantic-ui-react'
import { VictoryChart, VictoryBoxPlot, VictoryAxis, VictoryLabel, VictoryTooltip } from 'victory'

const withCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
const confidenceText = x => {
  if ((x.ci_low < 0) && (x.ci_high > 0)){
    return `${Math.abs(x.ci_low)}% less and ${x.ci_high}% more`;
  } else if ((x.ci_low >= 0) && (x.ci_high > 0)){
    return `${x.ci_low}% and ${x.ci_high}% more`;
  } else if ((x.ci_low < 0) && (x.ci_high < 0)){
    return `${Math.abs(x.ci_high)}% and ${Math.abs(x.ci_low)}% less`;
  } else {
    return ''
  }
}

const formattedDescription = x =>
  `Treatment Size: ${withCommas(x.treatment_pop)}\nControl Size: ${withCommas(x.control_pop)}\r\nSuccessfully contacted voters were\nbetween ${confidenceText(x)}\nlikely to vote with 95% confidence.`

const GroupLabel = (props) =>
  <VictoryLabel
    { ...props }
    textAnchor="middle"
    style={{fontSize: 8, fontWeight: 400}}
  />

const Disclaimer = () =>
  <Message style={{fontSize: 9}} size='mini'>These plots illustrate the difference in voter turnout for specific experiments conducted by NYCET member organizations. Due to small sample sizes and other data inconsistencies, these results are only a snapshot of the overall efficacy of GOTV campaigns.</Message>

const Plot = ({ data, groupSizes: {treatment_pop, control_pop} }) =>
  <div style={{width: '100%'}}>
    <VictoryChart domainPadding={(-35 * data.length) + 230}>
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
        q3Labels={d => formattedDescription(d)}
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
        label="Change in Voter Likelihood (CACE)"
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
