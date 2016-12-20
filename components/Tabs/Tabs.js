import React, { PropTypes } from 'react';
import style from './Tabs.css';

class TabItem extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = () => props.handleClick(props.value);
	}

	render() {
		const {label, className} = this.props;
		return (
			<li role="tab" className={style.tabListItem}>
				{
					/* Using buttons as it's easier to intercept and prevent
					actions than with radio inputs. */
				}
				<button
					onClick={this.handleClick}
					className={style.tabButtons}
				>
					{label}
				</button>
			</li>
		);
	}
}

export default class Tabs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: props.value};
		this.handleTabClick = this.handleTabClick.bind(this);
	}

	handleTabClick(value) {
		this.setState({value});
	}

	render() {
		const {children, buttonClassName} = this.props;
		const {value} = this.state;

		return (
			<div>
				<ul role="tablist" className={style.tabList}>
					{children.map(({props}) => (
						<TabItem
							{...props}
							className={buttonClassName}
							handleClick={this.handleTabClick}
						/>
					))}
				</ul>
				<div className={style.container}>
					{children.filter(child => child.props.value === value)}
				</div>
			</div>
		);
	}
}
