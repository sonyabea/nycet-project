import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'

// election should be dropdown with curr elec selected
const TopDetailsContainer = ({ed, election, margin, winningParty, winsForParty}) => (
  <Grid.Row>
    <Grid.Column width={3}>
      Election: {election}
    </Grid.Column>
    <Grid.Column width={3}>
      ED: {ed}
    </Grid.Column>
    <Grid.Column width={3}>
      Margin: {margin}
    </Grid.Column>
    <Grid.Column width={3}>
      Winning Party: {winningParty}
    </Grid.Column>
    <Grid.Column width={3}>
      All wins for party: {winsForParty}
    </Grid.Column>
  </Grid.Row>
  ) 

const mapStateToProps = (state) => (
  {election: state.selectedElection,
   ed: state.highlightedEdData.ed,
   margin: state.mapData.geoData.get(state.highlightedEdData.ed),
   winningParty: state.highlightedEdData.winningParty,
   winsForParty: state.highlightedEdData.winsForParty 
  }
)

const TopDetails = connect(mapStateToProps)(TopDetailsContainer)

export default TopDetails;
