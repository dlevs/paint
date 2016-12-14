import _ from 'lodash';
import Tool from './Tool';

export default class ToolsList {
	constructor(tools) {
		// Add as raw list. Components are not created yet, so the raw data
		// can populate the store, which the components rely on on init.
		this.rawItems = tools;
	}

	init() {
		this.items = this.rawItems.map(
			(toolDefinition) => new Tool(toolDefinition)
		);
		return this;
	}

	getById(id) {
		return this.items.find(tool => tool.id === id);
	}

	get initialState() {
		return _(this.rawItems)
			.pickBy(tool => tool.options !== undefined)
			.keyBy(tool => tool.id)
			.mapValues(tool => (
					_(tool.options)
						.keyBy(option => option.id)
						.mapValues(option => option.initialValue)
						.value()
				)
			)
			.value();
	}
}
