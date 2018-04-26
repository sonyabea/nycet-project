import { filterFiles, returnLoadParams, queryDB } from './mapHelpers'
import axios from 'axios'
const d3 = require('d3');

//ACTION CREATORS

export const loadHLData = (parentDistrictType, parentDistrictId, selectedElection, childDistrict) => dispatch =>  {
    dispatch({type: 'IS_LOADING'})
    let selected  = parentDistrictId
    let districtType = (selected === 0) ? parentDistrictType : 'ED'
    dispatch(changeDistrict(districtType, parentDistrictType, selected))
    let election = (typeof(selectedElection) === 'undefined') ? parentDistrictType : selectedElection
    let {mapRegionType,
         geoSource, table}= returnLoadParams(districtType) 

        //changes second parent dist type to election state eventaully 
    queryDB(parentDistrictType, table, election, selected).then(dataPull => {
        d3.queue()
          .defer(d3.json, geoSource) 
          .await((error, geoFile) => {
            let [filteredGeo,
                 filteredData] = filterFiles(geoFile, dataPull.data, mapRegionType, selected);
          
            //errors get thrown here! make it better.
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
                let selectedEd = childDistrict;
                if (typeof(selectedEd) === 'undefined') {
                    selectedEd = dataMap.entries().sort((a, b) => (
                    Math.abs(a.value) - Math.abs(b.value)))[0].key
                }
                dispatch(loadEDData(selectedEd, county))
              }
             else {dispatch({type: 'FINISHED_LOADING'})}
        })
     })
  }

//HIGHLIGHT ED ACTION CREATORS

export const loadEDData = (ed, county) => dispatch => {

  dispatch({type: 'IS_LOADING'})
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
                      table: 'ed_metrics',
                      actionType: 'LOAD_ED_METRICS'}

]

  allParams.forEach((params) => {
    let query = {filterOn: 'countyed', filterBy: params.filterString}
    axios({method: 'post',
           url: `http://localhost:8080/table/${params.table}`,
           data: query}).then((res) => (
              dispatch(dispatchHighlightData(res.data, params.actionType))))})
  
  dispatch({type: 'FINISH_LOADING'})

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

export const setSidebarDimensions = (width, height) => (
  {type: 'SET_SIDEBAR_DIMENSIONS',
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

//consider putting in a timer here to deal with that lingering tooltip prob
export const showTooltip = (mouseEvent, districtNumber) => {
  return {type: 'MOUSE_IN_DISTRICT',
   payload: {showTooltip: true,
             tooltipX: mouseEvent.clientX,
             tooltipY: mouseEvent.clientY,
             districtNumber: districtNumber}}
}

export const hideTooltip = () => (
  {type: 'MOUSE_OUT_MAP'}
)

export const activateGlow = (distNumber) => (
  {type: 'ACTIVATE_GLOW_ONLY',
   payload: distNumber}
)
