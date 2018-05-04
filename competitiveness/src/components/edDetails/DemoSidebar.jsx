import React from 'react';
import DemoDetails from './DemoDetails';
import CensusToggle from './CensusToggle';
import ResizeContainer from '../Container';
import { setSidebarDimensions } from '../../actions/index';
import { connect } from 'react-redux';

import TAB_MAPPING from '../../data/tabMapping';

const tabsFromData = (data, type) => {
  if (typeof(data) === 'undefined') {
    return []
  }
  let dataset = data[type]
  let mapping = TAB_MAPPING[type]
  let tabs = []
  mapping.forEach((tab) => {
    tab.data = tab.cols.map((col) => (
      (typeof(dataset[col]) === 'undefined') ? null : dataset[col]))
    tabs.push(tab)
  })
  return tabs
}

const DemoSidebarContainer = ({acsTabs, censusTabs, turnoutTabs, demoType}) => {
  // console.log(acsTabs)
  // console.log(demoType) 
  return (<div>
    <CensusToggle /> 
    <div>
      <ResizeContainer resizeFunction={setSidebarDimensions}>
        <DemoDetails tabs={ acsTabs } type='demo' selected={(demoType === 'acs')}/> 
        <DemoDetails tabs={ censusTabs } type='demo' selected={(demoType === 'census')} />
      </ResizeContainer>
    </div>
    <div style={{height: 20}}></div>
    <div>
      <ResizeContainer resizeFunction={setSidebarDimensions}>
        <DemoDetails tabs={turnoutTabs} type='turnout' selected={true}/>
      </ResizeContainer>
    </div>
  </div>
  )
}

const mapStateToProps = (state) => (
  {acsTabs: tabsFromData(state.highlightedEdData, 'acs'),
   censusTabs: tabsFromData(state.highlightedEdData, 'census'),
   turnoutTabs: tabsFromData(state.highlightedEdData, 'turnout'),
   demoType: state.highlightedEdData.demoType}
)

const DemoSidebar = connect(mapStateToProps)(DemoSidebarContainer)

export default DemoSidebar;
