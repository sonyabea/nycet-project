import { Table, Card } from 'semantic-ui-react';
import { connect } from 'react-redux'; 
import { loadData } from '../actions/index';
import { withRouter } from 'react-router-dom';
const React = require('react');

const TopTenContainer = ({history, geoData, drillDown, districtType}) => {
  //let filteredDists = geoData.entries().filter((a) => (a.value !== 0));
  let sortedDists = geoData.entries().sort((a, b) => (
    Math.abs(a.value) - Math.abs(b.value)))
  
  //don't do this on ed level view?
  let topTen = sortedDists.slice(0,10)
  topTen.forEach((dist) => (dist.party = (dist.value > 0) ? 'Democrat' : 'Republican'))
  let distRows = topTen.map((dist, i) => (
    //restore style later by removing Link and applying a real href to the table row
    //using browserHistory and push
      <Table.Row key={`top-ten-${i}`}  onClick={() => {
        history.push(`/${districtType}/${dist.key}`); drillDown(dist.key, districtType)}} >
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
  {...ownProps, districtType: state.districtType})

const mapDispatchToProps = (dispatch, ownProps) => (
  {drillDown: (selected, districtType) => (
      dispatch(loadData({parentDistId: selected, parentDistType: districtType})))}
)

const TopTen = connect(mapStateToProps, mapDispatchToProps)(TopTenContainer)


export default withRouter(TopTen);
