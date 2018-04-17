import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class MainMenu extends Component {

  render() {
    const { location } = this.props
    let menuItems = this.props.linksInfo.map(l =>
      <Menu.Item key={l.name}
        name={l.name}
        as={Link}
        to={l.path}
        active={location.pathname === l.path}
      >
        {l.name}
      </Menu.Item>
    )

    return (
      <Segment inverted>
        <Menu inverted pointing secondary size='massive'>{menuItems}</Menu>
      </Segment>
    )
  }

}

const MainMenuWithRouter = withRouter(MainMenu)
export default MainMenuWithRouter
