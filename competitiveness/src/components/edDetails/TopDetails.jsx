import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'

// election should be dropdown with curr elec selected
const TopDetailsContainer = ({ed, medMargin, margin, winningParty, mrTurnout}) => (
    <Grid.Row className='top-details'>
      <Grid.Column width={3}>
        Highlighted ED: {ed}
      </Grid.Column>
      <Grid.Column width={3}>
        Median margin for all races: {medMargin}
      </Grid.Column>
      <Grid.Column width={3}>
        Most recent margin for selected race: {margin}
      </Grid.Column>
      <Grid.Column width={3}>
        Winning Party: {winningParty}
      </Grid.Column>
      <Grid.Column width={3}>
        Most recent election turnout: {mrTurnout}
      </Grid.Column>
    </Grid.Row>
  ) 

const mapStateToProps = (state) => (
  {election: state.selectedElection,
   ed: state.highlightedEdData.ed,
   medMargin: state.highlightedEdData.edMetrics[0].median_pl_margin, 
   margin: Math.abs(state.mapData.geoData.get(state.highlightedEdData.ed)),
   winningParty: state.winningParty.get(state.highlightedEdData.ed),
   mrTurnout: `${(state.highlightedEdData.turnout[0].turnout_16 * 100).toFixed(2)}%`
  })

const TopDetails = connect(mapStateToProps)(TopDetailsContainer)

export default TopDetails;
