const d3 = require('d3');

export function mapStateReducer(state={
                          geoJson: {type: '', features: []},
                          geoData: d3.map()}, action) {
  switch (action.type) {
    case 'SET_MAP_DATA':
      return action.payload
    // case 'AD_CLICK':
    //   return action.payload
    // case 'ED_CLICK':
    //   return 'some filtered stuff'
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
