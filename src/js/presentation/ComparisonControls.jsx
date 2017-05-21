import React from 'react';

import SelectInput from 'presentation/inputs/SelectInput.jsx';

import 'styles/components/controls.scss';

const ComparisonControls = (props) => {
  return (
    <div className='o-flex-container c-box c-controls'>
      <SelectInput labelText='Date' name='datetime-filter' options={ props.dateOpts } val={ props.selectedDate } />
      <SelectInput labelText='Base Currency' name='currency-filter' options={ props.baseCurrencyOpts } val={ props.selectedCurrency } />
    </div>
  )
}

export default ComparisonControls;
