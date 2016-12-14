import 'babel-polyfill';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import tools from './core/tools';

import store from './core/store';
import App from './components/App';

// TODO: check if this import is stripped from prod.
import Perf from 'react-addons-perf';
if (__DEV__) {
	window.Perf = Perf;
}

// Now that the state exists, we can initilise the tools object. This relies on
// the redux state, so must be done after the store is created.
tools.init();

ReactDOM.render(
	<ReduxProvider store={store}>
		<App/>
	</ReduxProvider>,
	document.getElementById('container')
);
