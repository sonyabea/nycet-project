// import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { storeMapData, loadMapData } from '../actions/index';
const React = require('react');
const d3 = require('d3');
 
const Map = ({mapWidth, mapHeight, mapComponents, depthLevel, drillDown}) => {

  let projection = d3.geoIdentity()
                 .reflectY(true)
                 .fitSize([mapWidth,mapHeight], mapComponents.geoJson)

  let path = d3.geoPath()
    .projection(projection)

  let closenessExtent = d3.extent(mapComponents.geoData.values())
  let color = d3.scaleLinear()
              .domain([closenessExtent[0], 0,
                       closenessExtent[1]])
              .range(['red', 'white', 'blue'])

  let renderShapes = () => (mapComponents.geoJson.features.map((d,i) => {
      // let selected = (d.properties[props.mapRegionType] === props.selectedId) ? 'glow' : 'district'
      return (
      // <Link key={`link-${i}`} to={{pathname: `/AD/${d.properties[props.mapRegionType]}`}}>
        <path
          data={d}
          key={ `path-${ i }` }
          d={ `${d3.geoPath().projection(projection)(d)}` }
          fill={ `${ color(mapComponents.geoData.get(d.properties.AssemDist))}`}
          onClick={() => (drillDown(depthLevel))}
        />
      // </Link>
      )
    }
)
)

    return (
      <div className='map-frame'>
        <svg width={mapWidth} height={mapHeight}>
          <g className='map-layer'>
            { renderShapes() }
          </g>
        </svg>
      </div>
    )
}

const mapStateToProps = (state) => ({
  mapWidth: state.mapDimensions[0],
  mapHeight: state.mapDimensions[1],
  depthLevel: state.depthLevel,
  mapComponents: state.mapComponents})

const mapDispatchToProps = (dispatch, ownProps) => (
  {drillDown: (depthLevel) => dispatch(loadMapData(storeMapData, (depthLevel + 1)))}
)

const DataMap = connect(mapStateToProps, mapDispatchToProps)(Map)

export default DataMap  
