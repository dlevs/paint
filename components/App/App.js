import { h } from 'preact';
import Toolbar from '../Toolbar';
import Canvas from '../Canvas';
import style from './App.css';

export default () => (
	<main class={style.mainContainer}>
		<div class={style.paintAreaContainer}>
			<Toolbar />
			<Canvas />
		</div>
	</main>
);
