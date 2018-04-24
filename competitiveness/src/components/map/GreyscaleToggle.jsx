import React from 'react';

const GreyscaleToggle = ({changeColorScale}) => {
  return (
  <div>
    <Button compact attached='right' value='grey' onClick={(e, d) => changeColorScale(d.value)}>Greyscale</Button>
    <Button compact attached='left' value='rgb' onClick={(e, d) => changeColorScale(d.value)}>Color</Button>
  </div>
  )}

export default GreyscaleToggle;
