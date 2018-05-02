import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';

const ChildHeaderContainer =({parentDistrictType, selected,
                               highlightedEd}) => (
    <h1>
      <Link to={{pathname: '/'}}>New York City Competitiveness</Link> - {parentDistrictType} {selected} - ED {highlightedEd}
    </h1>
)

const mapStateToProps = (state) => (
  {parentDistrictType: state.parentDistrictType,
   selected: state.selectedDistrict,
   highlightedEd: state.highlightedEdData.ed}
)

export default connect(mapStateToProps)(ChildHeaderContainer)
