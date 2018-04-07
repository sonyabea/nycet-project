import React, {Component} from 'react'

class PlotContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    let expInfo = <ExpInfo{this.props.expInfo} />
    return <div>{expInfo}</div>
  }

}
