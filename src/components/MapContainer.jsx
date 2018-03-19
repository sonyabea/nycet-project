import React, {Component} from 'react'

class MapContainer extends Component{
  constructor(props){
    super(props)
    this.state = {'width': 0, 'height': 0}
    this.resize = this.resize.bind(this)
  }

  resize(){
    let containerWidth = this.state.width
    let shouldResize = this.node.clientWidth !== containerWidth
    //this has some SILLY side effects, fix later
    if (shouldResize) {
      this.setState({'width': this.node.clientWidth,
                   'height': this.node.clientHeight})
      }
      
  }

  componentDidMount(){
    this.resize()
    window.addEventListener('resize', this.resize)
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

