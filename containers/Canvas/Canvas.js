import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import get from 'lodash/get';
import s from './Canvas.css';
import { getRelativeCoordsOfEvent } from '../../core/util';
import { checkered } from '../../core/canvas/patterns';
import tools from '../../core/tools';

class Canvas extends Component {

	points = [];
	isMouseDown = false;

	handleMouseDown = (e) => {
		// Only respond to left click
		if (e.which !== 1) return;

		const point = getRelativeCoordsOfEvent(e);

		this.isMouseDown = true;
		this.points.push(point);
		this.ctx.save();

		this.brush.preStroke(this.props);
		this.brush.strokeStart(point);
	};

	handleMouseMove = (e) => {
		const point = getRelativeCoordsOfEvent(e);

		if (!this.isMouseDown) return;
		this.points.push(point);
		this.brush.stroke(this.points);
	};


	handleMouseUp = () => {
		this.brush.strokeEnd(this.points);
		this.ctx.restore();
		this.isMouseDown = false;
		this.points = [];
	};


	// Component Lifestyle
	//-------------------------------------------------------
	componentDidMount() {
		this.ctx = this.canvas.getContext('2d');
		this.componentWillReceiveProps(this.props);
		//window.addEventListener('resize', this.canvasLayer.setSize.bind(this), false);
		setTimeout(() => {
			this.setSize();

			// TODO: Move these
			this.ctx.lineCap = 'round';
			// TODO: Move this to an init method. This should be a background, not part of this canvas
			// const checkeredCanvas = checkered(20, '#fff', '#ccc');
			// this.ctx.fillStyle = this.ctx.createPattern(checkeredCanvas, 'repeat');
			// this.ctx.fillStyle = '#fff';
			// this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		}, 0);
	}

	// componentWillUnmount() {
	// 	window.removeEventListener('resize', this.setSize, false);
	// }

	shouldComponentUpdate() {
		return false;
	}

	componentWillReceiveProps (props) {
		const tool = tools.getById(props.currentTool);
		this.brush = new tool.brush(this.ctx);
		this.ctx.globalCompositeOperation = props.compositeOperation;
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
			// TODO: These could propbably all be passed as a single "settings" prop:
			strokeSize: getToolSetting('SIZE', 1),
			feather: getToolSetting('FEATHER', 0),
			emoji: getToolSetting('EMOJI'),
			hardness: getToolSetting('HARDNESS', 1),
			opacity: getToolSetting('OPACITY', 1),
			maxStampDistance: getToolSetting('MAX_STAMP_DISTANCE'),
			ease: getToolSetting('EASE'),
			compositeOperation: getToolSetting('COMPOSITE_OPERATION', 'source-over')
		}
	}
)(Canvas);
