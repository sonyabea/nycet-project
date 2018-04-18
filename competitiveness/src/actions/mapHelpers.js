import axios from 'axios'

//MAP METADATA
const getGeoSource = (dist) => (
  `https://raw.githubusercontent.com/cngonzalez/nycet-flatfiles/master/locational/${dist}.json`)

const MAP_REGIONS = {
   'AD': 'AssemDist',
   'SD': 'StSenDist',
   'CD': 'CongDist',
   'ED': 'ElectDist'}

export const returnLoadParams = (dist) => (
  {mapRegionType: MAP_REGIONS[dist],
   geoSource: getGeoSource(dist),
   table: (dist !== 'ED') ? 'hl_metrics' : 'ed_metrics'})

//DB QUERY
const getHlQuery = (dist) => (
  {columns: ['district',
            'most_rec_pl_margin', 'winning_pol_lean'],
  filterOn: 'office',
  filterBy: dist})

const getEdQuery = (parentDist, election, selected) => (
  {columns: [`e.pl_margin_${election.toString().toLowerCase()} as most_rec_pl_margin`, 'd.ad', 'e.countyed', 'p.map as winning_pol_lean'],
   addtlQuery: ` as e JOIN electiondistricts as d on d.countyed = e.countyed JOIN maps_pollean p on e.wp_${election.toString().toLowerCase()} = p.party where d.${parentDist.toString().toLowerCase()} = ${selected}`})

// as d where d.${parentDist.toLowerCase()} = ${selected}`})


export const queryDB = (dist, table, election, selected) => {
  let query = (selected === 0) ? getHlQuery(dist) : getEdQuery(dist, election, selected)
  return axios({method: 'post',   
        url: `http://localhost:8080/table/${table}/`,
        data: query })
}

const filterToParents = (geoFile, dataPull) => {
    dataPull.forEach((d) => d.district = parseInt(`${d.ad}${d.countyed.split(" ")[4]}`, 10))
    let validEds = dataPull.map((d) => d.district)
    return geoFile.features.filter((d) => (validEds.indexOf(d.properties.districtNumber) >= 0))
}

export const filterFiles = (geoFile, dataPull, mapRegionType, selected) => {

  geoFile.features.forEach((d) => d.properties['districtNumber'] = d.properties[mapRegionType])

  let filteredFeatures = (selected !== 0) ? filterToParents(geoFile, dataPull) : geoFile.features

  //get all valid regions in the geodata and filter data
  let regionIds = filteredFeatures.map((d) => (d.properties.districtNumber))
  let filteredData = dataPull.filter((d) => (regionIds.indexOf(
      parseInt(d.district, 10)) >= 0))
  // filteredData.forEach((d) => {
  //   d.most_rec_pl_margin = parseInt(d.most_rec_pl_margin,10)

  // })
  
  return [{'type': geoFile['type'], 'features': filteredFeatures},
          filteredData]
  }
