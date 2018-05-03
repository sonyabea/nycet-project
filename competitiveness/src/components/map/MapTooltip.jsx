import React from 'react';
import { connect } from 'react-redux';

const MapTooltipContainer = ({showTooltip, tooltipX, tooltipY,
                              district, margin, party, candidate}) => {
  let divStyle = {
    'opacity': (showTooltip) ? 1 : 0,
    'visibilty': (showTooltip) ? 'visible' : 'hidden',
    'top': tooltipY,
    'left': tooltipX,
    'position': 'fixed',
    'zIndex': '1000'}

  return (<div style={divStyle} className='tooltip'>
    District: {`${district}`}<br/>
    Margin: {`${margin}`}<br/>
    Winning party: {`${party}`}<br/>
    { (candidate) ? `Winning candidate: ${candidate}` : '' }
    </div>)
}

const mapStateToProps = (state) => {
  return {showTooltip: state.tooltip.showTooltip,
           tooltipX: state.tooltip.tooltipX,
           tooltipY: state.tooltip.tooltipY,
           district: state.tooltip.districtNumber,
           margin: Math.abs(state.mapData.geoData.get(state.tooltip.districtNumber)),
           party: state.winningParty.get(state.tooltip.districtNumber),
           candidate: (state.districtType !== 'ED') ? state.winningCandidate.get(state.tooltip.districtNumber) : null}
}

const MapTooltip = connect(mapStateToProps)(MapTooltipContainer)
    
export default MapTooltip;
