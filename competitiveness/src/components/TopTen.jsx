import { Table, Header, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux'; 
import { withRouter, Link } from 'react-router-dom';
import { activateGlow } from '../actions/index';

const React = require('react');

const TopTenContainer = ({geoData, drillDown, districtType, winningParty,
                          winningCandidate, activateGlow, history}) => {

  let sortedDists = geoData.entries().sort((a, b) => (
    Math.abs(a.value) - Math.abs(b.value)))
  
  let topTen = sortedDists.slice(0,10)
  topTen.forEach((dist) => {
    dist.party = winningParty.get(dist.key)
    dist.candidate = winningCandidate.get(dist.key)

  })

  let distRows = topTen.map((dist, i) => (

      <Table.Row key={`top-ten-${i}`}
        onMouseEnter={() => activateGlow(parseInt(dist.key, 10))}
        onClick={() => history.push(`${districtType}/${dist.key}`)} 
        className='top-ten-row'
      >
        <Table.Cell>{dist.key}</Table.Cell>
        <Table.Cell>{`${Math.abs(dist.value)}%`}</Table.Cell>
        <Table.Cell>{dist.party}</Table.Cell>
        <Table.Cell>{dist.candidate}</Table.Cell>
      </Table.Row>

    ))
    
  return (
    <div>
      <Header as='h4'>Top 10 Competitive {districtType}</Header>
      <div>
        <Table selectable basic='very' compact className='top-ten-table'>
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
      </div>

      <Divider section />

      <Header as='h5'>Methodology</Header>
      <div>
        The NYCET competitiveness index is calculated by the closeness of the most recent election
        for a district. <Link to={{pathname: '/about'}}>(More...)</Link>
      </div>
    </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopTenContainer))
