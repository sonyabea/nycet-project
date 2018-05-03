import React from 'react'
import { Dropdown, Header } from 'semantic-ui-react'

const OfficeDropdown = ({name, selected, onChange}) => {
  const offices = ['AD', 'CD', 'CityCouncil_Member', 'Governor_LG', 
                   'President_VP', 'SD', 'US_Senator']
  let options = offices.map(office => ({text: office.replace('_', ' '), value: office}) )
  let textOffice = offices.filter((o) => o.toLowerCase() === selected.toLowerCase())[0]

  return (
    <div>
      <Header as='h4'>
        <Header.Content>
          <span>Select an office:</span>
          <Dropdown
            fluid search selection
            type={name}
            options={options}
            defaultValue={textOffice}
            onChange={onChange}
          />
        </Header.Content>
      </Header>
    </div>

  )
}


export default OfficeDropdown
