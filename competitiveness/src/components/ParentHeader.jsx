import { Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux'; 
import { withRouter } from 'react-router-dom';
const React = require('react');

const ParentHeaderContainer = withRouter(({districtType, changeDistrict, history}) => (
    <h1>New York City Competitiveness - <Dropdown options={
        [{text: 'State Assembly District', value: 'AD'},
         {text: 'State Senate District', value: 'SD'},
         {text: 'Congressional District', value: 'CD'},
         ]}
         defaultValue={districtType}
         onChange={(e, d) => changeDistrict(e, d, history)}
         className='district-select'
       />
    </h1>
))

const mapStateToProps = (state) => ({
  districtType: state.districtType })

const mapDispatchToProps = (dispatch) => ({
  changeDistrict: (e, d, h) => (
      h.push(`/${d.value}`))
  })

export default connect(mapStateToProps, mapDispatchToProps)(ParentHeaderContainer)

