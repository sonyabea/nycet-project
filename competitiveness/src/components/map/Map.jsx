import { connect } from 'react-redux';
import MapDistrict from './MapDistrict';
import { hideTooltip } from '../../actions/index'
const React = require('react');
const d3 = require('d3');

const Map = ({mapWidth, mapHeight, mapComponents,
             parentDist, drillDown, location, colorScale,
             hideTooltip}) => {

  let projection = d3.geoIdentity()
                 .reflectY(true)
                 .fitSize([mapWidth,mapHeight], mapComponents.geoJson)

  let closenessExtent = [-100, 100]

  let colorScaleVals = colorScale === 'gray' ? ['green', 'white', 'green'] : ['red', 'white', 'blue']

  let color = d3.scaleLinear()
              .domain([closenessExtent[0], 0,
                       closenessExtent[1]])
              .range(colorScaleVals)

  let renderedShapes = mapComponents.geoJson.features.map((d,i) => (
        <MapDistrict key={`district-${i}`}
          d={d}
          projection={ `${d3.geoPath().projection(projection)(d)}` }
          fill={ `${ color(mapComponents.geoData.get(d.properties.districtNumber))}`}
          margin={mapComponents.geoData.get(d.properties.districtNumber)}
        />
        ))

  let glowFilter = () => ({__html: 
      `<defs>
          <filter id="glow" x="-5000%" y="-5000%" width="10000%" height="10000%">
            <feFlood result="flood" flood-color="#ff7f00" flood-opacity="1"></feFlood>
            <feComposite in="flood" result="mask" in2="SourceGraphic" operator="in"></feComposite>
            <feMorphology in="mask" result="dilated" operator="dilate" radius="2"></feMorphology>
            <feGaussianBlur in="dilated" result="blurred" stdDeviation="5"></feGaussianBlur>
            <feMerge>
              <feMergeNode in="blurred"></feMergeNode>
              <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
          </filter>
          <pattern id="pattern-stripe" 
                    width="4" height="4" 
                    patternUnits="userSpaceOnUse"
                    patternTransform="rotate(45)">
                    <rect width="2" height="4" transform="translate(0,0)" fill="white"></rect>
          </pattern>
          <mask id="mask-stripe">
            <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-stripe)" />
          </mask>      
        </defs>`})

    return (
      <div className='map-frame'>
        <svg width={mapWidth} height={mapHeight} onMouseLeave={hideTooltip}>
          <g className='map-layer'>
            { renderedShapes }
          </g>
        <svg dangerouslySetInnerHTML={glowFilter()} />
        </svg>
      </div>
    )
}

const mapStateToProps = (state) => ({
  mapWidth: state.mapDimensions[0],
  mapHeight: state.mapDimensions[1],
  parentDist: state.districtType,
  county: state.highlightedEdData.county})

const DataMap = connect(mapStateToProps, {hideTooltip: hideTooltip})(Map)

export default DataMap
