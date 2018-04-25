import React, {Component} from 'react'
import GrayscaleToggle from './GrayscaleToggle'
import { OfficeDropdownContainer } from './DropdownContainer.jsx'
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
          <OfficeDropdownContainer style={{'float': 'left'}}/>
        </div>
        {React.cloneElement(this.props.children, { colorScale: this.state.colorScale })}
      </ResizeContainer>
    )
   }
}

export default MapContainer;
