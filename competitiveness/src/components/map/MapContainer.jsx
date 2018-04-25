import React, {Component} from 'react'
import GrayscaleToggle from './GrayscaleToggle'
import { setMapDimensions } from '../../actions/index'
import ResizeContainer from '../Container.jsx'

class MapContainer extends Component{
  constructor(props){
    super(props)
    this.state = {
      'colorScale': 'gray'
    }
  }

  changeColorScale(grayScale){
    let scale = grayScale ? 'gray' : 'rgb'
    this.setState({'colorScale': scale})
  }

  render() {
    return (
      <ResizeContainer resizeFunction={setMapDimensions}>
        <div id='map-top'>

          <GrayscaleToggle changeColorScale={ this.changeColorScale.bind(this) }/>
          {this.props.children[0]}

        </div>
        {React.cloneElement(this.props.children[1], { colorScale: this.state.colorScale })}
      </ResizeContainer>
    )
   }
}

export default MapContainer;
