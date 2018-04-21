import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const DemoSelections = ({options, onChange, value}) => 
  <div>
    <div style={{fontSize: '14px'}}>
      <b>Demographic Combinations</b>
      <div> * choose up to six </div>
    </div>
    <div style={{fontSize: '12px'}}>
      <Dropdown
        fluid multiple selection
        options={options} onChange={onChange} value={value}
      />
    </div>
  </div>

export default DemoSelections
