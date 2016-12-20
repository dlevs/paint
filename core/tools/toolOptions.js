// Util function to help create option definitions.
//---------------------------------------------------
import createToolOptionDefinition from './util/createToolOptionDefinition';
import React from 'react';


// Components used by options
//---------------------------------------------------
import RangeInput from '../../components/formControls/RangeInput';

const emojis = [
	'😀',
	'😃',
	'😄',
	'😁',
	'😆',
	'😅',
	'😂',
	'😊',
	'😇',
	'🙂',
	'🙃',
	'😉',
	'😌',
	'😍',
	'😘',
	'😗',
	'😙',
	'😚',
	'😋',
	'😜',
	'😝',
	'😛',
	'🤑',
	'🤗',
	'🤓',
	'😎',
	'😏',
	'😒',
	'😞',
	'😔',
	'😟',
	'😕',
	'🙁',
	'😣',
	'😖',
	'😫',
	'😩',
	'😤',
	'😠',
	'😡',
	'😶',
	'😐',
	'😑',
	'😯',
	'😦',
	'😧',
	'😮',
	'😲',
	'😵',
	'😳',
	'😱',
	'😨',
	'😰',
	'😢',
	'😥',
	'😭',
	'😓',
	'😪',
	'😴',
	'🙄',
	'🤔',
	'😬',
	'🤐',
	'😷',
	'🤒',
	'🤕',
	'😈',
	'👿',
	'👹',
	'👺',
	'💩',
	'👻',
	'💀',
	'👽',
	'👾'
];

const EmojiList = () => (
	<ul>
		{emojis.map(emoji => (
			<li key={emoji}>{emoji}</li>
		))}
	</ul>
);

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
		EmojiList
	)
};
