import { h } from 'preact';
import { connect } from 'preact-redux';
import tools from '../../../../core/tools';
import s from './CurrentToolOptions.css';

const ToolOption = ({Component, ...props}) => (
	<li class={s.toolOptionItem}>
		<Component {...props}/>
	</li>
);

const CurrentToolOptions = ({currentTool}) => {
	const options = tools.getById(currentTool).options;

	if (options) {
		return (
			<ul class={s.toolOptionsList}>
				{options.map(option => (
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
