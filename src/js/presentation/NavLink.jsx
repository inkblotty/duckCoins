import React from 'react';
import { Link } from 'react-router';

const NavLink = (props) => {
  return (
    <li className='u-no-padding'>
      <Link to={ props.to } className={  `c-btn ${ props.isActive ? 'is-active' : '' }` }>
          { props.text }
      </Link>
    </li>
  )
}

export default NavLink;