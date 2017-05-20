import React from 'react';

import 'styles/components/buttons.scss'; // gross path name

const Button = (props) => {
  return (
   <button className={ `c-button ${props.className}` } onClick={ props.onClick }>
     { props.loading ?
      LoadingGif : '' }
     { props.text }
   </button>
  )
}

export default Button;