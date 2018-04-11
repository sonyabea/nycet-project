import { Table } from 'semantic-ui-react';
import { connect } from 'react-redux'; 
import { loadMapData } from '../actions/index';
const React = require('react');

const TopTenContainer = ({geoData, depthLevel, drillDown}) => {
  let filteredDists = geoData.entries().filter((a) => (a.value !== 0));
  let sortedDists = filteredDists.sort((a, b) => (
    Math.abs(a.value) - Math.abs(b.value)))
  
  let topTen = sortedDists.slice(0,10)
  topTen.forEach((dist) => (dist.party = (dist.value > 0) ? 'Democrat' : 'Republican'))
  let distRows = topTen.map((dist, i) => (
    // <Table.Row key={`top-ten-${i}`} onMouseEnter={(e) => (props.onTableHover(e, dist.key))}>
    <Table.Row key={`top-ten-${i}`}  onClick={() => (drillDown(depthLevel, parseInt(dist.key, 10)))} >
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

const mapStateToProps = (state) => (
  {geoData: state.mapComponents.geoData,
   depthLevel: state.depthLevel}
)

const mapDispatchToProps = (dispatch, ownProps) => (
  {drillDown: (depthLevel, selected) => (
      dispatch(loadMapData((depthLevel + 1), selected)))}
)

const TopTen = connect(mapStateToProps, mapDispatchToProps)(TopTenContainer)


export default TopTen;
