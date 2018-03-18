import React, { Component } from 'react';
import MapContainer from './components/MapContainer.jsx';
import { Container, Grid } from 'semantic-ui-react' 
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
    //eventually, move this to a higher level component
    //map and closeness should be props
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
        <Grid>
          <Grid.Column width='8'>
            <MapContainer closenessExtent={this.state.closenessExtent} 
                          mapGeo={this.state.mapGeo}
                          mapData={this.state.mapData} />
          </Grid.Column>
          <Grid.Column width='4'/>
        </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
