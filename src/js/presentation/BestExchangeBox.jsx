import React from 'react';

const BestExchangeBox = (props) => {
  return (
    <div className='c-box c-box--val'>
      <h3 className='u-left-align'>Best exchanges</h3>
      <h4 className='u-left-align'>
        Buy:
      </h4>
      <ul>
        <li>BTC: { props.btc_lowest[1] }</li>
        <li>DASH: { props.dash_lowest[1] }</li>
        <li>ETH: { props.eth_lowest[1] }</li>
        <li>LTC: { props.ltc_lowest[1] }</li>
      </ul>
      <h4 className='u-left-align'>
        Sell:
      </h4>
      <ul>
        <li>BTC: { props.btc_highest[1] }</li>
        <li>DASH: { props.dash_highest[1] }</li>
        <li>ETH: { props.eth_highest[1] }</li>
        <li>LTC: { props.ltc_highest[1] }</li>
      </ul>
    </div>
  )
}

export default BestExchangeBox;
