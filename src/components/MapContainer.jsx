import React, {Component} from 'react'
import MainMap from './map.jsx'

class MapContainer extends Component{
  constructor(props){
    super(props)
    this.state = {'width': 0, 'height': 0}
  }

  componentDidMount(){
    this.setState({'width': this.node.clientWidth,
                   'height': this.node.clientHeight})
  }

  render() {
    return (
      <div ref={node => this.node = node} className={'map-container'}>
        <div className='container-header'>Race Margins</div>
        <MainMap assembly={this.props.mapGeo}
                   closeness={this.props.mapData}
                   closenessExtent={this.props.closenessExtent}
                   width={this.state.width}
                   height={this.state.height} />
      </div>
          )
   }
}

export default MapContainer;

