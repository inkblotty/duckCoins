import React from 'react';

import 'styles/components/inputs.scss';

const SelectInput = (props) => {
  console.log(props);
  let { labelText, name, options, val } = props;
  let opts = options.map((opt, i) => {
    return <option key={ `${name}-opt-${i}` } value={ opt }>{ opt }</option>
  });
  return (
    <label htmlFor={ name }>
      { labelText }
      <select name={ name } id={ name } className='c-input--select'>
        { opts }
      </select>
    </label>
  )
}

export default SelectInput;
