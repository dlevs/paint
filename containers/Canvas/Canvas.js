import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import get from 'lodash/get';
import s from './Canvas.css';
import { getRelativeCoordsOfEvent } from '../../core/util';
import CanvasLayer from '../../core/CanvasLayer';
import { checkered } from '../../core/canvasUtils/patterns';
function distanceBetween(point1, point2) {
	return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}

function angleBetween(point1, point2) {
	return Math.atan2(point2.x - point1.x, point2.y - point1.y);
}

const drawPoints = (point1, point2, maxDistance, draw) => {
	const distance = distanceBetween(point1, point2);
	const angle = angleBetween(point1, point2);

	for (let i = 0; i < distance; i += maxDistance) {
		draw({
			x: point1.x + (Math.sin(angle) * i),
			y: point1.y + (Math.cos(angle) * i)
		});
	}
};

import Color from 'color';
import eases from 'eases';


import range from 'lodash/range';
import random from 'lodash/random';
import clamp from 'lodash/clamp';

const getColorStops = (easeType, color) => {
	color = Color(color);

	const COLOR_STOPS = 10;
	const points = [
		...range(1, COLOR_STOPS + 1)
			.map((i) => eases[easeType]((1 / i))),
		0
	];
	console.log(points)
	return points
		.map((n) => ({
			stop: n,
			color: color.alpha(((1 - n) / 10)).string()
		}));
};


// const ratio = window.devicePixelRatio || 1;


const getOffsetPoint = ({x, y}, offset) => ({
	x: x - offset,
	y: y + offset
});


const brushes = (ctx) => ({
	PAINT: {
		init(props) {
			this.props = props;
			this.colorStops = getColorStops(props.ease, props.colorPrimary);
			console.log(this.colorStops)
			// ctx.filter = "blur(100px)";

			ctx.globalOpacity = props.opacity;

		},
		destroy() {

		},
		drawPoint(point) {
			const {strokeSize, colorPrimary, opacity} = this.props;
			const {colorStops} = this;
			const {x, y} = point;
			const radgrad = ctx.createRadialGradient(x, y, 0, x, y, (strokeSize / 2));

			// let i = colorStops.length;
			// const step = 1 / i;
			// const stepDitherMax = step;
			// while (i > 0) {
			// 	console.log(i)
			// 	i--;
			// 	const dither = random(-stepDitherMax, stepDitherMax)
			// 	const {stop, color} = colorStops[i];
			// 	const ditheredStop = clamp(stop + dither, 0, 1);
			// 	radgrad.addColorStop(stop, color);
			// }

			// console.log(colorPrimary)
			// console.log(Color(colorPrimary).alpha(0.8))
			//
			// radgrad.addColorStop(0, Color(colorPrimary).alpha(1));
			radgrad.addColorStop(0, Color(colorPrimary).alpha(opacity));
			// radgrad.addColorStop(0.1, Color(colorPrimary).alpha(0.01));
			// radgrad.addColorStop(0.0025, Color(colorPrimary).alpha(0.09975));
			radgrad.addColorStop(1, Color(colorPrimary).alpha(0));
			//

			ctx.fillStyle = radgrad;
			ctx.fillRect(x - strokeSize / 2, y - strokeSize / 2, strokeSize, strokeSize);

		},
		strokeStart(point) {
			this.drawPoint(point);
		},
		stroke(points) {
			const [point1, point2] = points.slice(-2);

			// TODO: optimise
			drawPoints(point1, point2, this.props.strokeSize / 8, this.drawPoint.bind(this));
		},
		strokeEnd(points) {

		}
	},
	EMOJI: {
		init(props) {
			this.props = props;
			ctx.font = `${props.strokeSize}px serif`;
			ctx.globalAlpha = props.opacity;
		},
		destroy() {

		},
		drawPoint(point) {
			const {strokeSize, emoji} = this.props;
			const {x, y} = getOffsetPoint(point, strokeSize / 2);
			ctx.fillText(emoji, x, y);
		},
		strokeStart(point) {
			this.drawPoint(point);
		},
		stroke(points) {
			const {maxStampDistance} = this.props;
			const [point1, point2] = points.slice(-2);
			// TODO: optimise
			drawPoints(point1, point2, maxStampDistance, this.drawPoint.bind(this));
		},
		strokeEnd(points) {

		}
	}
});


class Canvas extends Component {

	points = [];
	isMouseDown = false;

	handleMouseDown = (e) => {
		const point = getRelativeCoordsOfEvent(e);

		// TODO: Ignore right click
		this.isMouseDown = true;
		this.points.push(point);
		this.ctx.save();

		// TODO: Move this out to a generic "init" method
		this.ctx.globalCompositeOperation = this.props.compositeOperation;

		this.currentBush.init(this.props);
		this.currentBush.strokeStart(point);
	};

	handleMouseMove = (e) => {
		const point = getRelativeCoordsOfEvent(e);

		if (!this.isMouseDown) return;
		this.points.push(point);
		this.currentBush.stroke(this.points);
	};


	handleMouseUp = () => {
		this.currentBush.strokeEnd(this.points);
		this.currentBush.destroy();
		this.ctx.restore();
		this.isMouseDown = false;
		this.points = [];
	};


	// Component Lifestyle
	//-------------------------------------------------------
	componentDidMount() {
		// this.canvasLayer = new CanvasLayer(this.canvas, this.props);
		this.ctx = this.canvas.getContext('2d');
		this.currentBush = brushes(this.ctx).PAINT;
		//window.addEventListener('resize', this.canvasLayer.setSize.bind(this), false);
		setTimeout(() => {
			this.setSize();

			// TODO: Move these
			this.ctx.lineCap = 'round';
			// TODO: Move this to an init method. This should be a background, not part of this canvas
			const checkeredCanvas = checkered(20, '#fff', '#ccc');
			// this.ctx.fillStyle = this.ctx.createPattern(checkeredCanvas, 'repeat');
			this.ctx.fillStyle = '#fff';
			this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		}, 0);
	}

	// componentWillUnmount() {
	// 	window.removeEventListener('resize', this.setSize, false);
	// }

	shouldComponentUpdate() {
		return false;
	}

	componentWillReceiveProps(props) {

	}


	setSize() {
		const {canvas} = this;

		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
	}


	// this.canvasLayer.setStateFromProps(props);

// Render
//-------------------------------------------------------
	render() {
		return (
			<canvas
				ref={canvas => this.canvas = canvas}
				class={s.canvas}
				onMouseDown={this.handleMouseDown}
				onMouseUp={this.handleMouseUp}
				onMouseMove={this.handleMouseMove}
			/>
		);
	}
}

export default connect(
	({colors, currentTool, toolSettings}) => {
		const getToolSetting = (setting, fallback = null) => {
			return get(toolSettings, [currentTool, setting], fallback);
		};

		return {
			currentTool,
			colorPrimary: colors.primary,
			colorSecondary: colors.secondary,
			strokeSize: getToolSetting('SIZE', 1),
			feather: getToolSetting('FEATHER', 0),
			emoji: getToolSetting('EMOJI'),
			opacity: getToolSetting('OPACITY', 1),
			maxStampDistance: getToolSetting('MAX_STAMP_DISTANCE'),
			ease: getToolSetting('EASE'),
			compositeOperation: getToolSetting('COMPOSITE_OPERATION', 'source-over')
		}
	}
)(Canvas);
