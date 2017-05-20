import React from 'react';
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router';

import FourOhFour from './pages/FourOhFour.jsx';
import HomeContainer from './containers/HomeContainer.jsx';

import '../styles/main.scss';

const AppRouter = () => {
	return (
		<Router history={ browserHistory }>
			<Route path='/'>
				<IndexRedirect to='/home' />
				<Route path='home' component={ HomeContainer } />
				<Route path='**' component={ FourOhFour } />
			</Route>
		</Router>
	)
}

export default AppRouter;