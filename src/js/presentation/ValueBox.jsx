import React from 'react';

import { dateFormatHuman } from 'helpers/formatters.js';

const ValueBox = (props) => {
  let { date, sources } = props;
  let valList = Object.keys(sources).map((source) => {
    let rows = Object.keys(source).map((coinName, i) => {
      <li>
        { coinName }: source.coinName
      </li>
    });

    return (
      <li>
        <h4>{ source }:</h4>
        <ul>
          { rows }
        </ul>
      </li>
    )
  })
  return (
    <div className='c-box'>
      <h3>{ date != 'latest' ? dateFormatHuman(date) : date } Values</h3>
      <ul>
        { valList }
      </ul>
    </div>
  )
}

export default ValueBox;