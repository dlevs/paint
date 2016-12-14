import { applyMiddleware, createStore } from 'redux';
import thunk   from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducer from './reducers';

export default createStore(
	reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(promise(), thunk)
);
