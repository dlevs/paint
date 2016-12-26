import { h } from 'preact';
import Toolbar from '../Toolbar';
import Canvas from '../Canvas';
import style from './App.css';
import EmojiSelector from '../EmojiSelector';

export default () => (
	<main class={style.mainContainer}>
		<div class={style.paintAreaContainer}>
			<Toolbar />
			<Canvas />
		</div>
		<EmojiSelector />
	</main>
);
