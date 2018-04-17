import { Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux'; 
const React = require('react');

const DistrictTypeSelectContainer = ({districtType}) => (
  <Dropdown options={
    [{text: 'S. Assembly District', value: 'AD'},
     {text: 'S. Senate District', value: 'SD'},
     {text: 'Congressional District', value: 'CD'}]}
     defaultValue={districtType}
      />
)

const mapStateToDistrictProps = (state) => ({
  districtType: state.districtType})

export const DistrictTypeSelect = connect(mapStateToDistrictProps)(DistrictTypeSelectContainer)

