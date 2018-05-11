import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
      <Header dividing style={{paddingBottom: 15}} >
        { districtType === 'ED' ? <ChildHeader /> : <ParentHeader /> }
      </Header>
      { districtType === 'ED' ? <TopDetails /> : '' }
      <Grid style={{paddingTop: 25}} divided >
        <Grid.Column width={10} style={{ minHeight: 600, width: "100%", padding: 0 }}>
          <MapContainer>
            { districtType === 'ED' ? <OfficeDropdownContainer /> : '' }
            <DataMap mapComponents={mapComponents}/>
          </MapContainer>
        </Grid.Column>
        <Grid.Column width={5} className='info-container'>
              { districtType === 'ED' ? <DemoSidebar /> : <TopTen geoData={mapComponents.geoData} /> }
        </Grid.Column>
      </Grid>
        <footer className="footer">
          Made by the <Link to="/about">CKM Pro Bono Committee</Link>
        </footer>
    </Container>
  )

export default connect(
  state => ({
    mapComponents: state.mapData,
    districtType: state.districtType
  })
)(Competitiveness)
