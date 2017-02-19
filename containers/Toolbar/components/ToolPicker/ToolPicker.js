import { h } from 'preact';
import { connect } from 'preact-redux';
import tools from '../../../../core/tools';
import { setTool } from '../../../../core/actions/currentToolActions';
import s from './ToolPicker.css';

const Tool = ({
	isSelected,
	handleChange,
	label,
	icon,
	id
}) => {
	const formId = `tool-radio-${id}`;
	return (
		<li class={s.toolListItem}>
			<input
				id={formId}
				type="radio"
				name="tool"
				value={id}
				checked={isSelected}
				onChange={handleChange}
				class={s.toolCheckbox}
			/>
			<label
				for={formId}
				class={s.toolLabel}
				title={label}
			>
				<span class={s.visuallyHidden}>{label}</span>
				<i class={`fa ${icon}`}/>
			</label>
		</li>
	)
};

const connectedTools = tools.rawItems.map(tool => connect(
	({currentTool}) => ({
		...tool,
		isSelected: tool.id === currentTool
	}),
	(dispatch) => ({
		handleChange: () => {
			dispatch(
				setTool(tool.id)
			)
		}
	})
)(Tool));

export default () => (
	<ul class={s.toolList}>
		{connectedTools.map(ToolComponent => <ToolComponent />)}
	</ul>
);
