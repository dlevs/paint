import 'babel-polyfill';
import 'whatwg-fetch';

import { h, render } from 'preact';
import { Provider as ReduxProvider } from 'preact-redux';
import tools from './core/tools';

import store from './core/store';
import App from './components/App';

// Now that the state exists, we can initilise the tools object. This relies on
// the redux state, so must be done after the store is created.
tools.init();

render(
	<ReduxProvider store={store}>
		<App/>
	</ReduxProvider>,
	document.body
);
