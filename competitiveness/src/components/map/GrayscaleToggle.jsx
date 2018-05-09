import React from 'react';
import { Radio, Grid } from 'semantic-ui-react';

const GrayscaleToggle = ({changeColorScale}) => (
  <Grid columns={2}>
    <Grid.Column verticalAlign='middle' textAlign='right'>
      <Radio toggle
        onChange={(e,d) => changeColorScale(d.checked)}
        defaultChecked={true}
        id='party-view'
      />
    </Grid.Column>
    <Grid.Column verticalAlign='middle' textAlign='left'>
      <label htmlFor='party-view'>
        Party Agnostic Map View
      </label>
    </Grid.Column>
  </Grid>
)

export default GrayscaleToggle;
