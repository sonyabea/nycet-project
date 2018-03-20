import React, { Component } from 'react';
import MapContainer from './components/MapContainer.jsx';
import MainMap from './components/map.jsx';
import MapTooltip from './components/MapTooltip.jsx';
import TopTen from './components/TopTen.jsx';
import { Container, Grid, Header, Card } from 'semantic-ui-react';
import './App.css';

const d3 = require('d3');
const assemblyLoc = 'https://raw.githubusercontent.com/cngonzalez/nycet-flatfiles/master/locational/nyad_geo.json'
const dataLoc = 'https://raw.githubusercontent.com/cngonzalez/nycet-flatfiles/master/ad_margins.tsv'

class App extends Component {
  constructor(props){
    super(props)
    //this is getting a little unwieldy
    this.state = {
             'mapGeo': {'features': []},
             'mapData': d3.map(),
             'mapRegionType': 'AssemDist',
             'marginType': 'margin',
             'regionId': '',
             'selectedId': '',
             'tooltip': {
               'showTooltip': false,
               'tooltipX': 0,
               'tooltipY': 0,
               'text': []}
             }
    this.onRegionHover = this.onRegionHover.bind(this)
    this.clearTooltip = this.clearTooltip.bind(this)
    this.onTableHover = this.onTableHover.bind(this)
  }

  onRegionHover(e, d) {
    let dist = d.properties[this.state.mapRegionType];
    let newTooltip = {showTooltip: true,
                   tooltipX: e.clientX,
                   tooltipY: e.clientY,
                   text: [`District: ${dist}`,
                         `Margin: ${Math.abs(this.state.mapData.get(dist))}`]}
 
    this.setState({tooltip: newTooltip,
                   selectedId: dist}) 
  } 

  onTableHover(e, d) {
    this.setState({selectedId: parseInt(d, 10)})
  }

  clearTooltip() {
    this.setState({tooltip: {
               'showTooltip': false,
               'tooltipX': 0,
               'tooltipY': 0,
               'text': []}})
  }

  componentWillMount() {
    //convert data part of this to sql eventually
    d3.queue()
      .defer(d3.json, assemblyLoc) 
      .defer(d3.tsv, dataLoc) 
      .await((error, assemblyFile, closeFile) => {
        closeFile.forEach((d) => {
          d.margin = ((d.winning_party === 'Republican') ? -d.margin : +d.margin)})
        const closeness = d3.map()
        closeFile.forEach((d) => {closeness.set(
          d.districtnumber, d.margin)})
        let geoDists = assemblyFile.features.map((d) => (d.properties[this.state.mapRegionType]))
        let invalidData = closeness.keys().filter((k) => (geoDists.indexOf(parseInt(k, 10)) < 0))
        invalidData.forEach((k) => (closeness.remove(k)))
        this.setState({mapData: closeness,
                       mapGeo: assemblyFile})
    })
  }
  
  
  render() {
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
              <MapTooltip {...this.state.tooltip} />
              <MapContainer clearTooltip={this.clearTooltip}>
                <MainMap {...this.state} onRegionHover={this.onRegionHover}/>
             </MapContainer>
            </Grid.Column>
            <Grid.Column width={5}>
              <Card>
                <TopTen onTableHover={this.onTableHover} mapData={this.state.mapData} marginType={this.state.marginType} />
              </Card>
            </Grid.Column>
        </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
