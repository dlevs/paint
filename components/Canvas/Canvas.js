import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';
import style from './Canvas.css';
import { getRelativeCoordsOfEvent } from '../../core/util';
import CanvasLayer from '../../core/CanvasLayer';

// const ratio = window.devicePixelRatio || 1;

class Canvas extends Component {

	// Setup
	//-------------------------------------------------------
	constructor(props) {
		super(props);
		this.points = [];
		this.handleEvent = this.handleEvent.bind(this);
	}

	componentDidMount() {
		this.canvasLayer = new CanvasLayer(this.canvas, this.props);

		//window.addEventListener('resize', this.canvasLayer.setSize.bind(this), false);
	}

	// componentWillUnmount() {
	// 	window.removeEventListener('resize', this.setSize, false);
	// }

	shouldComponentUpdate() {
		return false;
	}

	componentWillReceiveProps(props) {
		this.canvasLayer.setStateFromProps(props);
	}


	// Event Handling
	//-------------------------------------------------------
	handleEvent(e) {
		const point = getRelativeCoordsOfEvent(e);
		const {x, y} = point;

		switch (e.type) {
			case 'mousedown':
				this.isMouseDown = true;
				this.points.push(point);
				this.canvasLayer.drawCircle(x, y);
				break;
			case 'mouseup':
				this.isMouseDown = false;
				this.canvasLayer.clear();
				this.canvasLayer.drawCurve(this.points);
				this.points = [];
				break;
			case 'mousemove':
				if (!this.isMouseDown) return;
				this.canvasLayer.clear();
				this.points.push(point);
				this.canvasLayer.drawCurve(this.points);
				break;
		}
	}


	// Render
	//-------------------------------------------------------
	render() {
		return (
			<canvas
				ref={canvas => this.canvas = canvas}
				class={style.canvas}
				onMouseDown={this.handleEvent}
				onMouseUp={this.handleEvent}
				onMouseMove={this.handleEvent}
			/>
		);
	}
}

export default connect(
	({colors, currentTool, toolSettings}) => ({
		colorPrimary: colors.primary,
		colorSecondary: colors.secondary,
		strokeSize: _.get(toolSettings, [currentTool, 'SIZE'], 1),
		feather:  _.get(toolSettings, [currentTool, 'FEATHER'], 0)
	})
)(Canvas);
