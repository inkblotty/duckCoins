import React from 'react';

import { dateFormatHuman } from 'helpers/formatters.js';

import 'styles/components/box.scss';

const ValueBox = (props) => {
  let { date, sources } = props;
  let valList = Object.keys(sources).map((source, indx) => {
    let rows = Object.keys(sources[source]).map((coinName, i) => {
      return (
        <li key={ `coinVal-${i}` }>
          { coinName }: { sources[source][coinName] }
        </li>
      );
    });

    return (
      <li key={ `source-${indx}-${source}` }>
        <h4 className='u-left-align'>{ source }:</h4>
        <ul>
          { rows }
        </ul>
      </li>
    )
  });
  return (
    <div className='c-box c-box--val'>
      <h3 className='u-left-align'>{ date ? dateFormatHuman(new Date(date)) : 'Latest' }</h3>
      <ul>
        { valList }
      </ul>
    </div>
  )
}

export default ValueBox;