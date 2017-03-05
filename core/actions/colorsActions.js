import { createAction } from '../util';


// Action Types
//-----------------------------------------------------
export const SET_COLOR = 'SET_COLOR';
export const SWITCH_COLORS = 'SWITCH_COLORS';


// Action Creators
//-----------------------------------------------------
// TODO: Export these only as "actions", clean up usage in components
export const setColor = createAction(
	SET_COLOR,
	(type, value) => ({type, value})
);
export const switchColors = createAction(SWITCH_COLORS);

export const actions = {setColor, switchColors};
