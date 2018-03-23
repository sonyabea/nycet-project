import assemblyLoc from './index';
import electionLoc from './index';
import assemblyDataLoc from './index';
import electionDataLoc from './index';

export function determineGranularity(level, regionId) => (dispatch) => {
  //change this to whatever when the time comes
  if (level == 'AD') {
    let geoSource = assemblyLoc;
    let dataSource = assemblyDataLoc;
    let mapRegionType = 'AssemDist';
    let dataRegionType = 'districtnumber';
  }
  else {
    let geoSource = electionLoc;
    let dataSource = electionDataLoc;
    let mapRegionType = 'ElectDist';
    let dataRegionType = 'ed';
  }
  return (
    d3.queue()
      .defer(d3.json, this.state.geoSource) 
      .defer(d3.tsv, this.state.dataSource) 
      .await((error, geoFile, dataFile) => {
        let filtered = filterFiles(geoFile, dataFile, mapRegionType, dataRegionType, regionId);
        let filteredGeo = filtered[0]
        let filteredData = filtered[1] 
        filteredData.forEach((d) => {
          d.margin = ((d.winning_party === 'Republican') ? -d.margin : +d.margin)})
      });

  }
  

}

const filterFiles(geoFile, dataFile, mapRegionType, dataRegionType, regionId){
  //filter locations to selected AD first
  
  let filteredFeatures = geoFile.features.filter((d) => (
    d.properties[mapRegionType].toString().slice(0,2) === regionId))
  
  let adFeatures = filteredFeatures.map((d) => (d.properties[mapRegionType]))
  let filteredData = dataFile.filter((d) => (adFeatures.indexOf(
      parseInt(d[dataRegionType], 10)) >= 0))

  return [{'type': geoFile['type'], 'features': filteredFeatures},
          filteredData]

  }
