import { createReducer } from '../util';
import { SET_TOOL } from '../actions/currentToolActions';

export default createReducer(
	{
		[SET_TOOL]: (state, action) => action.payload
	},
	'PENCIL'
);
