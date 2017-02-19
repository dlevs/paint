import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import get from 'lodash/get';
import s from './Canvas.css';
import { getRelativeCoordsOfEvent } from '../../core/util';
import CanvasLayer from '../../core/CanvasLayer';

// const ratio = window.devicePixelRatio || 1;

class Canvas extends Component {

	// Setup
	//-------------------------------------------------------
	points = [];

	handleEvent = (e) => {
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
	};


	// Component Lifestyle
	//-------------------------------------------------------
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
	({colors, currentTool, toolSettings}) => ({
		colorPrimary: colors.primary,
		colorSecondary: colors.secondary,
		strokeSize: get(toolSettings, [currentTool, 'SIZE'], 1),
		feather: get(toolSettings, [currentTool, 'FEATHER'], 0)
	})
)(Canvas);
