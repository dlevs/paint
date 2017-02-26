import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import get from 'lodash/get';
import s from './Canvas.css';
import { getRelativeCoordsOfEvent } from '../../core/util';
import CanvasLayer from '../../core/CanvasLayer';
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
// const ratio = window.devicePixelRatio || 1;


const getOffsetPoint = ({x, y}, offset) => ({
	x: x - offset,
	y: y + offset
});

const brushes = (ctx) => ({
	PAINT: {
		init(props) {
			this.props = props;
			this.color = Color(props.colorPrimary);
		},
		destroy() {

		},
		drawPoint(point) {
			const {strokeSize} = this.props;
			const {color} = this;
			const {x, y} = point;
			const radgrad = ctx.createRadialGradient(x, y, strokeSize / 4, x, y, strokeSize / 2);

			radgrad.addColorStop(0, this.props.colorPrimary);
			radgrad.addColorStop(0.5, color.alpha(0.5));
			radgrad.addColorStop(1, color.alpha(0));

			ctx.fillStyle = radgrad;
			ctx.fillRect(x - strokeSize / 2, y - strokeSize / 2, strokeSize, strokeSize);
		},
		strokeStart(point) {
			this.drawPoint(point);
		},
		stroke(points) {
			const [point1, point2] = points.slice(-2);
			// TODO: optimise
			drawPoints(point1, point2, 0.2, this.drawPoint.bind(this));
		},
		strokeEnd(points) {

		}
	},
	EMOJI: {
		init(props) {
			this.props = props;
			ctx.font = `${props.strokeSize}px serif`;
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

	handleEvent = (e) => {
		const point = getRelativeCoordsOfEvent(e);

		switch (e.type) {
			case 'mousedown':
				this.isMouseDown = true;
				this.points.push(point);
				this.ctx.save();
				this.currentBush.init(this.props);
				this.currentBush.strokeStart(point);
				break;
			case 'mousemove':
				if (!this.isMouseDown) return;
				this.points.push(point);
				this.currentBush.stroke(this.points);
				break;
			case 'mouseup':
				this.currentBush.strokeEnd(this.points);
				this.currentBush.destroy();
				this.ctx.restore();
				this.isMouseDown = false;
				this.points = [];
				break;
		}
	};


	// Component Lifestyle
	//-------------------------------------------------------
	componentDidMount() {
		// this.canvasLayer = new CanvasLayer(this.canvas, this.props);
		this.ctx = this.canvas.getContext('2d');
		this.currentBush = brushes(this.ctx).PAINT;
		//window.addEventListener('resize', this.canvasLayer.setSize.bind(this), false);
		setTimeout(() => this.setSize(), 0);
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
				onMouseDown={this.handleEvent}
				onMouseUp={this.handleEvent}
				onMouseMove={this.handleEvent}
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
			maxStampDistance: getToolSetting('MAX_STAMP_DISTANCE')
		}
	}
)(Canvas);
