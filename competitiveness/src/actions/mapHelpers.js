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
  {columns: ['district', 'most_rec_pl_margin',
             'winning_pol_lean', 'winning_party'],
  filterOn: 'office',
  filterBy: dist})

const getEdQuery = (parentDist, election, selected) => (
{columns: [`e.pl_margin_${election.toString().toLowerCase()} as most_rec_pl_margin`,
           'd.ad',
           'e.countyed',
           'd.county',
           `e.wp_${election.toString().toLowerCase()} as winning_party`,
           'p.map as winning_pol_lean'],
 addtlQuery: [' as e',
             'JOIN electiondistricts as d ON d.countyed = e.countyed',
             `JOIN maps_pollean p ON e.wp_${election.toString().toLowerCase()} = p.party`,
             `WHERE d.${parentDist.toString().toLowerCase()} = ${selected}`].join(' ')})


export const queryDB = (dist, table, election, selected) => {
  let query = (selected === 0) ? getHlQuery(dist) : getEdQuery(dist, election, selected)
  console.log(query)
  return axios({method: 'post',
        url: `http://localhost:8080/table/${table}/`,
        data: query })
}

//PROCESS DATA
const filterToParents = (geoFile, dataPull) => {
    //we should regex this in the future??
    let isNYC = dataPull[0].countyed.split(" ")[0] === 'New'
    let edNumIdx = (isNYC) ? 5 : 4
    //set ED numbers from e.g. "Bronx Ad 57 - Ed 004" to "district" prop
    dataPull.forEach((d) => d.district = parseInt(`${d.ad}${d.countyed.split(" ")[edNumIdx]}`, 10))
    let validEds = dataPull.map((d) => d.district)
    return geoFile.features.filter((d) => (validEds.indexOf(d.properties.districtNumber) >= 0))
}

export const filterFiles = (geoFile, dataPull, mapRegionType, selected) => {
  //normalize geoJson to use abstract "districtNumber" prop
  geoFile.features.forEach((d) => d.properties.districtNumber = d.properties[mapRegionType])

  let filteredFeatures = (selected !== 0) ? filterToParents(geoFile, dataPull) : geoFile.features

  //get all valid regions in the geodata and filter data
  let regionIds = filteredFeatures.map((d) => (d.properties.districtNumber))
  let filteredData = dataPull.filter((d) => (regionIds.indexOf(
      parseInt(d.district, 10)) >= 0))

  return [{'type': geoFile['type'], 'features': filteredFeatures},
          filteredData]
  }
