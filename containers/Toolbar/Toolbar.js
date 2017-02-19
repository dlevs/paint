import { h } from 'preact';
import ColorPicker from './components/ColorPicker';
import ToolPicker from './components/ToolPicker';
import CurrentToolOptions from './components/CurrentToolOptions';
import s from './Toolbar.css';


export default () => (
	<div class={s.container}>
		<ToolPicker />
		<CurrentToolOptions />
		<ColorPicker />
	</div>
);
