import React from 'react';
import { connect } from 'react-redux';
import MapContainer from './map/MapContainer';
import DataMap from './map/Map.jsx';
import { OfficeDropdownContainer } from './map/DropdownContainer.jsx'
import MapTooltip from './map/MapTooltip.jsx';
import TopTen from './TopTen.jsx';
import TopDetails from './edDetails/TopDetails.jsx';
import ParentHeader from './ParentHeader.jsx';
import ChildHeader from './ChildHeader.jsx';
import DemoSidebar from './edDetails/DemoSidebar.jsx';
import { Grid, Container, Header } from 'semantic-ui-react';

//params passed down from URL
const Competitiveness = ({mapComponents, districtType}) => (
    <Container fluid={true}>
      <MapTooltip />
      <div className='page-header'>
        <Header style={{paddingTop: 35, paddingBottom: 35}}>
          { districtType === 'ED' ? <ChildHeader /> : <ParentHeader /> }
        </Header>
      </div>
      <Grid>
        { districtType === 'ED' ? <TopDetails /> : '' }
        <Grid.Column width={10} style={{ minHeight: 600, width: "100%" }}>
          <MapContainer>
            { districtType === 'ED' ? <OfficeDropdownContainer /> : '' }
            <DataMap mapComponents={mapComponents}/>
          </MapContainer>
        </Grid.Column>
        <Grid.Column width={5}>
          { districtType === 'ED' ? <DemoSidebar /> : <TopTen geoData={mapComponents.geoData} /> }
        </Grid.Column>
      </Grid>
    </Container>
  )

export default connect(
  state => ({
    mapComponents: state.mapData,
    districtType: state.districtType
  })
)(Competitiveness)
