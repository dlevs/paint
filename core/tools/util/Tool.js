import createToolOption from './createToolOption';

export default class Tool {
	constructor({options, ...otherProps}) {
		Object.assign(this, otherProps)

		if (options) {
			this.options = options.map(({id, initialValue}) => (
				createToolOption(
					// Tool ID (e.g. 'PENCIL')
					this.id,

					// Option ID (e.g. 'SIZE')
					id,

					// Initial value (e.g. 4)
					// Used to populate inital state in the redux reducer
					initialValue
				)
			))
		}
	}
}
