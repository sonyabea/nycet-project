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

const mapStateToProps = (state) => ({
  districtType: state.districtType })

const mapDispatchToProps = (dispatch) => ({
  changeDistrict: (e, d, h) => (
      h.push(`/${d.value}`))
  })

export const DistrictTypeSelect = connect(mapStateToProps, mapDispatchToProps)(DistrictTypeSelectContainer)

