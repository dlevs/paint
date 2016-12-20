import React from 'react';
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
		],
		Visualisation: ({SIZE, FEATHER}) => {
			const size = Math.round(SIZE - (SIZE * (FEATHER / 100))) || 1;
			const blur = SIZE - size;

			return (
				<div
					style={{
						height: SIZE + 'px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					<div
						style={{
							borderRadius: '100%',
							display: 'block',
							backgroundColor: '#000',
							width: size + 'px',
							height: size + 'px',
							boxShadow: `0 0 ${blur}px ${size}px #000`,
							margin: '0px auto'
						}}
					/>
				</div>
			)
		}
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
