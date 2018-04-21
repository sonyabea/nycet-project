import React from 'react';
import { connect } from 'react-redux';
import MapContainer from './map/MapContainer.jsx';
import DataMap from './map/Map.jsx';
//import MapTooltip from './components/MapTooltip.jsx';
import TopTen from './TopTen.jsx';
import CompHeader from './CompHeader.jsx'
import EDHeader from './EDHeader.jsx';
import CensusDetails from './CensusDetails.jsx';
import { Grid, Container } from 'semantic-ui-react';

//params passed down from URL
const Competitiveness = ({mapComponents, districtType}) => (
    <Container>
      <CompHeader />  
      <Grid>
        { districtType === 'ED' ? <EDHeader /> : '' } 
        <Grid.Column width={10} style={{ minHeight: 600, width: "100%" }}>
          <MapContainer>
            <DataMap mapComponents={mapComponents}/>
          </MapContainer>
        </Grid.Column>
        <Grid.Column width={5}>
          { districtType === 'ED' ? <CensusDetails /> : <TopTen geoData={mapComponents.geoData} /> } 
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
