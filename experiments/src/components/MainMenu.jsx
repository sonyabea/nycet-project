import React from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const MainMenu = ({linksInfo}) => {
  let menuItems = linksInfo.map(l =>
    <Menu.Item key={l.name} name={l.name} as={Link} to={l.path}>
      {l.name}
    </Menu.Item>
  )
  return <Segment inverted><Menu inverted pointing secondary size='massive'>{menuItems}</Menu></Segment>
}

export default MainMenu
