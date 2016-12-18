import React, { PropTypes } from 'react';
import Toolbar from '../Toolbar';
import Canvas from '../Canvas';
import style from './App.css';

export default () => (
	<main className={`fullscreen ${style.container}`}>
		<Toolbar />
		<Canvas />
	</main>
);
