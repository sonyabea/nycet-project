import { Table, Card } from 'semantic-ui-react';
import { connect } from 'react-redux'; 
import { activateGlow } from '../actions/index';

const React = require('react');

const TopTenContainer = ({geoData, drillDown, districtType, winningParty,
                          winningCandidate, activateGlow}) => {

  let sortedDists = geoData.entries().sort((a, b) => (
    Math.abs(a.value) - Math.abs(b.value)))
  
  let topTen = sortedDists.slice(0,10)
  topTen.forEach((dist) => {
    dist.party = winningParty.get(dist.key)
    dist.candidate = winningCandidate.get(dist.key)

  })

  let distRows = topTen.map((dist, i) => (

      <Table.Row key={`top-ten-${i}`} onMouseEnter={() => activateGlow(parseInt(dist.key, 10))}>
        <Table.Cell>{dist.key}</Table.Cell>
        <Table.Cell>{`${Math.abs(dist.value)}%`}</Table.Cell>
        <Table.Cell>{dist.party}</Table.Cell>
        <Table.Cell>{dist.candidate}</Table.Cell>
      </Table.Row>

    ))
    
  return (
   <Card className='table-card' style={{ marginLeft: 15,
                                         width: "90%" }}>
    <Table selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>{districtType}</Table.HeaderCell>
          <Table.HeaderCell>Margin</Table.HeaderCell>
          <Table.HeaderCell>Winning Party</Table.HeaderCell>
          <Table.HeaderCell>Winning Candidate</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {distRows}
      </Table.Body>
    </Table>
  </Card>
  )
}

const mapStateToProps = (state, ownProps) => (
  {...ownProps,
   districtType: state.districtType,
   winningParty: state.winningParty,
   winningCandidate: state.winningCandidate}
)

const mapDispatchToProps = (dispatch, ownProps) => (
  {activateGlow: (distNumber) => dispatch(activateGlow(distNumber))}
)

export default connect(mapStateToProps, mapDispatchToProps)(TopTenContainer)
