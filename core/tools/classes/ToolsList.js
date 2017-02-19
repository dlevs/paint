import keyBy from 'lodash/fp/keyBy';
import mapValues from 'lodash/fp/mapValues';
import pipe from 'lodash/fp/pipe';
import pickBy from 'lodash/fp/pickBy';
import Tool from './Tool';

export default class ToolsList {
	constructor(tools) {
		this.items = tools.map((toolDefinition) => new Tool(toolDefinition));
	}

	/**
	 * Get the tool with the specified ID.
	 *
	 * @param {String} id
	 * @returns {Tool}
	 */
	getById(id) {
		return this.items.find(tool => tool.id === id);
	}

	/**
	 * The intial redux store state is derived from the values defined for the
	 * tools. This method calculates the initial state.
	 *
	 * @returns {Object}
	 */
	get initialState() {
		const mapInitialToolValues = pipe(
			keyBy('id'),
			mapValues(({initialValue}) => initialValue)
		);

		const getInitialToolsState = pipe(
			pickBy(({options}) => options !== undefined),
			keyBy('id'),
			mapValues(({options}) => mapInitialToolValues(options))
		);

		return getInitialToolsState(this.items);
	}
}
