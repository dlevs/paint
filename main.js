import 'babel-polyfill';

import { h, render } from 'preact';
import { Provider as ReduxProvider } from 'preact-redux';

import store from './core/store';
import App from './containers/App';

render(
	<ReduxProvider store={store}>
		<App/>
	</ReduxProvider>,
	document.body
);
