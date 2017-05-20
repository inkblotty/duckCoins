import React from 'react';
import { Link } from 'react-router';

import Button from '../presentation/inputs/Button.jsx';

import '../../styles/main.scss';

const FourOhFour = () => {
  return (
   <div className='o-flex-container u-align-center--horizontal'>
     <h1 className='u-xxx-large'>404</h1>
     <h3>Looks like you took a wrong turn</h3>
     <Link to='/home'>
      <Button text='Take me to the homepage' />
     </Link>
   </div>
  )
}

export default FourOhFour;