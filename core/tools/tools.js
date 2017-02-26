import ToolsList from './classes/ToolsList';

export default new ToolsList([
	{
		id: 'PENCIL',
		label: 'Pencil',
		icon: 'fa-pencil',
		// ctxProps: {
		// 	shadowBlur: 0,
		// 	lineCap: 'square'
		// },
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
	// {
	// 	id: 'BRUSH',
	// 	label: 'Brush',
	// 	icon: 'fa-paint-brush'
	// },
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
				id: 'SIZE',
				initialValue: 16
			},
			{
				id: 'EMOJI',
				initialValue: '💩'
			},
			{
				id: 'MAX_STAMP_DISTANCE',
				initialValue: 54
			}
		]
	}
]);
