import React, {Component} from 'react'
import { connect } from 'react-redux';

class ContainerComponent extends Component{
  constructor(props){
    super(props)
    this.getDimensions = this.getDimensions.bind(this)
  }

  //this is busted; when you get a chance, figure out a way to be responsive here
  getDimensions(){
    if (this.node === null) {return;}
    else {
      let nodeWidth = this.node.getBoundingClientRect().width
      let nodeHeight = this.node.getBoundingClientRect().height
      let shouldResize = nodeWidth !== this.props.width ||
                         nodeHeight !== this.props.height
      if (shouldResize) {
        this.props.resize(nodeWidth, nodeHeight)
      }
    }
  }

  componentS

  componentDidMount(){
    this.getDimensions()
    window.addEventListener('resize', this.getDimensions)
  }

  render() {
    return (
      <div ref={node => this.node = node} className='size-container'
        style={{width: '100%',
                height: '100%',
                padding: 0}}>
        {this.props.children}
      </div>
    )
   }
}

const mapDispatchToProps = (dispatch, ownProps) => (
  {resize: (width, height) => dispatch(
      ownProps.resizeFunction(width, height))}
)

const mapStateToProps = (state) => (
  {width: state.mapDimensions[0],
   height: state.mapDimensions[1]}
)

const ResizeContainer = connect(mapStateToProps, mapDispatchToProps)(ContainerComponent)

export default ResizeContainer;

