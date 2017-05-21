import React from 'react';

import NavLink from 'presentation/NavLink';

import hdl from 'images/hueyDueyLouie.png';

import 'styles/components/logo.scss';
import 'styles/components/navigation.scss';

const Nav = (props) => {
  let { className, location } = props;
  return (
    <nav className={ `c-nav ${ className ? className : '' }` }>
      <h1 className='c-logo'>
        Duck Coins
        <img src={ hdl } alt='Huey, Duey, and Louie ducks' />
      </h1>
      <ul className='o-flex-container u-justify-between u-align-center--vertical'>
        <NavLink to='/' text='Home' isActive={ location.pathname === '/' } />
        <NavLink to='/address' text='Addresses' isActive={ location.pathname === '/address' } />
      </ul>
    </nav>
  )
}

export default Nav;