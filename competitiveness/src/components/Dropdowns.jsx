import { Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux'; 
import { loadData } from '../actions/index';
const React = require('react');

const DistrictTypeSelectContainer = ({districtType, changeDistrict}) => (
  <Dropdown options={
    [{text: 'State Assembly District', value: 'AD'},
     {text: 'State Senate District', value: 'SD'},
     {text: 'Congressional District', value: 'CD'},
     ]}
     defaultValue={districtType}
     onChange={(e, d) => changeDistrict({parentDistType: d.value, parentDistId: 0})}
     className='district-select'
      />
)

const mapStateToDistrictProps = (state) => ({
  districtType: state.districtType })

const ElectionTypeSelectContainer = ({election}) => (
  <Dropdown options={
    [{text: 'Overall', value: ''},
     {text: 'President/Vice President', value: 'President_VP'},
     {text: 'US Representative', value: 'CD'},
     {text: 'US Senator', value: 'US_Senator'},
     {text: 'State Senator', value: 'SD'},
     {text: 'State Assembly Member', value: 'AD'},
     ]}
     defaultValue={election}
      />
)
//{text: 'City Council Member', value: 'CD'} hmm?

const mapStateToElectionProps = (state) => ({
  election: state.selectedElection
   })

export const DistrictTypeSelect = connect(mapStateToDistrictProps, {changeDistrict: loadData})(DistrictTypeSelectContainer)
export const ElectionTypeSelect = connect(mapStateToElectionProps)(ElectionTypeSelectContainer)

