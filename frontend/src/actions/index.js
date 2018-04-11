import { assemblyLoc, electionLoc, assemblyDataLoc, electionDataLoc } from '../index';
const d3 = require('d3');

//MAP HELPERS 

const filterFiles = (geoFile, dataFile, mapRegionType, dataRegionType) => {

  // let filteredFeatures = geoFile.features.filter((d) => (
  //   d.properties[mapRegionType].toString().slice(0,2) === regionId))
  
  let adFeatures = geoFile.features.map((d) => (d.properties[mapRegionType]))
  let filteredData = dataFile.filter((d) => (adFeatures.indexOf(
      parseInt(d[dataRegionType], 10)) >= 0))

  return [{'type': geoFile['type'], 'features': geoFile.features},
          filteredData]
  }

export const loadMapData = () => ((dispatch) => {

// export const determineGranularity = (dispatch) => {
  //change this to whatever when the time comes
  // if (level == 'AD') {
  //   let geoSource = assemblyLoc;
  //   let dataSource = assemblyDataLoc;
  let mapRegionType = 'AssemDist';
  let dataRegionType = 'districtnumber';
  // }
  // else {
  //   let geoSource = electionLoc;
  //   let dataSource = electionDataLoc;
  //   let mapRegionType = 'ElectDist';
  //   let dataRegionType = 'ed';
  // }
  return (
    d3.queue()
      //hardcode for now
      .defer(d3.json, assemblyLoc) 
      .defer(d3.tsv, assemblyDataLoc) 
      .await((error, geoFile, dataFile) => {
        let filtered = filterFiles(geoFile, dataFile, mapRegionType, dataRegionType);
        let filteredGeo = filtered[0]
        let filteredData = filtered[1]
        let dataMap = d3.map()
        filteredData.forEach((d) => {
          d.margin = ((d.winning_party === 'Republican') ? -d.margin : +d.margin)
          dataMap.set(d[dataRegionType], d.margin)})
        dispatch(storeMapData({'geoJson': filteredGeo, 
                               'geoData': dataMap}))
        // return {mapComponents: {geoJson: filteredGeo, geoData: filteredData}}                          
      }))});


//MAP ACTIONS
const storeMapData = (mapObj) => ({
  type: 'SET_MAP_DATA',
  payload: mapObj})
