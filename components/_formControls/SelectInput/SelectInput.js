import { h } from 'preact';
import s from './SelectInput.css';

export default ({
	label,
	value,
	options,
	handleInput
}) => (
	<div>
		{label} - {value}
		<select class={s.select} onChange={handleInput}>
			{options.map((option) => (
				<option selected={option === value}>
					{option}
				</option>
			))}
		</select>
	</div>
);
