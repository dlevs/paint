import React, { PropTypes } from 'react';
import style from './Canvas.css';

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
		const {canvas} = this;
		canvas.width = 1000;//canvas.innerWidth;
		canvas.height = 1000;//canvas.innerHeight;
		console.log('canvas size set');
	}

	componentDidMount() {
		this.setSize();

		this.ctx = this.canvas.getContext('2d');
		this.ctx.lineCap = 'round';

		window.addEventListener('resize', this.setSize, false);
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

		const {clientX, clientY} = e.target;

		console.log(clientX)
		this.ctx.beginPath();
		this.ctx.arc(clientX, clientY, 1, 0, 2 * Math.PI);
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

