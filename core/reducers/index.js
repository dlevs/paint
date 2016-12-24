import { combineReducers } from 'redux';

import colors from './colorsReducer';
import currentTool from './currentToolReducer';
import toolSettings from './toolSettingsReducer';

export default combineReducers({
	colors,
	currentTool,
	toolSettings
});
