// Util function to help create option definitions.
//---------------------------------------------------
import createToolOptionDefinition from './util/createToolOptionDefinition';


// Components used by options
//---------------------------------------------------
import RangeInput from '../../components/formControls/RangeInput';
import EmojiSelector from '../../components/EmojiSelector';


export default {
	SIZE: createToolOptionDefinition(
		RangeInput,
		{
			label: 'Size',
			min: 1,
			max: 40
		},
		Number
	),
	FEATHER: createToolOptionDefinition(
		RangeInput,
		{
			label: 'Feather',
			min: 0,
			max: 100
		},
		Number
	),
	EMOJI: createToolOptionDefinition(
		EmojiSelector
	)
};
