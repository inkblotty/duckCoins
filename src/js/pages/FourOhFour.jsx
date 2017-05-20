import React from 'react';
import { Link } from 'react-router';

import Button from '../presentation/inputs/Button.jsx';

const FourOhFour = () => {
	return (
		<div>
			<h1>404</h1>
			<h3>Looks like you took a wrong turn</h3>
			<Link to='/home'>
				<Button text='Take me to the homepage' />
			</Link>
		</div>
	)
}

export default FourOhFour;