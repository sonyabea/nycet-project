const d3 = require('d3');

export function topLevelMapReducer(state={
                          geoJson: {type: '', features: []},
                          geoData: d3.map()}, action) {
  switch (action.type) {
    case 'LOAD_TOP_LEVEL_MAP':
      return action.payload.mapData
    default:
      return state
  }
}

export function EDLevelMapReducer(state={
                          geoJson: {type: '', features: []},
                          geoData: d3.map()}, action) {
  switch (action.type) {
    case 'LOAD_ED_LEVEL_MAP':
      return action.payload.mapData
    default:
      return state
  }
}

//currently hardcoded for a 10-row table, don't @ me
export function mapDimensionsReducer(state={mapDimensions: [0,471]}, action) {
  switch (action.type) {
    case 'SET_MAP_DIMENSIONS':
      return action.payload
    default:
      return state
  }
}

export function depthLevelReducer(state=0, action) {
  switch (action.type) {
    case 'CHANGE_DEPTH':
      return action.payload.level
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
