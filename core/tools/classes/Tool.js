import toolOptionDefinitions, { getById } from '../toolOptionDefinitions';

export default class Tool {
	constructor({id, label, icon, options, brush}) {
		this.id = id;
		this.label = label;
		this.icon = icon;
		this.brush = brush;

		if (options) {
			this.options = options.map(({id, initialValue}) => {
				const optionId = id;
				const toolId = this.id;
				const optionDefintion = toolOptionDefinitions[optionId];

				return {
					id: optionId,
					Component: optionDefintion.createConnectedComponent(toolId),
					initialValue
				};
			})
		}
	}
}
