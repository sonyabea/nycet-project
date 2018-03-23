import assemblyLoc from './index';
import electionLoc from './index';
import assemblyDataLoc from './index';
import electionDataLoc from './index';

const d3 = require('d3');

export function mapStateReducer(state={
                          geoJson: {type: '', features: []},
                          geoData: d3.map(),
                          zoomedRegion: null}), action) {
  switch (action.level) {
    case 'AD_CLICK':
      return action.payload
    case 'ED_CLICK':
      return 'some filtered stuff'
    default:
      return state
  }
}


export function selectedIdReducer(state=null, action){
  switch (action.type) {
    case 'MOUSE_IN':
      return action.payload
    default:
      return state
  }
}

export function tooltipReducer(state={
                    showTooltip: false,
                    tooltipX: 0,
                    tooltipY: 0,
                    text: []}, action){
  switch (action.type) {
    case 'MOUSE_IN':
      return action.payload
    default:
      return state
  }
}
