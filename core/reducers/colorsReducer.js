// TODO: put actions in reducer file.

import { createReducer } from '../util';
import { SET_COLOR, SWITCH_COLORS } from '../actions/colorsActions';

export default createReducer(
	{
		[SET_COLOR]: (state, action, {type, value}) => ({
			...state,
			[type]: value
		}),
		[SWITCH_COLORS]: (state) => ({
			primary: state.secondary,
			secondary: state.primary
		})
	},
	{
		primary: '#18a6ff',
		secondary: '#ffffff'
	}
);
