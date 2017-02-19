import { setToolSetting } from '../../actions/toolSettingsActions';
import { connect } from 'preact-redux';

export default class ToolOptionDefinition {
	constructor({id, Component, props, transform}) {
		this.id = id;
		this.Component = Component;
		this.props = props;
		this.transform = transform || ((value) => value);
	}

	createConnectedComponent(toolId) {
		return connect(
			(state) => ({
				...this.props,
				value: state.toolSettings[toolId][this.id]
			}),
			(dispatch) => ({
				handleInput: (e) => {
					dispatch(
						setToolSetting(toolId, this.id, this.transform(e.target.value))
					);
				}
			})
		)(this.Component)
	}
}
