import keyBy from 'lodash/keyBy';


// Util classes to help create option definitions.
//---------------------------------------------------
import ToolOptionDefinition from './classes/ToolOptionDefinition';


// Components used by options
//---------------------------------------------------
import RangeInput from '../../components/_formControls/RangeInput';
import SelectInput from '../../components/_formControls/SelectInput';
import EmojiSelector from '../../components/EmojiSelector';


const optionDefinitions = [
	{
		id: 'SIZE',
		Component: RangeInput,
		props: {
			label: 'Size',
			min: 1,
			max: 200
		},
		transform: Number
	},
	{
		id: 'COMPOSITE_OPERATION',
		Component: SelectInput,
		props: {
			label: 'Blend Mode',
			options: [
				'source-over',
				'source-in',
				'source-out',
				'source-atop',
				'destination-over',
				'destination-in',
				'destination-out',
				'destination-atop',
				'lighter',
				'copy',
				'xor',
				'multiply',
				'screen',
				'overlay',
				'darken',
				'lighten',
				'color-dodge',
				'color-burn',
				'hard-light',
				'soft-light',
				'difference',
				'exclusion',
				'hue',
				'saturation',
				'color',
				'luminosity'
			]
		}
	},
	{
		id: 'HARDNESS',
		Component: RangeInput,
		props: {
			label: 'Hardness',
			step: 0.01,
			min: 0,
			max: 1
		},
		transform: Number
	},
	{
		id: 'OPACITY',
		Component: RangeInput,
		props: {
			label: 'Opacity',
			step: 0.01,
			min: 0,
			max: 1
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
	},
	{
		id: 'MAX_STAMP_DISTANCE',
		Component: RangeInput,
		props: {
			label: 'Max Stamp Distance',
			min: 1,
			max: 200
		},
		transform: Number
	}
].map((option) => new ToolOptionDefinition(option));

export default keyBy(optionDefinitions, 'id');
