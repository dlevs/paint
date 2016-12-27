import { h } from 'preact';
import { connect } from 'preact-redux';
import tools from '../../../../core/tools';
import style from './CurrentToolOptions.css';

const ToolOption = ({Component, ...props}) => (
	<li class={style.toolOptionItem}>
		<Component {...props}/>
	</li>
);

const CurrentToolOptions = ({currentTool}) => {
	const currentToolData = tools.getById(currentTool);

	if (currentToolData.options) {
		return (
			<ul class={style.toolOptionsList}>
				{currentToolData.options.map(option => (
					<ToolOption
						key={option.id}
						{...option}
					/>
				))}
			</ul>
		)
	}
};

export default connect(
	({currentTool}) => ({currentTool})
)(CurrentToolOptions);
