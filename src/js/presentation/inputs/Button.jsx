import React from 'react';

const Button = (props) => {
	return (
		<button className={ `c-button--default ${props.className}` } onClick={ props.onClick }>
			{ props.text }
		</button>
	)
}

export default Button;