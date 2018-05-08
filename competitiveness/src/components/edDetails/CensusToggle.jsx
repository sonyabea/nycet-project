import React from 'react';
import { Button } from 'semantic-ui-react';
import { changeDemoType } from '../../actions/index';
import { connect } from 'react-redux'; 

const CensusToggleContainer = ({demoType, changeDemoType}) => (
  <div style={{paddingBottom: 10}}>
    <Button.Group compact fluid>
      <Button compact 
        value='acs' 
        onClick={(e, d) => changeDemoType(d.value)}
        active={demoType === 'acs'}>
          ACS
      </Button>
      <Button compact
        value='census' 
        onClick={(e, d) => changeDemoType(d.value)}
        active={demoType === 'census'}>
          Census
        </Button>
    </Button.Group>
  </div>
)

const mapStateToProps = (state) => (
  {demoType: state.highlightedEdData.demoType})

const CensusToggle = connect(mapStateToProps, {changeDemoType: changeDemoType})(CensusToggleContainer)

export default CensusToggle;


