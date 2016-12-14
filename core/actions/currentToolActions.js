import { createAction } from '../util';


// Action Types
//-----------------------------------------------------
export const SET_TOOL = 'SET_TOOL';


// Action Creators
//-----------------------------------------------------
export const setTool = createAction(
	SET_TOOL,
	(data) => data
);
