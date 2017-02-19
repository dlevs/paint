import keyBy from 'lodash/fp/keyBy';
import mapValues from 'lodash/fp/mapValues';
import pipe from 'lodash/fp/pipe';
import pickBy from 'lodash/fp/pickBy';
import Tool from './Tool';

const mapInitialToolValues = pipe(
	keyBy(option => option.id),
	mapValues(option => option.initialValue)
);

const getInitialToolState = pipe(
	pickBy(tool => tool.options !== undefined),
	keyBy(tool => tool.id),
	mapValues((tool) => mapInitialToolValues(tool.options))
);

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
		return getInitialToolState(this.rawItems);
	}
}

