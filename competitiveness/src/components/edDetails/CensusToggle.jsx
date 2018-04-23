import React from 'react';
import { Button } from 'semantic-ui-react';
import { changeDemoType } from '../../actions/index';
import { connect } from 'react-redux'; 

const CensusToggleContainer = ({changeDemoType}) => (
  <div>
    <Button compact attached='left' value='acs' onClick={(e, d) => changeDemoType(d.value)}>ACS</Button>
    <Button compact attached='right' value='census' onClick={(e, d) => changeDemoType(d.value)}>Census</Button>
  </div>
  )

const CensusToggle = connect(null, {changeDemoType: changeDemoType})(CensusToggleContainer)

export default CensusToggle;


