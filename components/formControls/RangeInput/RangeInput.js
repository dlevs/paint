import { h } from 'preact';
import style from './RangeInput.css';

export default ({
	value,
	min = 0,
	max,
	label,
	handleChange
}) => (
	<div>
		<label>
			{label} - {value}
			<input
				className={style.input}
				type="range"
				value={value}
				min={min}
				max={max}
				onChange={handleChange}
			/>
		</label>
	</div>
);
