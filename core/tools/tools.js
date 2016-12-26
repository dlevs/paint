import { h } from 'preact';
import ToolsList from './util/ToolsList';

export default new ToolsList([
	{
		id: 'PENCIL',
		label: 'Pencil',
		icon: 'fa-pencil',
		options: [
			{
				id: 'SIZE',
				initialValue: 4
			},
			{
				id: 'FEATHER',
				initialValue: 0
			}
		]
	},
	{
		id: 'ERASER',
		label: 'Eraser',
		icon: 'fa-eraser',
		options: [
			{
				id: 'SIZE',
				initialValue: 4
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
		options: [
			{
				id: 'EMOJI'
			}
		]
	}
]);
