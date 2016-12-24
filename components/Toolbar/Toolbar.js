import { h } from 'preact';
import { connect } from 'preact-redux';
import { setTool } from '../../core/actions/currentToolActions';
import ColorPicker from '../ColorPicker';
import tools from '../../core/tools';
import style from './Toolbar.css';

const Tool = ({
	currentTool,
	handleChange,
	label,
	icon,
	id
}) => {
	const formId = `tool-radio-${id}`;
	return (
		<li className={style.tooListItem}>
			<input
				id={formId}
				type="radio"
				name="tool"
				value={id}
				checked={id === currentTool}
				onChange={handleChange}
				className={style.toolCheckbox}
			/>
			<label
				htmlFor={formId}
				className={style.toolLabel}
				title={label}
			>
				<span className={style.visuallyHidden}>{label}</span>
				<i className={`fa ${icon}`}/>
			</label>
		</li>
	)
};

const ToolOption = ({Component, ...props}) => (
	<li className={style.toolOptionItem}>
		<Component {...props}/>
	</li>
);


// TODO: Break this out into smaller connected components (tools, toolOptions, colorPicker, etc)
const Toolbar = (props) => {
	const {currentTool, currentToolSettings} = props;
	const currentToolData = tools.getById(currentTool);

	return (
		<div className={style.container}>
			<ul className={style.tooList}>
				{tools.items.map(tool => (
					<Tool
						key={tool.id}
						{...tool}
						{...props}
					/>
				))}
			</ul>
			{currentToolData.Visualisation && (
				<currentToolData.Visualisation {...currentToolSettings}/>
			)}
			{currentToolData.options && (
				<ul className={style.toolOptionsList}>
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
	(state) => ({
		currentTool: state.currentTool,
		currentToolSettings: state.toolSettings[state.currentTool]
	}),
	(dispatch) => ({
		handleChange: (e) => {
			dispatch(
				setTool(e.target.value)
			)
		}
	})
)(Toolbar);
