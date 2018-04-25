import React from 'react';
import { connect } from 'react-redux'; 
import { showTooltip } from '../../actions/index'; 
import { Link } from 'react-router-dom';

const MapDistrictContainer = ({d, projection, fill, routerLink, isMoused, showTooltip}) => (
  <Link to={{pathname: routerLink}}>
    <path
      data={d}
      d={projection}
      fill={fill}
      className='district'
      filter={(isMoused) ? 'url(#glow)' : ''}
      onMouseEnter={(e) => showTooltip(e, d.properties.districtNumber)}
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
   routerLink: determineLink(state, ownProps.d.properties.districtNumber),
   isMoused: ownProps.d.properties.districtNumber === state.tooltip.districtNumber})

const MapDistrict = connect(mapStateToProps, { showTooltip: showTooltip })(MapDistrictContainer)

export default MapDistrict
