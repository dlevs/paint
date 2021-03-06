import { h } from 'preact';
import s from './RangeInput.css';

export default ({
	value,
	min = 0,
	max,
	step = 1,
	label,
	handleInput
}) => (
	<div>
		<label>
			{label} - {value}
			<input
				class={s.input}
				type="range"
				value={value}
				min={min}
				max={max}
				step={step}
				onInput={handleInput}
			/>
		</label>
	</div>
);
