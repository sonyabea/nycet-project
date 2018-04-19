import { Header } from 'semantic-ui-react';
import { DistrictTypeSelect } from './Dropdowns.jsx'
import { connect } from 'react-redux';
import React from 'react';

const CompHeaderContainer = ({parentDistrictType, selected}) => {
  let titleElement = (selected === 0) ? <DistrictTypeSelect /> : `${parentDistrictType} ${selected}`

  //TODO: Make "parentDistType" element on zoomed focus a link, to go back to top level
  return (
    <div className='page-header'>
      <Header style={{paddingTop: 35, paddingBottom: 35}}>
        <h1>New York City Competitiveness - {titleElement} Overview</h1>
      </Header>
    </div>
    )
}

const mapStateToProps = (state) => (
  {parentDistrictType: state.parentDistrictType,
   selected: state.selectedDistrict}
)

const CompHeader = connect(mapStateToProps)(CompHeaderContainer)

export default CompHeader;

