import React, { Component } from 'react';
import DemoTab from './DemoTab';
import { connect } from 'react-redux'; 
import { Tab } from 'semantic-ui-react'
import TAB_MAPPING from '../../data/tabMapping';

class DemoDetailsContainer extends Component{
          // eventually, derive from node in compdidmount
          // height={this.node.clientHeight}
          // width={this.node.clientWidth} 
  render() {
    let formattedPanes = this.props.tabs.map((t, i) => (
      { menuItem: t.title,
        render: () => <DemoTab 
          key={`demotab-${i}`} 
          tab={t}
          height={ 250 }
          width={ 300 }
        /> }
  ))

    return (
      <Tab panes={formattedPanes}
           ref={node => this.node = node }/>
    )
  }
}

const tabsFromData = (dataset) => {
  let mapping = TAB_MAPPING.acs
  let tabs = []
  mapping.forEach((tab) => {
    tab.data = tab.cols.map((col) => (dataset[col]))
    tabs.push(tab)
  })
  return tabs
}

//use ownProps to choose acs, census, or turnout eventually
//for now, hardcode acs for functionality coding
const mapStateToProps = (state, ownProps) => {
  return {tabs: tabsFromData(state.highlightedEdData.acs[0])}
}

const DemoDetails = connect(mapStateToProps)(DemoDetailsContainer)

export default DemoDetails;
