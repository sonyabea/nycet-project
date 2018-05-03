import React from 'react';
import DemoDetails from './DemoDetails';
import CensusToggle from './CensusToggle';
import ResizeContainer from '../Container';
import { setSidebarDimensions } from '../../actions/index';
import { connect } from 'react-redux';

import TAB_MAPPING from '../../data/tabMapping';

const tabsFromData = (dataset, type) => {
  if (typeof(dataset) === 'undefined') {
    return []
  }
  let mapping = TAB_MAPPING[type]
  let tabs = []
  mapping.forEach((tab) => {
    tab.data = tab.cols.map((col) => (
      (typeof(dataset[col]) === 'undefined') ? null : dataset[col]))
    tabs.push(tab)
  })
  return tabs
}

const DemoSidebarContainer = ({demoTabs, turnoutTabs}) => (
  <div>
    <CensusToggle /> 
    <div>
      <ResizeContainer resizeFunction={setSidebarDimensions}>
        <DemoDetails tabs={demoTabs} type='demo' />
      </ResizeContainer>
    </div>
    <div>
      <ResizeContainer resizeFunction={setSidebarDimensions}>
        <DemoDetails tabs={turnoutTabs} type='turnout' />
      </ResizeContainer>
    </div>
  </div>
)

const mapStateToProps = (state) => (
  {demoTabs: tabsFromData(state.highlightedEdData[state.highlightedEdData.demoType],state.highlightedEdData.demoType),
   turnoutTabs: tabsFromData(state.highlightedEdData.turnout, 'turnout')}
)

const DemoSidebar = connect(mapStateToProps)(DemoSidebarContainer)

export default DemoSidebar;
