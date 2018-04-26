import { Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux'; 
import { withRouter } from 'react-router-dom';
const React = require('react');

const DistrictTypeSelectContainer = withRouter(({districtType, changeDistrict, history}) => (
  <Dropdown options={
    [{text: 'State Assembly District', value: 'AD'},
     {text: 'State Senate District', value: 'SD'},
     {text: 'Congressional District', value: 'CD'},
     ]}
     defaultValue={districtType}
     onChange={(e, d) => changeDistrict(e, d, history)}
     className='district-select'
      />
))

const mapStateToDistrictProps = (state) => ({
  districtType: state.districtType })

const mapDispatchToDistrictProps = (dispatch) => ({
  changeDistrict: (e, d, h) => (
      h.push(`/${d.value}`))
  })

const ElectionTypeSelectContainer = withRouter(({election, changeElection, history}) => (
  <Dropdown options={
    [{text: 'Overall', value: ''},
     {text: 'President/Vice President', value: 'President_VP'},
     {text: 'US Representative', value: 'CD'},
     {text: 'US Senator', value: 'US_Senator'},
     {text: 'State Senator', value: 'SD'},
     {text: 'State Assembly Member', value: 'AD'},
     ]}
     onChange={(e, d) => changeElection(e, d, history)}
     defaultValue={election}
      />
))
//{text: 'City Council Member', value: 'CD'} hmm?

const mapStateToElectionProps = (state) => ({
    election: state.selectedElection
})

const mapDispatchToElectionProps = (dispatch) => (
  {changeElection: (e,d,h) => (h.push(`?election=${d.value}`))
  })

export const DistrictTypeSelect = connect(mapStateToDistrictProps, mapDispatchToDistrictProps)(DistrictTypeSelectContainer)
export const ElectionTypeSelect = connect(mapStateToElectionProps, mapDispatchToElectionProps)(ElectionTypeSelectContainer)

