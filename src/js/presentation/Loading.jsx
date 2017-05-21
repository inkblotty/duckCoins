import React from 'react';

import Spinner from 'images/spinner.png';
import 'styles/components/loading.scss';

const Loading = (props) => {
  return (
    <img src={ Spinner } alt='This section is loading.' className='c-loading' />
  )
}

export default Loading;