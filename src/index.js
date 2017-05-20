import 'file?name=index.html!./index.html';
import React from 'react';
import ReactDOM from 'react-dom';

import AppRouter from './js/AppRouter.jsx';

var docRoot = document.getElementById('root');

ReactDOM.render(<AppRouter />, docRoot);