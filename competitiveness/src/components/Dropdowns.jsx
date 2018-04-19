import { Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux'; 
import { loadMapData } from '../actions/index';
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
  districtType: state.districtType})

const RaceTypeSelectContainer = ({raceType}) => (
  <Dropdown options={
    [{text: 'Overall', value: ''},
     {text: 'President/Vice President', value: 'President_VP'},
     {text: 'US Representative', value: 'CD'},
     {text: 'US Senator', value: 'US_Senator'},
     {text: 'State Senator', value: 'SD'},
     {text: 'State Assembly Member', value: 'AD'},
     ]}
     defaultValue={raceType}
      />
)
//{text: 'City Council Member', value: 'CD'} hmm?

const mapStateToRaceProps = (state) => ({
  raceType: state.RaceType })

export const DistrictTypeSelect = connect(mapStateToDistrictProps, {changeDistrict: loadMapData})(DistrictTypeSelectContainer)
export const RaceTypeSelect = connect(mapStateToRaceProps)(RaceTypeSelectContainer)

