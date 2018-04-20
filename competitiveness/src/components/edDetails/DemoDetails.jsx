import React, { Component } from 'react';
import DemoTab from './DemoTab';
import { connect } from 'react-redux'; 
import { Tab } from 'semantic-ui-react'

const TAB_MAPPING = {
  acs: [{title: 'Race',
         cols: ['white_only_pct', 'black_only_pct', 'asian_only_pct', 
         'pacific_only_pct', 'native_american_only_pct', 'other_race_only_pct',
         'two_or_more_races_pct'],
         labels: ['White', 'Black', 'Asian', 'Pacific Islander',
                          'Native American', 'Other Race', 'Two or More Races']}]
}

class DemoDetailsContainer extends Component{
          // eventually, adapt from node 
          // height={this.node.clientHeight}
          // width={this.node.clientWidth} 
  render() {
    let formattedPanes = this.props.tabs.map((t, i) => (
      { menuItem: t.title,
        render: () => <DemoTab 
          key={`demotab-${i}`} 
          tab={t}
          height={ 500 }
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

//use ownProps to choose acs or census, eventually
//for now, hardcode acs for functionality coding
const mapStateToProps = (state, ownProps) => {
  return {tabs: tabsFromData(state.highlightedEdData.acs[0])}
}

const DemoDetails = connect(mapStateToProps)(DemoDetailsContainer)

export default DemoDetails;
