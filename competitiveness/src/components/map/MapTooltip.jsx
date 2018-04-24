import React from 'react';
import { connect } from 'react-redux';

const MapTooltipContainer = ({showTooltip, tooltipX, tooltipY, district, margin, party}) => {
  let divStyle = {
    'opacity': (showTooltip) ? 1 : 0,
    'visibilty': (showTooltip) ? 'visible' : 'hidden',
    'top': tooltipY,
    'left': tooltipX,
    'position': 'fixed',
    'z-index': '1000'}

  return (<div style={divStyle} className='tooltip'>
    District: {`${district}`}<br/>
    Margin: {`${margin}`}<br/>
    Winning party: {`${party}`}
    </div>)
}

const mapStateToProps = (state) => {
  return {showTooltip: state.tooltip.showTooltip,
           tooltipX: state.tooltip.tooltipX,
           tooltipY: state.tooltip.tooltipY,
           district: state.tooltip.districtNumber,
           margin: state.mapData.geoData.get(state.tooltip.districtNumber),
           party: state.winningParty.get(state.tooltip.districtNumber)}
}

const MapTooltip = connect(mapStateToProps)(MapTooltipContainer)
    
export default MapTooltip;
