import ToolsList from './classes/ToolsList';

import Brush from '../canvas/brushes/Brush';
import Emoji from '../canvas/brushes/Emoji';
import Eraser from '../canvas/brushes/Eraser';

export default new ToolsList([
	{
		id: 'PENCIL',
		label: 'Pencil',
		icon: 'fa-pencil',
		brush: Brush,
		options: [
			{
				id: 'SIZE',
				initialValue: 20
			},
			{
				id: 'HARDNESS',
				initialValue: 1
			},
			{
				id: 'COMPOSITE_OPERATION',
				initialValue: 'source-over'
			}
		]
	},
	{
		id: 'ERASER',
		label: 'Eraser',
		icon: 'fa-eraser',
		brush: Eraser,
		options: [
			{
				id: 'SIZE',
				initialValue: 20
			},
			{
				id: 'HARDNESS',
				initialValue: 1
			}
		]
	},
	{
		id: 'BRUSH',
		label: 'Brush',
		icon: 'fa-paint-brush'
	},
	{
		id: 'EYEDROPPER',
		label: 'Eyedropper',
		icon: 'fa-eyedropper'
	},
	{
		id: 'TEXT',
		label: 'Text',
		icon: 'fa-font'
	},
	{
		id: 'ZOOM',
		label: 'Zoom',
		icon: 'fa-search'
	},
	{
		id: 'EMOJI',
		label: 'Emoji',
		icon: 'fa-smile-o',
		brush: Emoji,
		options: [
			{
				id: 'SIZE',
				initialValue: 20
			},
			{
				id: 'EMOJI',
				initialValue: '💩'
			},
			{
				id: 'MAX_STAMP_DISTANCE',
				initialValue: 54
			},
			{
				id: 'OPACITY',
				initialValue: 1
			}
		]
	}
]);
