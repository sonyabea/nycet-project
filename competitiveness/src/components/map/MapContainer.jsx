import React, {Component} from 'react'
import GrayscaleToggle from './GrayscaleToggle'
import { setMapDimensions } from '../../actions/index'
import ResizeContainer from '../Container.jsx'
import { Item } from 'semantic-ui-react'

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
        <Item>
          <Item.Header>
            <div id='map-top'>
              <GrayscaleToggle changeColorScale={ this.changeColorScale.bind(this) }/>
            </div>
          </Item.Header>
          <Item.Content>
            {this.props.children[0]}
            {React.cloneElement(this.props.children[1], { colorScale: this.state.colorScale })}
          </Item.Content>
        </Item>
      </ResizeContainer>
    )
   }
}

export default MapContainer;
