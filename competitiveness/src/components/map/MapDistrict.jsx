import React from 'react';
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom';

const MapDistrictContainer = ({d, projection, fill, routerLink, onClick}) => (
  <Link to={{pathname: routerLink}}>
    <path
      data={d}
      d={projection}
      fill={fill}
      className='district'
      onClick={onClick}
    />
  </Link>

)

const determineLink = (state, districtNumber) => {
  if (state.districtType === 'ED') {
    return `/${state.parentDistrictType}/${state.selectedDistrict}/ED/${districtNumber}`
  } else {
    return `/${state.parentDistrictType}/${districtNumber}`
  }
}
    
const mapStateToProps = (state, ownProps) => (
  {...ownProps,
   routerLink: determineLink(state, ownProps.d.properties.districtNumber)})

const MapDistrict = connect(mapStateToProps)(MapDistrictContainer)

export default MapDistrict
