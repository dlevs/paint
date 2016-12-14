import toolOptions from '../toolOptions';

export default (toolId, optionId, initialValue) => (
	toolOptions[optionId](toolId, optionId, initialValue)
);
