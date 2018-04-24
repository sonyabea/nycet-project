import React from 'react';
import DemoTab from './DemoTab';
import { Tab } from 'semantic-ui-react';
import { connect } from 'react-redux';

// eventually, inherit height, width
// from parent sidebar comp
const DemoDetailsContainer = ({tabs, height, width}) => {

    let formattedPanes = tabs.map((t, i) => (
      { menuItem: t.title,
        render: () => <DemoTab 
          key={`demotab-${i}`} 
          tab={t}
          plotHeight={ height }
          plotWidth={ width }
        /> }
  ))

    return (
      <div>
        <Tab panes={formattedPanes} />
      </div>
    )
}

const mapStateToProps = (state) => (
  {width: state.sidebarDimensions[0],
   height: state.sidebarDimensions[1]}
)

const DemoDetails = connect(mapStateToProps)(DemoDetailsContainer)

export default DemoDetails;
