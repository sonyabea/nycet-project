import React, {Component} from 'react'

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
      <div ref={node => this.node = node} className='map-container'
        onMouseLeave={(e) => this.props.clearTooltip}>
        <div className='container-header'>Race Margins</div>
          {React.cloneElement(this.props.children, {...this.state})}
      </div>
          )
   }
}

export default MapContainer;

