import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = ({path, name}) => (
  <NavLink to={path}>{name}</NavLink>
)

export default Header