const React = require('react');
const d3 = require('d3');
 
const MainMap = (props) => {

  var projection = d3.geoIdentity()
                 .reflectY(true)
                 .fitSize([props.width,props.height],props.assembly)

  var path = d3.geoPath()
    .projection(projection)

  var color = d3.scaleLinear()
              .domain([props.closenessExtent[0], 0,
                       props.closenessExtent[1]])
              .range(['red', 'white', 'blue'])

  var renderShapes = () => (props.assembly.features.map((d,i) => 
      (   <path
          data={d}
          key={ `path-${ i }` }
          d={ `${d3.geoPath().projection(projection)(d)}` }
          className="ed"
          fill={ `${ color(props.closeness.get(d.properties.AssemDist))}`}
        />))
 )

    return (
        <svg width={props.width} height={props.height}>
          <g className='map-layer'>
            { renderShapes() }
          </g>
        </svg>
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
