import { h } from 'preact';
import ColorPicker from './components/ColorPicker';
import ToolPicker from './components/ToolPicker';
import CurrentToolOptions from './components/CurrentToolOptions';
import style from './Toolbar.css';


export default () => (
	<div class={style.container}>
		<ToolPicker />
		<CurrentToolOptions />
		<ColorPicker />
	</div>
);
