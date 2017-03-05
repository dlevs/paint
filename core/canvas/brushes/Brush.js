import Color from 'color';
import { drawPoints } from '../canvasUtils';

export default class Brush {
	constructor(ctx) {
		this.ctx = ctx;
	}

	preStroke(props) {
		const color = Color(props.colorPrimary);

		this.props = props;
		this.color = color.alpha(props.hardness).string();
		this.colorTransparent = color.alpha(0).string();
	}

	drawPoint = (point) => {
		const {x, y} = point;
		const {strokeSize} = this.props;

		this.ctx.fillStyle = this.createRadialGradient(point);
		this.ctx.fillRect(x - strokeSize / 2, y - strokeSize / 2, strokeSize, strokeSize);
	};

	createRadialGradient({x, y}) {
		const radius = this.props.strokeSize / 2;
		const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, radius);

		gradient.addColorStop(0, this.color);
		gradient.addColorStop(1, this.colorTransparent);

		return gradient;
	}

	strokeStart(point) {
		this.drawPoint(point);
	}

	stroke(points) {
		const [point1, point2] = points.slice(-2);
		drawPoints(point1, point2, this.props.strokeSize / 8, this.drawPoint);
	}

	strokeEnd(points) {

	}
}
