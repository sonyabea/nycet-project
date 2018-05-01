import { filterFiles, returnLoadParams, queryDB } from './mapHelpers'
import axios from 'axios'
import tabMapping from '../data/tabMapping'
const d3 = require('d3');
const MAPPING = tabMapping

//ACTION CREATORS

export const loadHLData = (parentDistrictType, parentDistrictId, selectedElection, childDistrict) => dispatch =>  {
    dispatch({type: 'IS_LOADING'})
    let selected  = parentDistrictId
    let districtType = (selected === 0) ? parentDistrictType : 'ED'
    dispatch(changeDistrict(districtType, parentDistrictType, selected))
    let election = (typeof(selectedElection) === 'undefined') ? parentDistrictType : selectedElection
    dispatch(changeElection(election))
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
                dispatch(loadEDData(selectedEd, election))
              }
             else {dispatch({type: 'FINISHED_LOADING'})} })
     })
  }

//HIGHLIGHT ED ACTION CREATORS

export const loadEDData = (ed, election) => dispatch => {
  dispatch({type: 'IS_LOADING'})
  dispatch(setED(ed)) 
  let edStr = `Ad ${ed.toString().split('').slice(0,2).join('')} - Ed ${ed.toString().split('').slice(2,5).join('')}`
  var demos = Object.keys(MAPPING)
  let allCols = [`ed.dbdo_${election}`, 'acs.total', 'acs.registered_pct']
  demos.forEach((demo) => {
    let tabCats = MAPPING[demo]
    tabCats.forEach((tab) => {
      tab.cols.forEach((col) => 
        allCols.push(`${demo}.${col}`))
    })
  })

  let queryParams = {columns: allCols,
                     table: 'electiondistricts',
                     addtlQuery: [' district join ed_agg_voter_file turnout on district.countyed = turnout.countyed',
                                  'join census_ed_demographics census on district.countyed = census.countyed',
                                  'join acs_ed_demographics acs on district.countyed = acs.countyed',
                                  'join ed_metrics ed on district.countyed = ed.countyed',
                                  `where district.ed = '${edStr}'`].join(' ')}

    axios({method: 'post',
           url: 'http://localhost:8080/table/electiondistricts',
           data: queryParams}).then((res) => {
      let data = res.data[0]
      dispatch({type: 'LOAD_ED_METRICS',
                payload: {dbdo: data[`dbdo_${election.toLowerCase()}`],
                          totalPop: data.total,
                          pctRegistered: data.registered_pct}})

      demos.forEach((demo) => {
        let payload = {}
        let demoCols = [].concat.apply([], MAPPING[demo].map((tab) => tab.cols))
        demoCols.forEach((col) => payload[col] = data[col])
        //something breaks around here
        dispatch({type: `LOAD_${demo.toUpperCase()}`, payload: payload})
      });
        dispatch({type: 'FINISHED_LOADING'})
    })


}

//PURE ACTIONS

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

export const changeElection = (election) => (
  {type: 'CHANGE_ELECTION',
   payload: election}
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
