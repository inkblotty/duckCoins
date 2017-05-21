import React from 'react';

import Loading from 'presentation/Loading';

import 'styles/components/buttons.scss';

const Button = (props) => {
  let { className, loading, onClick, text } = props;
  return (
   <button className={ `o-flex-container c-btn ${className ? className : ''}` } onClick={ onClick }>
    { loading ?
      <Loading /> : '' }
    { text }
   </button>
  )
}

export default Button;