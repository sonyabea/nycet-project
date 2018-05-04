import React from 'react';
import DemoTab from './DemoTab';
import TurnoutTab from './TurnoutTab';
import { Tab } from 'semantic-ui-react';
import { connect } from 'react-redux';

const DemoDetailsContainer = ({selected, tabs, height, width, type}) => {
  if (!selected) {
    return ('');
  }
  else {
    let formattedPanes; 
    if (type === 'demo') {
      formattedPanes = tabs.map((t, i) => (
        { menuItem: t.title,
          render: () => <DemoTab 
            key={`demotab-${i}`} 
            tab={t}
            plotHeight={ height }
            plotWidth={ width }
          /> }
       ))
    }
    else {
      let filteredTabs = tabs.filter((tab) => tab.title !== 'Overall')
      let overall = tabs.filter((tab) => tab.title === 'Overall')[0]
      formattedPanes = filteredTabs.map((t, i) => (
        { menuItem: t.title,
          render: () => <TurnoutTab 
            key={`demotab-${i}`} 
            tab={t}
            plotHeight={ height }
            plotWidth={ width }
            overall={ overall }
          /> }
      ))
    }
    return (
      <div>
        <Tab menu={{className: 'wrapped',
          attached: true}} 
             panes={formattedPanes} />
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {width: state.sidebarDimensions[0],
   height: state.sidebarDimensions[1]}
)

const DemoDetails = connect(mapStateToProps)(DemoDetailsContainer)

export default DemoDetails;
