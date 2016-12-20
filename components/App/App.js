import React, { PropTypes } from 'react';
import Toolbar from '../Toolbar';
import Canvas from '../Canvas';
import style from './App.css';
import EmojiSelector from '../EmojiSelector';

export default () => (
	<main className={style.mainContainer}>
		<div className={style.paintAreaContainer}>
			<Toolbar />
			<Canvas />
		</div>
		<EmojiSelector />
	</main>
);
