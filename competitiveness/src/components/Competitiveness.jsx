import React from 'react';
import MapContainer from './MapContainer.jsx';
import DataMap from './Map.jsx';
//import MapTooltip from './components/MapTooltip.jsx';
import TopTen from './TopTen.jsx';
import { DistrictTypeSelect } from './Dropdowns.jsx'
import { Grid, Header, Card, Container } from 'semantic-ui-react';

//params passed down from URL
const Competitiveness= ({mapComponents}) => {
  return (
    <Container>
      <div className='page-header'>
        <Header>
          <h1>New York City Competitiveness - Assembly District Overview</h1>
        </Header>
      </div>
      <Grid>
        <Grid.Column width={10} style={{ minHeight: 600 }}>
          <MapContainer>
            <DistrictTypeSelect />
            <DataMap mapComponents={mapComponents}/>
          </MapContainer>
        </Grid.Column>
        <Grid.Column width={5}>
          <Card>
            <TopTen geoData={mapComponents.geoData} />
          </Card>
        </Grid.Column>
      </Grid>
    </Container>
    )
  }

export default Competitiveness;
