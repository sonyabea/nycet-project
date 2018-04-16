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
  AD: [assemblyLoc, assemblyDataLoc, 'AssemDist', 'districtnumber'],
  //mid-level: show EDs for a specific level
  ED: [electionLoc, electionDataLoc, 'ElectDist', 'ed']}


//ACTION CREATORS
export const loadMapData = (props) => 
  //use this thunk syntax, because d3.queue happens async
  dispatch => { 

    dispatch(announceLoading)
    let selected = props.parentDistId
    let districtType = (selected === 0) ? props.parentDistType : 'ED'
    console.log(selected)
    console.log(districtType)
    let [geoSource,
         dataSource,
         mapRegionType,
         dataRegionType] = DISTRICT_LEVEL_LABELS[districtType];

    return (
      d3.queue()
        .defer(d3.json, geoSource) 
        .defer(d3.tsv, dataSource) 
        .await((error, geoFile, dataFile) => {
          let [filteredGeo,
               filteredData] = filterFiles(geoFile, dataFile, mapRegionType, dataRegionType, selected);

          let dataMap = d3.map()
          console.log(filteredData)
          console.log(filteredGeo)
          filteredData.forEach((d) => {
            d.margin = ((d.winning_party === 'Republican') ? -d.margin : +d.margin)
            dataMap.set(d[dataRegionType], d.margin)})
            dispatch(storeMapData(
                   {geoJson: filteredGeo, 
                    geoData: dataMap}, 'LOAD_MAP_DATA'))
        })
      )
  }


//ACTIONS
export const storeMapData = (mapObj, actionType) => ( 
  {type: actionType,
   payload: mapObj}
)

export const setMapDimensions = (width, height) => (
  {type: 'SET_MAP_DIMENSIONS',
   payload: [width, height]}
)

export const announceLoading = () => (
  {type: 'LOAD_DATA'}
)
