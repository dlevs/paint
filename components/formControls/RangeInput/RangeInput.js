import { h } from 'preact';
import style from './RangeInput.css';

export default ({
	value,
	min = 0,
	max,
	label,
	handleInput
}) => (
	<div>
		<label>
			{label} - {value}
			<input
				class={style.input}
				type="range"
				value={value}
				min={min}
				max={max}
				onInput={handleInput}
			/>
		</label>
	</div>
);
