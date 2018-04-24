import React from 'react';
import { Button } from 'semantic-ui-react';
// import { changeColorScale } from '../../actions/index';
// import { connect } from 'react-redux';

const GreyscaleToggle = ({changeColorScale}) => {
  return (
  <div>
    <Button compact attached='right' value='grey' onClick={(e, d) => changeColorScale(d.value)}>Greyscale</Button>
    <Button compact attached='left' value='rgb' onClick={(e, d) => changeColorScale(d.value)}>Color</Button>
  </div>
  )}

export default GreyscaleToggle;
