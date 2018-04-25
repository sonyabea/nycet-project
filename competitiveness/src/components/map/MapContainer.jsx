import React, {Component} from 'react'
import GrayscaleToggle from './GrayscaleToggle'
import { setMapDimensions } from '../../actions/index'
import ResizeContainer from '../Container.jsx'

class MapContainer extends Component{
  constructor(props){
    super(props)
    this.state = {
      'colorScale': 'grey'
    }
  }
  changeColorScale(grayScale){
    let scale = grayScale ? 'gray' : 'rgb'
    this.setState({'colorScale': scale})
  }

  render() {
    return (
        <ResizeContainer resizeFunction={ setMapDimensions }>
          <GrayscaleToggle changeColorScale={this.changeColorScale.bind(this)} />
          {React.cloneElement(this.props.children, { colorScale: this.state.colorScale})}
        </ResizeContainer>
    )
   }
}

export default MapContainer;
