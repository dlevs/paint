import { createAction } from '../util';


// Action Types
//-----------------------------------------------------
export const SET_TOOL_SETTING = 'SET_TOOL_SETTING';


// Action Creators
//-----------------------------------------------------
export const setToolSetting = createAction(
	SET_TOOL_SETTING,
	(tool, setting, value) => ({tool, setting, value})
);
