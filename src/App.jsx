import React, { Component } from 'react';
import { withRouter } from 'react-router';
import MapContainer from './components/MapContainer.jsx';
import MainMap from './components/map.jsx';
import MapTooltip from './components/MapTooltip.jsx';
import TopTen from './components/TopTen.jsx';
import { Grid, Header, Card, Container } from 'semantic-ui-react';
import './App.css';

const d3 = require('d3');

//connection to replica of Sonya's db - still buggy
const axios = require('axios');
process.versions.node = '9.10.0'
// const cn = 'postgres://nycetmember:J4}83,?{6X4$@10.39.38.14:5432/probono';
// const db = pgp(cn);

//hardcoded file locs and keywords. do this more elegantly later
const assemblyLoc = 'https://raw.githubusercontent.com/cngonzalez/nycet-flatfiles/master/locational/nyad_geo.json'
const electionLoc = 'https://raw.githubusercontent.com/cngonzalez/nycet-flatfiles/master/locational/nyed_geo.json'
const assemblyDataLoc = 'https://raw.githubusercontent.com/cngonzalez/nycet-flatfiles/master/ad_margins.tsv'
const electionDataLoc = 'https://raw.githubusercontent.com/cngonzalez/nycet-flatfiles/master/ed_margins.tsv'

class App extends Component {
  constructor(props){
    super(props)
    //this is getting a little unwieldy
    // selectedAd = (props.params.AD) ?
    let ad = props.match.params.AD;
    let adSpecific = (typeof(ad) !== 'undefined')

    this.state = {
             'geoSource': (adSpecific) ? electionLoc : assemblyLoc,
             'dataSource': (adSpecific) ? electionDataLoc : assemblyDataLoc,
             'mapGeo': {'features': []},
             'mapData': d3.map(),
             'mapRegionType': (adSpecific) ? 'ElectDist' : 'AssemDist',
             'dataRegionType': (adSpecific) ? 'ed' : 'districtnumber',
             'marginType': 'margin',
             'regionId': ad,
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
    this.loadData = this.loadData.bind(this)
    this.updateADRegion = this.updateADRegion.bind(this)
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

  filterFiles(geoFile, dataFile){
    //filter locations to selected AD first

    let filteredFeatures = geoFile.features.filter((d) => (
      d.properties.ElectDist.toString().slice(0,2) === this.state.regionId))

    let adFeatures = filteredFeatures.map((d) => (d.properties.ElectDist))
    let filteredData = dataFile.filter((d) => (adFeatures.indexOf(parseInt(d.ed, 10)) >= 0))

    return [{'type': geoFile['type'], 'features': filteredFeatures},
            filteredData]

  }

  loadData(){
    console.log(this.state)
    d3.queue()
      .defer(d3.json, this.state.geoSource)
      .defer(d3.tsv, this.state.dataSource)
      .await((error, geoFile, dataFile) => {
        dataFile.forEach((d) => {
          d.margin = ((d.winning_party === 'Republican') ? -d.margin : +d.margin)})
        if (this.state.regionId) {
          let filtered = this.filterFiles(geoFile, dataFile);
          geoFile = filtered[0];
          dataFile = filtered[1];
        }
        const closeness = d3.map()
        dataFile.forEach((d) => {closeness.set(
          d[this.state.dataRegionType], d.margin)})
        let geoDists = geoFile.features.map((d) => (d.properties[this.state.mapRegionType]))
        let invalidData = closeness.keys().filter((k) => (geoDists.indexOf(parseInt(k, 10)) < 0))
        invalidData.forEach((k) => (closeness.remove(k)))
        this.setState({mapData: closeness,
                       mapGeo: geoFile})
    })
  }

  componentWillMount() {
    this.loadData()
  }

  getInitialState(){
    this.updateADRegion(this.props);
  }

  updateADRegion(props) {
    let ad = props.match.params.AD;
    let adSpecific = (typeof(ad) !== 'undefined')

    this.setState({
             'geoSource': (adSpecific) ? electionLoc : assemblyLoc,
             'dataSource': (adSpecific) ? electionDataLoc : assemblyDataLoc,
             'mapRegionType': (adSpecific) ? 'ElectDist' : 'AssemDist',
             'dataRegionType': (adSpecific) ? 'ed' : 'districtnumber',
             'regionId': ad})
    this.loadData()
  }

  componentWillReceiveProps(nextProps){
    this.updateADRegion(nextProps);

  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return (nextProps.match.params.AD !== this.state.regionId)
  // }




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

const AppWithRouter = withRouter(App)
export default AppWithRouter;
