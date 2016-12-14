import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { setTool } from '../../core/actions/currentToolActions';
import {tools, toolsList} from './tools';
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
		<li className={style.listItem}>
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
				<i className={`fa ${icon}`}/>
			</label>
		</li>
	)
};

const Toolbar = (props) => (
	<ul className={style.container}>
		{tools.map(tool => (
			<Tool key={tool.id} {...tool} {...props}/>
		))}
	</ul>
);


export default connect(
	(state) => ({
		currentTool: state.currentTool
	}),
	(dispatch) => ({
		handleChange: (e) => {
			dispatch(
				setTool(e.target.value)
			)
		}
	})
)(Toolbar);
