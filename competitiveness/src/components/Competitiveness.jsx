import React from 'react';
import MapContainer from './MapContainer.jsx';
import DataMap from './Map.jsx';
//import MapTooltip from './components/MapTooltip.jsx';
import TopTen from './TopTen.jsx';
import CompHeader from './CompHeader.jsx'
import { Grid, Container } from 'semantic-ui-react';

//params passed down from URL
const Competitiveness= ({mapComponents}) => (
    <Container>
      < CompHeader />  
      <Grid>
        <Grid.Column width={10} style={{ minHeight: 600, width: "100%" }}>
          <MapContainer>
            <DataMap mapComponents={mapComponents}/>
          </MapContainer>
        </Grid.Column>
        <Grid.Column width={5}>
            <TopTen geoData={mapComponents.geoData} />
        </Grid.Column>
      </Grid>
    </Container>
  )

export default Competitiveness;
