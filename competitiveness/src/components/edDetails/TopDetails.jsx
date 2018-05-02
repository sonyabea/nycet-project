import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'

const toPercent = (val) => (
  (`${((val > 1) ? 100 : val * 100).toFixed(2)}%`)) 

// election should be dropdown with curr elec selected
const TopDetailsContainer = ({election, margin, winningParty, 
                              mrTurnout, winningCandidate, totalPop,
                              dbdo, pctRegistered}) => (
    <Grid.Row className='top-details'>
      <Grid.Column width={3}>
        Last {election} election results: {winningCandidate} ({winningParty}) - {margin}% margin
      </Grid.Column>
      <Grid.Column width={3}>
        Last election turnout: {mrTurnout}
      </Grid.Column>
      <Grid.Column width={3}>
        Total population: {totalPop}
      </Grid.Column>
      <Grid.Column width={3}>
        Down-ballot dropoff for {election} election: {dbdo}
      </Grid.Column>
      <Grid.Column width={3}>
        Registered: {pctRegistered}
      </Grid.Column>
    </Grid.Row>
  ) 

const mapStateToProps = (state) => (
  {election: state.selectedElection,
   margin: Math.abs(state.mapData.geoData.get(state.highlightedEdData.ed)),
   winningParty: state.winningParty.get(state.highlightedEdData.ed),
   winningCandidate: state.winningCandidate.get(state.highlightedEdData.ed),
   mrTurnout: toPercent(state.highlightedEdData.turnout.turnout_17),
   totalPop: state.highlightedEdData.edMetrics.total,
   dbdo: toPercent(state.highlightedEdData.edMetrics[`dbdo_${state.selectedElection}`]),
   pctRegistered: toPercent(state.highlightedEdData.edMetrics.registered_pct)
  })

const TopDetails = connect(mapStateToProps)(TopDetailsContainer)

export default TopDetails;
