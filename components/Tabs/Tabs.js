import { h, Component } from 'preact';
import style from './Tabs.css';

class TabItem extends Component {
	constructor(props) {
		super(props);
		this.handleClick = () => props.handleClick(props.value);
	}

	render({label, value}, state) {
		return (
			<li role="tab" class={style.tabListItem}>
				{
					/* Using buttons as it's easier to intercept and prevent
					 actions than with radio inputs. */
				}
				<button
					type="button"
					name="tab"
					value={value}
					class={style.tabButtons}
				>
					{label}
				</button>
			</li>
		);
	}
}

export default class Tabs extends Component {
	constructor(props) {
		super(props);
		this.state = {value: props.value};
		this.handleTabsClick = this.handleTabsClick.bind(this);
	}

	handleTabsClick(e) {
		const {name, value} = e.target;
		if (name === 'tab') {
			this.setState({value});
		}
	}

	render({children, buttonClassName}, {value}) {
		return (
			<div>
				<ul
					role="tablist"
					class={style.tabList}
					onClick={this.handleTabsClick}
				>
					{children.map(({attributes}) => (
						<TabItem
							{...attributes}
							key={attributes.value}
							class={buttonClassName}
						/>
					))}
				</ul>
				<div class={style.container}>
					{children.filter(({attributes}) => attributes.value === value)}
				</div>
			</div>
		);
	}
}
