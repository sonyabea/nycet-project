import React from 'react'
import { Dropdown, Header } from 'semantic-ui-react'

const OfficeDropdown = ({name, selected, onChange}) => {
  const offices = ['AD', 'CD', 'CityCouncil_Member', 'President_VP', 'SD', 'US_Senator']
  let options = offices.map(office => ({text: office.replace('_', ' '), value: office}) )

  return (
    <div style={{'float': 'left'}}>
      <Header as='h4'>
        <Header.Content>
          <span>Select an office:</span>
          <Dropdown
            fluid search selection
            type={name}
            options={options}
            text={selected}
            onChange={onChange}
          />
        </Header.Content>
      </Header>
    </div>

  )
}


export default OfficeDropdown
