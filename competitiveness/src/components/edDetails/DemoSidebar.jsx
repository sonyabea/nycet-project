import React from 'react';
import DemoDetails from './DemoDetails';
import CensusToggle from './CensusToggle';
import { connect } from 'react-redux';
import TAB_MAPPING from '../../data/tabMapping';

const tabsFromData = (dataset, type) => {
  let mapping = TAB_MAPPING[type]
  let tabs = []
  mapping.forEach((tab) => {
    tab.data = tab.cols.map((col) => (dataset[col]))
    tabs.push(tab)
  })
  return tabs
}

const DemoSidebarContainer = ({demoTabs, turnoutTabs}) => (
  <div>
    <CensusToggle /> 
    <DemoDetails tabs={demoTabs} style={{width: '100%'}} />
    <DemoDetails tabs={turnoutTabs} style={{width: '100%'}} />
  </div>
)

const mapStateToProps = (state) => (
  {demoTabs: tabsFromData(state.highlightedEdData[state.highlightedEdData.demoType][0],state.highlightedEdData.demoType),
   turnoutTabs: tabsFromData(state.highlightedEdData.turnout[0], 'turnout')}
)

const DemoSidebar = connect(mapStateToProps)(DemoSidebarContainer)

export default DemoSidebar;
