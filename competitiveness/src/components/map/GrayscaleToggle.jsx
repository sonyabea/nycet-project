import React from 'react';
import { Radio } from 'semantic-ui-react';

const GrayscaleToggle = ({changeColorScale}) => (
  <div>
    <Radio toggle
      label='Party Agnostic Map View'
      onChange={(e,d) => changeColorScale(d.checked)}
      defaultChecked={true}
    />
  </div>
)

export default GrayscaleToggle;
