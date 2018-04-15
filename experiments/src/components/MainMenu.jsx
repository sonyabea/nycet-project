import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const MainMenu = ({linksInfo}) => {
  let menuItems = linksInfo.map(l => 
    <Menu.Item name={l.name} as={Link} to={l.path}>
      {l.name}
    </Menu.Item>
  )
  return <Menu size='massive'>{menuItems}</Menu>
}

export default MainMenu
