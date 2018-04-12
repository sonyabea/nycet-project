import { filterFiles } from './mapHelpers'
const d3 = require('d3');

//META MAP VARS -- MAKE THIS BETTER LATER
const assemblyLoc = 'https://raw.githubusercontent.com/cngonzalez/nycet-flatfiles/master/locational/nyad_geo.json'
const electionLoc = 'https://raw.githubusercontent.com/cngonzalez/nycet-flatfiles/master/locational/nyed_geo.json'
const assemblyDataLoc = 'https://raw.githubusercontent.com/cngonzalez/nycet-flatfiles/master/ad_margins.tsv'
const electionDataLoc = 'https://raw.githubusercontent.com/cngonzalez/nycet-flatfiles/master/ed_margins.tsv'

const DISTRICT_LEVEL_LABELS = {
  //top-level: NYC show all AD, SD, CD
  //eventually add diff levels
  0: [assemblyLoc, assemblyDataLoc, 'AssemDist', 'districtnumber'],
  //mid-level: show EDs for a specific level
  1: [electionLoc, electionDataLoc, 'ElectDist', 'ed']}


//ACTION CREATORS
export const loadMapData = (level=0, selected=null, parentDistrictType='AD') => (
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
                    geoData: dataMap}, level, parentDistrictType))
        })
      )
   }
);


//ACTIONS
export const storeMapData = (mapObj, level, districtType) => ( 
  {type: 'SET_DEPTH',
   payload: {mapData: mapObj,
             level: level,
             parentDistrictType: districtType}}
)

export const setMapDimensions = (width, height) => (
  {type: 'SET_MAP_DIMENSIONS',
   payload: [width, height]}
)

