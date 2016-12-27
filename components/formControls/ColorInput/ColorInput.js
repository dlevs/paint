import { h } from 'preact';
import style from "./ColorInput.css";

export default ({wrapperClass, value, handleInput}) => (
	<div
		class={wrapperClass}
		style={{backgroundColor: value}}
	>
		<input
			class={style.input}
			type="color"
			value={value}
			onInput={handleInput}
		/>
	</div>
);
