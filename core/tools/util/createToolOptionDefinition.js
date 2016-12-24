import { h } from 'preact';
import { setToolSetting } from '../../actions/toolSettingsActions';
import { connect } from 'preact-redux';
import { noop } from  './../../util';

const connectToolOption = (toolId, optionId, initialValue, component, props = {}, transformValue = noop) => (
	connect(
		(state) => ({
			...props,
			value: state.toolSettings[toolId][optionId]
		}),
		(dispatch) => ({
			handleChange: (e) => {
				dispatch(
					setToolSetting(toolId, optionId, transformValue(e.target.value))
				);
			}
		})
	)(component)
);

export default (...args) => (
	(toolId, optionId, initialValue) => ({
		id: optionId,
		Component: connectToolOption(toolId, optionId, initialValue, ...args),
		initialValue
	})
);
