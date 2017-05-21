import React from 'react';

import Nav from 'presentation/Nav.jsx';

import 'styles/main.scss';

class AppContainer extends React.Component {

  render() {
    let { children, ...routerProps } = this.props;
    let inside = [];

    if (this.props.children) {
      inside = React.Children.map(children, (child, index) => {
        return React.cloneElement(child, { ...routerProps });
      });
    }

    return (
      <div className='u-full-width'>
        <Nav { ...routerProps } />
        { children }
      </div>
    )
  }
}

export default AppContainer;