import { drawPoints, getOffsetPoint } from '../canvasUtils';

export default class Brush {
	constructor(ctx) {
		this.ctx = ctx;
	}

	preStroke(props) {
		this.props = props;
		this.ctx.font = `${props.strokeSize}px serif`;
		this.ctx.globalAlpha = props.opacity;
	}

	drawPoint = (point) => {
		const {strokeSize, emoji} = this.props;
		const {x, y} = getOffsetPoint(point, strokeSize / 2);
		this.ctx.fillText(emoji, x, y);
	};

	strokeStart(point) {
		this.drawPoint(point);
	}

	stroke(points) {
		const {maxStampDistance} = this.props;
		const [point1, point2] = points.slice(-2);
		drawPoints(point1, point2, maxStampDistance, this.drawPoint);
	}

	strokeEnd(points) {

	}
}
