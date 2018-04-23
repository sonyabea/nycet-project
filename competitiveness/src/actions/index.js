import { filterFiles, returnLoadParams, queryDB } from './mapHelpers'
import axios from 'axios'
const d3 = require('d3');

//ACTION CREATORS
export const loadData = (props) => 
  dispatch => { 
    if (props.parentDistType === 'ED') {
      dispatch(loadEDData(props.parentDistId, props.county))
    }
    else {
      dispatch(loadHLData(props))
    }
}

const loadHLData = (props) => dispatch =>  {
    let selected = props.parentDistId
    let districtType = (selected === 0) ? props.parentDistType : 'ED'
    dispatch(changeDistrict(districtType, props.parentDistType, selected))
    let election = (typeof(props.election) === 'undefined') ? props.parentDistType : props.election
    let {mapRegionType,
         geoSource, table}= returnLoadParams(districtType) 

        //changes second parent dist type to election state eventaully 
        queryDB(props.parentDistType, table, election, selected).then(dataPull => {
        d3.queue()
          .defer(d3.json, geoSource) 
          .await((error, geoFile) => {
            let [filteredGeo,
                 filteredData] = filterFiles(geoFile, dataPull.data, mapRegionType, selected);
            let county = filteredData[0].county
            dispatch(setCounty(county))

            let dataMap = d3.map()
            let partyMap = d3.map()
            filteredData.forEach((d) => {
              d.most_rec_pl_margin = ((d.winning_pol_lean === 'right') ? -d.most_rec_pl_margin : +d.most_rec_pl_margin)
              dataMap.set(d.district, d.most_rec_pl_margin)
              partyMap.set(d.district, d.winning_party)
              })
              dispatch(storeMapData(
                     {geoJson: filteredGeo, 
                      geoData: dataMap}, 'LOAD_MAP_DATA'))

              dispatch(storePartyData(partyMap))

              //also auto-select top ED for detail view
              if (districtType === 'ED') {
                let topED = dataMap.entries().sort((a, b) => (
                    Math.abs(a.value) - Math.abs(b.value)))[0]
                dispatch(loadEDData(topED.key, county, election))
              }
        })
     })
  }

//HIGHLIGHT ED ACTION CREATORS

const loadEDData = (ed, county) => dispatch => {

  dispatch(setED(ed)) 
  let stringAd = ed.toString().split('').slice(0,2).join('')
  let stringEd = ed.toString().split('').slice(2,5).join('')

  //hardcode all keys for now until db is sorted, when we can just join
  let allParams =[{filterString: `${county.toString()}AD 0${stringAd} - ED ${stringEd}`,
                   table: 'acs_ed_demographics',
                   actionType: 'LOAD_ACS'},
                  {filterString: `${county.toString().toUpperCase()}AD 0${stringAd} - ED ${stringEd}`,
                      table: 'census_ed_demographics',
                      actionType: 'LOAD_CENSUS'},
                  {filterString: `${county.toString()}Ad ${stringAd} - Ed ${stringEd}`,
                      table: 'ed_agg_voter_file',
                      actionType: 'LOAD_TURNOUT'},
                  {filterString: `${county.toString()}Ad ${stringAd} - Ed ${stringEd}`,
                      table: 'ed_agg_voter_file',
                      actionType: 'LOAD_TURNOUT'},
                  {filterString: `${county.toString()}Ad ${stringAd} - Ed ${stringEd}`,
                      table: 'ed_metrics',
                      actionType: 'LOAD_WINS_FOR_PARTY'}

]

  allParams.forEach((params) => {
    let query = {filterOn: 'countyed', filterBy: params.filterString}
    axios({method: 'post',
           url: `http://localhost:8080/table/${params.table}`,
           data: query}).then((res) => (
              dispatch(dispatchHighlightData(res.data, params.actionType))))})

}

//PURE ACTIONS

const dispatchHighlightData = (data, action) => (
  {type: action,
   payload: data})

export const storeMapData = (mapObj, actionType) => ( 
  {type: actionType,
   payload: mapObj}
)

export const storePartyData = (partyMap) => (
  {type: 'STORE_PARTY_DATA',
   payload: partyMap}
)

export const setMapDimensions = (width, height) => (
  {type: 'SET_MAP_DIMENSIONS',
   payload: [width, height]}
)

export const changeDistrict = (distType, parentDist, selected) => (
  {type: 'CHANGE_DISTRICT_TYPE',
   payload: {main: distType, parent: parentDist, selected: selected}}
)

export const setED = (ed) => (
  {type: 'SELECT_ED',
   payload: ed}
)
export const setCounty = (county) => (
  {type: 'SELECT_COUNTY',
   payload: county}
)

export const changeDemoType = (type) => (
  {type: 'CHANGE_DEMO_TYPE',
   payload: type}
)

