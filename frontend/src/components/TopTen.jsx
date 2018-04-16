import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { loadMapData } from '../actions/index';
import { withRouter } from 'react-router-dom';
const React = require('react');

const TopTenContainer = ({history, geoData, drillDown}) => {
  let filteredDists = geoData.entries().filter((a) => (a.value !== 0));
  let sortedDists = filteredDists.sort((a, b) => (
    Math.abs(a.value) - Math.abs(b.value)))
  
  let topTen = sortedDists.slice(0,10)
  topTen.forEach((dist) => (dist.party = (dist.value > 0) ? 'Democrat' : 'Republican'))
  let distRows = topTen.map((dist, i) => (
    //restore style later by removing Link and applying a real href to the table row
    //using browserHistory and push
      <Table.Row key={`top-ten-${i}`}  onClick={() => {
        history.push(`/AD/${dist.key}`); drillDown(dist.key)}} >
        <Table.Cell>{dist.key}</Table.Cell>
        <Table.Cell>{`${Math.abs(dist.value)}%`}</Table.Cell>
        <Table.Cell>{dist.party}</Table.Cell>
      </Table.Row>
    ))
      
  return (
    <Table celled inverted selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>District</Table.HeaderCell>
          <Table.HeaderCell>Margin</Table.HeaderCell>
          <Table.HeaderCell>Winning Party</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {distRows}
      </Table.Body>
    </Table>
  )
}

const mapDispatchToProps = (dispatch, ownProps) => (
  {drillDown: (selected) => (
      dispatch(loadMapData({parentDistId: selected, parentDistType: 'ED'})))}
)

const TopTen = connect(null, mapDispatchToProps)(TopTenContainer)


export default withRouter(TopTen);
