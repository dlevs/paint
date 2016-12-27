import { h } from 'preact';
import { connect } from 'preact-redux';
import tools from '../../../../core/tools';
import { setTool } from '../../../../core/actions/currentToolActions';
import style from './ToolPicker.css';

const Tool = ({
	isSelected,
	handleChange,
	label,
	icon,
	id
}) => {
	const formId = `tool-radio-${id}`;
	return (
		<li class={style.toolListItem}>
			<input
				id={formId}
				type="radio"
				name="tool"
				value={id}
				checked={isSelected}
				onChange={handleChange}
				class={style.toolCheckbox}
			/>
			<label
				for={formId}
				class={style.toolLabel}
				title={label}
			>
				<span class={style.visuallyHidden}>{label}</span>
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
	<ul class={style.toolList}>
		{connectedTools.map(ToolComponent => <ToolComponent />)}
	</ul>
);
