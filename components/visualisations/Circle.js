import React from 'react';

export default ({style}) => (
	<div
		style={
			{
				borderRadius: '100%',
				display: 'inline-block',
				backgroundColor: '#000',
				...style
			}}
	/>
)
