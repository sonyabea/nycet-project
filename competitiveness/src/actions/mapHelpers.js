const d3 = require('d3');

const MAP_REGIONS = {
   'AD': 'AssemDist',
   'SD': 'StSenDist',
   'CD': 'CongDist',
   'ED': 'ElectDist'}


const filterToParents = (geoFile, dataPull) => {
    let isNYC = dataPull[0].countyed.split(" ")[0] === 'New'
    let edNumIdx = (isNYC) ? 5 : 4

    dataPull.forEach((d) => d.district = parseInt(`${d.ad}${d.countyed.split(" ")[edNumIdx]}`, 10))
    let validEds = dataPull.map((d) => d.district)
    return geoFile.features.filter((d) => (validEds.indexOf(d.properties.districtNumber) >= 0))
}


export const filterAndProcess = (geoFile, dataPull, districtType, selected) => {
  //normalize geoJson to use abstract "districtNumber" prop
  let mapRegionType = MAP_REGIONS[districtType]
  geoFile.features.forEach((d) => d.properties.districtNumber = d.properties[mapRegionType])

  let filteredFeatures = (selected !== 0) ? filterToParents(geoFile, dataPull) : geoFile.features

  //get all valid regions in the geodata and filter data
  let regionIds = filteredFeatures.map((d) => (d.properties.districtNumber))
  let filteredData = dataPull.filter((d) => (regionIds.indexOf(
      parseInt(d.district, 10)) >= 0))

  //format for color
  filteredData.forEach((d) => {
    d.most_rec_pl_margin = (
        (d.winning_pol_lean === 'right') ? -d.most_rec_pl_margin : +d.most_rec_pl_margin)
    })

  return [{'type': geoFile['type'], 'features': filteredFeatures},
          filteredData]
}


export const formatToMap = (dataset, field) => {
  let newMap = d3.map();
  dataset.forEach((d) => (newMap.set(d.district, d[field])))
  return newMap;
}


export const determineSelectedEd = (dataMap) => (
  dataMap.entries().sort((a, b) => (
    Math.abs(a.value) - Math.abs(b.value)))[0].key
)
