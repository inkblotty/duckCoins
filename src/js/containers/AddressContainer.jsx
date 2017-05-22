import React from 'react';

class AddressContainer extends React.Component {
  render() {
    return (
      <div className='o-flex-container o-content-container'>
        <div className='c-box'>
          <h3>Addresses</h3>
          <div className='u-huey-underline'>
            Huey:
          </div>
          <div className='u-duey-underline'>
            Duey:
          </div>
          <div className='u-louie-underline'>
            Louie:
          </div>
        </div>
      </div>
    )
  }
}

export default AddressContainer;