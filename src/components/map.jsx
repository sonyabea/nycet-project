const React = require('react');
const d3 = require('d3');
 
const MainMap = (props) => {

  var projection = d3.geoIdentity()
                 .reflectY(true)
                 .fitSize([props.width,props.height],props.mapGeo)

  var path = d3.geoPath()
    .projection(projection)

  var closenessExtent= d3.extent(props.mapData.values())

  var color = d3.scaleLinear()
              .domain([closenessExtent[0], 0,
                       closenessExtent[1]])
              .range(['red', 'white', 'blue'])

  var renderShapes = () => (props.mapGeo.features.map((d,i) => {
      let selected = (d.properties[props.mapRegionType] === props.selectedId) ? 'glow' : 'district'
      return (<path
          data={d}
          key={ `path-${ i }` }
          d={ `${d3.geoPath().projection(projection)(d)}` }
          className={selected}
          fill={ `${ color(props.mapData.get(d.properties[props.mapRegionType]))}`}
          onMouseEnter={(e) => (props.onRegionHover(e, d))}
        />)
      }
 ))

    return (
      <div className='map-frame'>
        <svg width={props.width} height={props.height}>
          <g className='map-layer'>
            { renderShapes() }
          </g>
        </svg>
      </div>
    )
}  

export default MainMap;
