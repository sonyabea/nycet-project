import { Table, Card } from 'semantic-ui-react';
import { connect } from 'react-redux'; 
import { activateGlow } from '../actions/index';

// import { loadData } from '../actions/index';
const React = require('react');

const TopTenContainer = ({geoData, drillDown, districtType, winningParty,
                          activateGlow}) => {
  //let filteredDists = geoData.entries().filter((a) => (a.value !== 0));
  let sortedDists = geoData.entries().sort((a, b) => (
    Math.abs(a.value) - Math.abs(b.value)))
  
  //don't do this on ed level view?
  let topTen = sortedDists.slice(0,10)
  topTen.forEach((dist) => (dist.party = winningParty.get(dist.key)))
  let distRows = topTen.map((dist, i) => (
    //restore style later by removing Link and applying a real href to the table row
    //using browserHistory and push
      <Table.Row key={`top-ten-${i}`} onMouseEnter={() => activateGlow(parseInt(dist.key, 10))}>
        <Table.Cell>{dist.key}</Table.Cell>
        <Table.Cell>{`${Math.abs(dist.value)}%`}</Table.Cell>
        <Table.Cell>{dist.party}</Table.Cell>
      </Table.Row>
    ))
    
  return (
   <Card className='table-card' style={{ width: "100%", marginLeft: 15 }}>
    <Table selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>{districtType}</Table.HeaderCell>
          <Table.HeaderCell>Margin</Table.HeaderCell>
          <Table.HeaderCell>Winning Party</Table.HeaderCell>
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
   winningParty: state.winningParty}
)

const mapDispatchToProps = (dispatch, ownProps) => (
  {activateGlow: (distNumber) => dispatch(activateGlow(distNumber))}
)

// const mapDispatchToProps = (dispatch, ownProps) => (
//   {drillDown: (selected, districtType) => (
//       dispatch(loadData({parentDistId: selected, parentDistType: districtType})))}
// )

export default connect(mapStateToProps, mapDispatchToProps)(TopTenContainer)
