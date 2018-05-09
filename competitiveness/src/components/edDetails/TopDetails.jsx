import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'

const toPercent = (val) => {
  if (!val) {
    return '' 
  }
  else {
    return (`${((val > 1) ? 100 : val * 100).toFixed(2)}%`)
  }
}

const humanReadable = (el) => {
  let formattedEl = el.split('_').map(
      (w) => (w.split('').length < 3) ? w.toUpperCase() : w.replace('_', ' ')).join('/')
  return (
    <span style={{textTransform: 'capitalize'}}>
      {formattedEl}
    </span>
    )
  }

// election should be dropdown with curr elec selected
const TopDetailsContainer = ({election, margin, winningParty, 
                              mrTurnout, winningCandidate, totalPop,
                              dbdo, pctRegistered}) => (
    <Grid>
      <Grid.Row centered divided className='top-details'>
        <Grid.Column width={3} className='top-label'>
          <strong>{humanReadable(election)} winner:</strong> {winningCandidate} ({winningParty.split('').slice(0,3).join('')}) -- {margin}%
        </Grid.Column>
        <Grid.Column width={3} className='top-label'>
          <strong>Last election turnout:</strong> {mrTurnout}
        </Grid.Column>
        <Grid.Column width={3} className='top-label'>
          <strong>Total population:</strong> {totalPop}
        </Grid.Column>
        <Grid.Column width={3} className='top-label'>
          <strong>{humanReadable(election)} dropoff:</strong> {dbdo}
        </Grid.Column>
        <Grid.Column width={3} className='top-label'>
          <strong>Registered:</strong> {pctRegistered}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  ) 

const mapStateToProps = (state) => (
  {election: state.selectedElection,
   margin: Math.abs(state.mapData.geoData.get(state.highlightedEdData.ed)) || '',
   winningParty: state.winningParty.get(state.highlightedEdData.ed) || '',
   winningCandidate: state.winningCandidate.get(state.highlightedEdData.ed) || '',
   mrTurnout: toPercent(state.highlightedEdData.turnout.turnout_17) || '',
   totalPop: state.highlightedEdData.edMetrics.total,
   dbdo: toPercent(1 - state.highlightedEdData.edMetrics[`dbdo_${state.selectedElection.toLowerCase()}`]) || '',
   pctRegistered: toPercent(state.highlightedEdData.edMetrics.registered_pct) || ''
  })

const TopDetails = connect(mapStateToProps)(TopDetailsContainer)

export default TopDetails;
