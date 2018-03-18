const React = require('react');
const d3 = require('d3');
 
const MainMap = (props) => {

  var projection = d3.geoIdentity()
                 .reflectY(true)
                 .fitSize([props.width,props.height],props.mapGeo)

  var path = d3.geoPath()
    .projection(projection)

  var color = d3.scaleLinear()
              .domain([props.closenessExtent[0], 0,
                       props.closenessExtent[1]])
              .range(['red', 'white', 'blue'])

  var renderShapes = () => (props.mapGeo.features.map((d,i) => 
      (   <path
          data={d}
          key={ `path-${ i }` }
          d={ `${d3.geoPath().projection(projection)(d)}` }
          className="ed"
          fill={ `${ color(props.mapData.get(d.properties.AssemDist))}`}
        />))
 )

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
  // renderTooltip(coordinates, tooltipData) {
  //   const tooltipComponent = (
  //     <MyTooltipComponent
  //       coordinates={coordinates}
  //       data={tooltipData} />
  //   );
     
//}

export default MainMap;
