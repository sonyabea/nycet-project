const d3 = require('d3');

export function mapDataReducer(state={
                          geoJson: {type: '', features: []},
                          geoData: d3.map()}, action) {
  switch (action.type) {
    case 'LOAD_MAP_DATA':
      return action.payload
    default:
      return state
  }
}

// export function EDLevelMapReducer(state={
//                           geoJson: {type: '', features: []},
//                           geoData: d3.map()}, action) {
//   switch (action.type) {
//     case 'LOAD_ED_LEVEL_MAP':
//       return action.payload
//     default:
//       return state
//   }
// }

//currently hardcoded for a 10-row table, don't @ me
export function mapDimensionsReducer(state={mapDimensions: [0,471]}, action) {
  switch (action.type) {
    case 'SET_MAP_DIMENSIONS':
      return action.payload
    default:
      return state
  }
}

export function districtTypeReducer(state='AD', action) {
  switch (action.type) {
    case 'CHANGE_DISTRICT_TYPE':
      return action.payload
    default:
      return state
  }
}

export function isLoadingReducer(state=true, action){
  switch (action.type) {
    case 'LOAD_DATA':
      return true
    case 'LOAD_MAP_DATA':
      return false
    default:
      return state
  }
}


// export function selectedIdReducer(state=null, action){
//   switch (action.type) {
//     case 'MOUSE_IN':
//       return action.payload
//     default:
//       return state
//   }
// }

// export function tooltipReducer(state={
//                     showTooltip: false,
//                     tooltipX: 0,
//                     tooltipY: 0,
//                     text: []}, action){
//   switch (action.type) {
//     case 'MOUSE_IN':
//       return action.payload
//     default:
//       return state
//   }
// }
