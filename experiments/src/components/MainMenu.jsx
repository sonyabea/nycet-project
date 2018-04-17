import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class MainMenu extends Component {
  constructor (props) {
    super(props)

    this.state = {
      activeItem: this.props.linksInfo[0]
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    let menuItems = this.props.linksInfo.map(l =>
      <Menu.Item key={l.name}
        name={l.name}
        as={Link}
        to={l.path}
        active={this.state.activeItem === l.name}
        onClick={this.handleItemClick}
      >
        {l.name}
      </Menu.Item>
    )

    return  (
      <Segment inverted>
        <Menu inverted pointing secondary size='massive'>{menuItems}</Menu>
      </Segment>
    )
  }

}

export default MainMenu
