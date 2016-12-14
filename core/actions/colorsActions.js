import { createAction } from '../util';


// Action Types
//-----------------------------------------------------
export const SET_COLOR = 'SET_COLOR';
export const SWITCH_COLORS = 'SWITCH_COLORS';


// Action Creators
//-----------------------------------------------------
export const setColor = createAction(
	SET_COLOR,
	(type, value) => ({type, value})
);
export const switchColors = createAction(SWITCH_COLORS);
