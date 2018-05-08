import React from 'react';
import * as d3 from 'd3';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import MapDistrict from './MapDistrict';
import { hideTooltip } from '../../actions/index'

const Map = ({mapWidth, mapHeight, mapComponents,
             parentDist, drillDown, location, colorScale,
             hideTooltip}) => {
  
  let windowHeight = (typeof(mapHeight) === 'undefined') ? 600 : mapHeight;
  let windowWidth = (typeof(mapWidth) === 'undefined') ? 800 : mapWidth;
  let margin = {top: 50, right: 15, bottom: 20, left: 30}
  let width = windowWidth - margin.left - margin.right
  let height = windowHeight - margin.top - margin.bottom


  let projection = d3.geoIdentity()
                 .reflectY(true)
                 .fitSize([width,height], mapComponents.geoJson)

  let closenessExtent = [-100, 100]

  let colorScaleVals = colorScale === 'gray' ? ['#996666', 'white', '#996666'] : ['red', 'white', 'blue']

  let color = d3.scaleLinear()
              .domain([closenessExtent[0], 0,
                       closenessExtent[1]])
              .range(colorScaleVals)

  let renderedShapes = mapComponents.geoJson.features.map((d,i) => {
      let geoDataPoint = mapComponents.geoData.get(d.properties.districtNumber)
      
        return (
        <CSSTransition key={`district-${d.properties.districtNumber}-fill-${color(geoDataPoint)}`}
          classNames='district'
          timeout={{ enter: 500, exit: 500 }}>
          <MapDistrict
            d={d}
            projection={ `${d3.geoPath().projection(projection)(d)}` }
            fill={ (typeof geoDataPoint === 'undefined') ? 'grey' :  `${ color(geoDataPoint)}`}
            margin={mapComponents.geoData.get(d.properties.districtNumber)}
            className='district'
         />
        </CSSTransition>     
        )
  }
)

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
        <svg width={windowWidth} height={windowHeight} onMouseLeave={hideTooltip}>
          <g className='map-layer' transform={`translate(${margin.left},${margin.top})`}
            height={height} width={width}>
            <TransitionGroup component='g'>
              { renderedShapes }
            </TransitionGroup>
          </g>
        <svg dangerouslySetInnerHTML={glowFilter()} />
        </svg>
      </div>
    )
}

const mapStateToProps = (state) => ({
  mapWidth: state.mapDimensions[0],
  mapHeight: state.mapDimensions[1],
  parentDist: state.districtType})

const DataMap = connect(mapStateToProps, {hideTooltip: hideTooltip})(Map)

export default DataMap
