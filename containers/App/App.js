import { h } from 'preact';
import Toolbar from '../Toolbar';
import Canvas from '../Canvas';
import s from './App.css';

export default () => (
	<main class={s.mainContainer}>
		<div class={s.paintAreaContainer}>
			<Toolbar />
			<Canvas />
		</div>
	</main>
);
