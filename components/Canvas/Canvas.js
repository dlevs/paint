import React, { PropTypes } from 'react';
import style from './Canvas.css';
import { getRelativeCoordsOfEvent } from '../../core/util';

export default class Canvas extends React.Component {

	// Setup
	//-------------------------------------------------------
	constructor(props) {
		super(props);
		this.setSize = this.setSize.bind(this);
		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);
		this.handleMouseMove = this.handleMouseMove.bind(this);
	}

	setSize() {
		const c = this.canvas;
		c.width = c.offsetWidth;
		c.height = c.offsetHeight;
		console.log('canvas size set');
	}

	componentDidMount() {
		this.ctx = this.canvas.getContext('2d');
		this.ctx.lineCap = 'round';

		window.addEventListener('resize', this.setSize, false);

		// TODO: see why this is necessary
		setTimeout(this.setSize, 0);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.setSize, false);
	}


	// Event Handling
	//-------------------------------------------------------
	handleMouseDown() {
		this.isMouseDown = true;
	}

	handleMouseUp() {
		this.isMouseDown = false;
	}

	handleMouseMove(e) {
		if (!this.isMouseDown) return;

		const {x, y} = getRelativeCoordsOfEvent(e);

		this.ctx.beginPath();
		this.ctx.arc(x, y, 1, 0, 2 * Math.PI);
		this.ctx.fill();
	}


	// Render
	//-------------------------------------------------------
	render() {
		return (
			<canvas
				ref={el => this.canvas = el}
				className={style.canvas}
				onMouseDown={this.handleMouseDown}
				onMouseUp={this.handleMouseUp}
				onMouseMove={this.handleMouseMove}
			/>
		);
	}
}
