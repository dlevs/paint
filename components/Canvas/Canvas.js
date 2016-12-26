import { h, Component } from 'preact';
import style from './Canvas.css';
import { getRelativeCoordsOfEvent } from '../../core/util';
const ratio = window.devicePixelRatio || 1;

export default class Canvas extends Component {

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
		const {canvas, ctx} = this;
		canvas.width = canvas.offsetWidth * ratio;
		canvas.height = canvas.offsetHeight * ratio;
		ctx.scale(ratio, ratio);
		ctx.translate(0.5, 0.5);
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
	handleMouseDown(e) {
		this.isMouseDown = true;
		const point = getRelativeCoordsOfEvent(e);
		this.lastPoint = point;
		// this.drawCircle(point.x, point.y);
		this.drawCharacter(point.x, point.y, '😀');
	}

	handleMouseUp() {
		this.isMouseDown = false;
	}

	handleMouseMove(e) {
		if (!this.isMouseDown) return;
		const point = getRelativeCoordsOfEvent(e);
		//this.drawLine(this.lastPoint.x, this.lastPoint.y, point.x, point.y);
		this.drawCharacter(point.x, point.y, '😀');
		this.lastPoint = point;
	}


	// Drawing
	//-------------------------------------------------------
	drawCircle(x, y) {
		const {ctx} = this;
		ctx.beginPath();
		ctx.arc(x, y, 1, 0, 2 * Math.PI);
		ctx.fill();
	}

	drawLine(x1, y1, x2, y2) {
		const {ctx} = this;
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();
		ctx.fill();
	};

	drawCharacter(x, y, char) {
		// TODO: remove boilerplate
		const {ctx} = this;
		const fontSize = 20;
		ctx.fillStyle = "#FEC7F4";
		ctx.strokeStyle = "##FEC7F4";
		ctx.font = 20 + 'px Arial';
		ctx.fillText(char, x - fontSize / 2, y + fontSize / 2);
	}


	// Render
	//-------------------------------------------------------
	render() {
		return (
			<canvas
				ref={el => this.canvas = el}
				class={style.canvas}
				onMouseDown={this.handleMouseDown}
				onMouseUp={this.handleMouseUp}
				onMouseMove={this.handleMouseMove}
			/>
		);
	}
}
