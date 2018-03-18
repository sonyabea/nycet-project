import React, { Component } from 'react';
import MapContainer from './components/MapContainer.jsx';
import { Container, Grid, Header, Card } from 'semantic-ui-react' 
import './App.css';

const d3 = require('d3');
const assemblyLoc = 'https://raw.githubusercontent.com/cngonzalez/nycet-flatfiles/master/locational/nyad_geo.json'
const dataLoc = 'https://raw.githubusercontent.com/cngonzalez/nycet-flatfiles/master/ad_margins.tsv'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {'mapGeo': {'features': []},
             'mapData': [],
             'closenessExtent': [0, 0],
             'regionType': '',
             'regionId': ''}
  }

  componentWillMount() {
    d3.queue()
      .defer(d3.json, assemblyLoc) 
      .defer(d3.tsv, dataLoc) 
      .await((error, assemblyFile, closeFile) => {
        closeFile.forEach((d) => {
          d.margin = ((d.winning_party === 'Republican') ? -d.margin : +d.margin)})
        const closeness = d3.map()
        closeFile.forEach((d) => {closeness.set(
          d.districtnumber, d.margin)})
        this.setState({mapData: closeness,
                       closenessExtent:  d3.extent(closeness.values()),
                       mapGeo: assemblyFile})
    })
  }
  
  
  render() {
    // console.log(this.state)
    return (
      <div className="App">
        <Container>
          <div className='page-header'>
            <Header>
              <h1>New York City Competetiveness - Assembly District Overview</h1>
            </Header>
          </div>
          <Grid>
            <Grid.Column width={10}>
              <MapContainer closenessExtent={this.state.closenessExtent} 
                            mapGeo={this.state.mapGeo}
                            mapData={this.state.mapData} />
            </Grid.Column>
            <Grid.Column width={5}>
              <Card />
            </Grid.Column>
        </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
