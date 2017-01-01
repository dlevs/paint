import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import style from './Canvas.css';
import { getRelativeCoordsOfEvent } from '../../core/util';
import CanvasLayer from '../../core/CanvasLayer';
// const ratio = window.devicePixelRatio || 1;

class Canvas extends Component {

	// Setup
	//-------------------------------------------------------
	constructor(props) {
		super(props);
		this.handleEvent = this.handleEvent.bind(this);
	}

	componentDidMount() {
		this.canvasLayer = new CanvasLayer(this.canvas);

		// window.addEventListener('resize', this.setSize, false);
	}

	// componentWillUnmount() {
	// 	window.removeEventListener('resize', this.setSize, false);
	// }

	componentWillReceiveProps({colors}) {
		this.canvasLayer.setColor(colors.primary);
	}


	// Event Handling
	//-------------------------------------------------------
	handleEvent(e) {
		const point = getRelativeCoordsOfEvent(e);
		const {x, y} = point;

		switch (e.type) {
			case 'mousedown':
				this.isMouseDown = true;
				this.canvasLayer.drawCircle(x, y);
				break;
			case 'mouseup':
				this.isMouseDown = false;
				break;
			case 'mousemove':
				if (!this.isMouseDown) return;
				this.canvasLayer.drawLine(this.lastPoint.x, this.lastPoint.y, x, y);
				break;
		}

		this.lastPoint = point;
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
	({colors}) => ({colors})
)(Canvas);
