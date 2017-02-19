export const createAction = (actionType, payloadCreator) => (...args) => ({
	type: actionType,
	payload: payloadCreator ? payloadCreator(...args) : args[0]
});

export const createReducer = (actionHandlers, defaultState) => {
	return (state = defaultState, action) => {

		if (action && actionHandlers[action.type]) {
			return actionHandlers[action.type](state, action, action.payload || {});
		}

		return state;
	};
};

export const generateId = (prefix) => {
	const count = generateId[prefix] = (generateId[prefix] || 0) + 1;
	return prefix + count;
};

export const assert = (condition, message = 'Assertion failed') => {
	if (condition !== true) {
		throw new Error(message);
	}
};

export const getRelativeCoordsOfEvent = ({target, clientX, clientY}) => {
	const rect = target.getBoundingClientRect();
	return {
		x: clientX - rect.left,
		y: clientY - rect.top
	}
};
