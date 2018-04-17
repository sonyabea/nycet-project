const filterToParent = (geoFile, selected) => {
    let getParentRegion = (region) => (parseInt(region.toString().slice(0,2), 10))
    return geoFile.features.filter((d) => {
    return (getParentRegion(d.properties.districtNumber) === selected)
})
}

export const filterFiles = (geoFile, dataFile, mapRegionType, dataRegionType, selected) => {

  geoFile.features.forEach((d) => d.properties['districtNumber'] = d.properties[mapRegionType]) 
  let filteredFeatures = (selected !== 0) ? filterToParent(geoFile, parseInt(selected, 10)) : geoFile.features

  //get all valid regions in the geodata and filter data
  let regionIds = filteredFeatures.map((d) => (d.properties.districtNumber))
  let filteredData = dataFile.filter((d) => (regionIds.indexOf(
      parseInt(d[dataRegionType], 10)) >= 0))

  return [{'type': geoFile['type'], 'features': filteredFeatures},
          filteredData]
  }
