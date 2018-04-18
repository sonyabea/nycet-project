import { filterFiles, returnLoadParams, queryDB } from './mapHelpers'
const d3 = require('d3');

//ACTION CREATORS
export const loadMapData = (props) => 
  //use this thunk syntax, because d3.queue happens async
  dispatch => { 
    dispatch(announceLoading)
    let selected = props.parentDistId
    let districtType = (selected === 0) ? props.parentDistType : 'ED'
    console.log(districtType)
    dispatch(changeDistrict(districtType))
    let {mapRegionType,
         geoSource, table}= returnLoadParams(districtType) 

        //changes econd parent dist type to election state eventaully 
        queryDB(props.parentDistType, table, props.parentDistType, selected).then(dataPull => {
        d3.queue()
          .defer(d3.json, geoSource) 
          .await((error, geoFile) => {
            let [filteredGeo,
                 filteredData] = filterFiles(geoFile, dataPull.data, mapRegionType, selected);

            let dataMap = d3.map()
            filteredData.forEach((d) => {
              d.most_rec_pl_margin = ((d.winning_pol_lean === 'right') ? -d.most_rec_pl_margin : +d.most_rec_pl_margin)
              dataMap.set(d.district, d.most_rec_pl_margin)})
              dispatch(storeMapData(
                     {geoJson: filteredGeo, 
                      geoData: dataMap}, 'LOAD_MAP_DATA'))
        })
     })
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

export const changeDistrict = (distType) => (
  {type: 'CHANGE_DISTRICT_TYPE',
   payload: distType})
