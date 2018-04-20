import { connect } from 'react-redux'; 
import { loadData } from '../../actions/index';
import MapDistrict from './MapDistrict';
const React = require('react');
const d3 = require('d3');
 
const Map = ({mapWidth, mapHeight, mapComponents, parentDist, drillDown, county}) => {
  let projection = d3.geoIdentity()
                 .reflectY(true)
                 .fitSize([mapWidth,mapHeight], mapComponents.geoJson)

  let closenessExtent = d3.extent(mapComponents.geoData.values())
  let color = d3.scaleLinear()
              .domain([closenessExtent[0], 0,
                       closenessExtent[1]])
              .range(['red', 'white', 'blue'])

  let renderedShapes = mapComponents.geoJson.features.map((d,i) => (
        <MapDistrict key={`district-${i}`}
          d={d}
          projection={ `${d3.geoPath().projection(projection)(d)}` }
          fill={ `${ color(mapComponents.geoData.get(d.properties.districtNumber))}`}
          onClick={() => drillDown(d.properties.districtNumber, parentDist, county)}
        />
      ))

    return (
      <div className='map-frame'>
        <svg width={mapWidth} height={mapHeight}>
          <g className='map-layer'>
            { renderedShapes }
          </g>
        </svg>
      </div>
    )
}

const mapStateToProps = (state) => ({
  mapWidth: state.mapDimensions[0],
  mapHeight: state.mapDimensions[1],
  parentDist: state.districtType,
  county: state.highlightedEdData.county})

const mapDispatchToProps = (dispatch, ownProps) => (
  {drillDown: (selected, parentDist, county) => (
      dispatch(
        loadData({parentDistId: selected, parentDistType: parentDist, county: county })
      )
    )
  }
)

const DataMap = connect(mapStateToProps, mapDispatchToProps)(Map)

export default DataMap  
