import React from 'react';
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router';

import AddressContainer from 'containers/AddressContainer.jsx';
import AppContainer from 'containers/AppContainer.jsx';
import ComparisonContainer from 'containers/ComparisonContainer.jsx';
import FourOhFour from 'pages/FourOhFour.jsx';

import 'styles/main.scss';

const AppRouter = () => {
  return (
   <Router history={ browserHistory }>
     <Route path='/' component={ AppContainer }>
        <IndexRoute component={ ComparisonContainer } />
        <Route path='address' component={ AddressContainer } />
        <Route path='**' component={ FourOhFour } />
    </Route>
    <Route path='**' component={ FourOhFour } />
   </Router>
  )
}

export default AppRouter;