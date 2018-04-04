const React = require('react');

const MapTooltip = (props) => {
  let divStyle = {
    'opacity': (props.showTooltip) ? 1 : 0,
    'visibilty': (props.showTooltip) ? 'visible' : 'hidden',
    'top': props.tooltipY,
    'left': props.tooltipX,
    'position': 'fixed'}

  let info = (props.text.map((t, i) => (<p key={`ttip-info-${i}`}>{t}</p>)))

  return (<div style={divStyle}>{info}</div>)
}
    
export default MapTooltip;
