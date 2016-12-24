import { h, Component } from 'preact';
import style from './Tabs.css';

class TabItem extends Component {
	constructor(props) {
		super(props);
		this.handleClick = () => props.handleClick(props.value);
	}

	render() {
		const {label, value} = this.props;
		return (
			<li role="tab" className={style.tabListItem}>
				{
					/* Using buttons as it's easier to intercept and prevent
					 actions than with radio inputs. */
				}
				<button
					type="button"
					name="tab"
					value={value}
					className={style.tabButtons}
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

	render() {
		const {children, buttonClassName} = this.props;
		const {value} = this.state;
		return (
			<div>
				<ul
					role="tablist"
					className={style.tabList}
					onClick={this.handleTabsClick}
				>
					{children.map(({attributes}) => (
						<TabItem
							{...attributes}
							key={attributes.value}
							className={buttonClassName}
						/>
					))}
				</ul>
				<div className={style.container}>
					{children.filter(({attributes}) => attributes.value === value)}
				</div>
			</div>
		);
	}
}
