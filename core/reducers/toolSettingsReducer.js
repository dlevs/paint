import { createReducer } from '../util';
import { SET_TOOL_SETTING } from '../actions/toolSettingsActions';
import tools from '../tools';


export default createReducer(
	{
		[SET_TOOL_SETTING]: (state, action, {tool, setting, value}) => ({
			...state,
			[tool]: {
				...state[tool],
				[setting]: value
			}
		})

	},
	tools.initialState
);
