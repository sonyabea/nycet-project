import React from 'react';
const d3 = require('d3');

class Axis extends React.Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    var node = this.refs.axis;
    d3.select(node).call(this.props.axis);
  }

  render() {
    return <g className="axis" ref="axis" transform={this.props.translate} />
  }
}

export default Axis;
