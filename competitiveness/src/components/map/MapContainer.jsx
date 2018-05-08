import React, {Component} from 'react'
import GrayscaleToggle from './GrayscaleToggle'
import { setMapDimensions } from '../../actions/index'
import ResizeContainer from '../Container.jsx'
import { Item, Grid } from 'semantic-ui-react'

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
            <Grid columns={ 2 } >
              <Grid.Column style={{height: "100%"}}>
                <GrayscaleToggle changeColorScale={ this.changeColorScale.bind(this) }/>
              </Grid.Column>
              <Grid.Column>
                {this.props.children[0]}
              </Grid.Column>
            </Grid>
          </Item.Header>
          <Item.Content>
            {React.cloneElement(this.props.children[1], { colorScale: this.state.colorScale })}
          </Item.Content>
        </Item>
      </ResizeContainer>
    )
   }
}

export default MapContainer;
