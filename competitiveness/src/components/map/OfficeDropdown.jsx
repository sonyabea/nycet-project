import React from 'react'
import { Grid, Dropdown } from 'semantic-ui-react'

const OfficeDropdown = ({name, selected, onChange}) => {
  const offices = ['AD', 'CD', 'CityCouncil_Member', 'Governor_LG', 
                   'President_VP', 'SD', 'US_Senator']
  let options = offices.map(office => ({text: office.replace('_', ' '), value: office}) )
  let textOffice = offices.filter((o) => o.toLowerCase() === selected.toLowerCase())[0]

  return (
    <Grid columns={2}>
      <Grid.Column verticalAlign='middle' textAlign='right'>
        <label htmlFor='office-select'>
          Office
        </label>
      </Grid.Column>
      <Grid.Column style={{paddingRight: "10%"}}>
        <Dropdown
          fluid search selection basic
          type={name}
          options={options}
          defaultValue={textOffice}
          onChange={onChange}
          id='office-select'
        />
      </Grid.Column>
    </Grid>

  )
}


export default OfficeDropdown
