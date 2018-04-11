const d3 = require('d3');

const assemblyLoc = 'https://raw.githubusercontent.com/cngonzalez/nycet-flatfiles/master/locational/nyad_geo.json'
const electionLoc = 'https://raw.githubusercontent.com/cngonzalez/nycet-flatfiles/master/locational/nyed_geo.json'
const assemblyDataLoc = 'https://raw.githubusercontent.com/cngonzalez/nycet-flatfiles/master/ad_margins.tsv'
const electionDataLoc = 'https://raw.githubusercontent.com/cngonzalez/nycet-flatfiles/master/ed_margins.tsv'

//MAP HELPERS

const DISTRICT_LEVEL_LABELS = {
  //top-level: NYC show all AD, SD, CD
  0: [assemblyLoc, assemblyDataLoc, 'AssemDist', 'districtnumber'],
  //mid-level: show EDs for a specific level
  1: [electionLoc, electionDataLoc, 'ElectDist', 'ed']}

const filterFiles = (geoFile, dataFile, mapRegionType, dataRegionType, level, selected) => {
  //filter if any level lower than top
  let filteredFeatures = (level > 0) ? geoFile.features.filter((d) => (
    parseInt(d.properties[mapRegionType].toString().slice(0,2), 10) === selected)) : geoFile.features
  filteredFeatures.forEach((d) => d.properties['districtNumber'] = d.properties[mapRegionType]) 
  //get all valid regions in the geodata and filter data
  let regionIds = filteredFeatures.map((d) => (d.properties[mapRegionType]))
  let filteredData = dataFile.filter((d) => (regionIds.indexOf(
      parseInt(d[dataRegionType], 10)) >= 0))

  return [{'type': geoFile['type'], 'features': filteredFeatures},
          filteredData]
  }


//ABSTRACTED DATA LOAD
export const loadMapData = (level=0, selected=null) => (
  //use this thunk syntax, because d3.queue happens async
  (dispatch) => { 

    let [geoSource,
         dataSource,
         mapRegionType,
         dataRegionType] = DISTRICT_LEVEL_LABELS[level];

    return (
      d3.queue()
        .defer(d3.json, geoSource) 
        .defer(d3.tsv, dataSource) 
        .await((error, geoFile, dataFile) => {
          let [filteredGeo,
               filteredData] = filterFiles(geoFile, dataFile, mapRegionType, dataRegionType, level, selected);

          let dataMap = d3.map()
          filteredData.forEach((d) => {
            d.margin = ((d.winning_party === 'Republican') ? -d.margin : +d.margin)
            dataMap.set(d[dataRegionType], d.margin)})
            dispatch(storeMapData(
                   {geoJson: filteredGeo, 
                    geoData: dataMap}, level))
        })
      )
   }
);


//MAP ACTIONS
export const storeMapData = (mapObj, level) => ( 
  {type: 'SET_DEPTH',
   payload: {mapData: mapObj,
             level: level}}
)

export const setMapDimensions = (width, height) => (
  {type: 'SET_MAP_DIMENSIONS',
   payload: [width, height]}
)

