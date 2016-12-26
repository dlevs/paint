import { h } from 'preact';
import { connect } from 'preact-redux';
import { setTool } from '../../core/actions/currentToolActions';
import ColorPicker from '../ColorPicker';
import tools from '../../core/tools';
import style from './Toolbar.css';

const Tool = ({
	isSelected,
	handleChange,
	label,
	icon,
	id
}) => {
	const formId = `tool-radio-${id}`;
	return (
		<li class={style.tooListItem}>
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

const ToolOption = ({Component, ...props}) => (
	<li class={style.toolOptionItem}>
		<Component {...props}/>
	</li>
);


// TODO: Break this out into smaller connected components (tools, toolOptions, colorPicker, etc)
const Toolbar = ({currentTool, ...props}) => {
	const currentToolData = tools.getById(currentTool);

	return (
		<div class={style.container}>
			<ul class={style.tooList}>
				{tools.items.map(tool => (
					<Tool
						key={tool.id}
						isSelected={currentTool === tool.id}
						{...tool}
						{...props}
					/>
				))}
			</ul>
			{currentToolData.options && (
				<ul class={style.toolOptionsList}>
					{currentToolData.options.map(option => (
						<ToolOption
							key={option.id}
							{...option}
						/>
					))}
				</ul>
			)}
			<ColorPicker />
		</div>
	)
};


export default connect(
	({currentTool}) => ({currentTool}),
	(dispatch) => ({
		handleChange: (e) => {
			dispatch(
				setTool(e.target.value)
			)
		}
	})
)(Toolbar);
