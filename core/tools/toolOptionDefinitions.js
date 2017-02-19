import keyBy from 'lodash/keyBy';


// Util classes to help create option definitions.
//---------------------------------------------------
import ToolOptionDefinition from './classes/ToolOptionDefinition';


// Components used by options
//---------------------------------------------------
import RangeInput from '../../components/_formControls/RangeInput';
import EmojiSelector from '../../components/EmojiSelector';


const optionDefinitions = [
	{
		id: 'SIZE',
		Component: RangeInput,
		props: {
			label: 'Size',
			min: 1,
			max: 40
		},
		transform: Number
	},
	{
		id: 'FEATHER',
		Component: RangeInput,
		props: {
			label: 'Feather',
			min: 0,
			max: 100
		},
		transform: Number
	},
	{
		id: 'EMOJI',
		Component: EmojiSelector
	}
].map((option) => new ToolOptionDefinition(option));

export default keyBy(optionDefinitions, 'id');
