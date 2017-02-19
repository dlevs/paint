import { h } from 'preact';
import s from "./ColorInput.css";

export default ({wrapperClass, value, handleInput}) => (
	<div
		class={wrapperClass}
		style={{backgroundColor: value}}
	>
		<input
			class={s.input}
			type="color"
			value={value}
			onInput={handleInput}
		/>
	</div>
);
