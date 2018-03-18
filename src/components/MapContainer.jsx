import React from 'react'
import MainMap from './map.jsx'

const MapContainer = (props) => (
        <MainMap assembly={props.mapGeo}
                 closeness={props.mapData}
                 closenessExtent={props.closenessExtent}
                 width={800}
                 height={500} />
               )

export default MapContainer;

