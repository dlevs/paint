import Color from 'color';

// TODO: Move these
function distanceBetween(point1, point2) {
	return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}

function angleBetween(point1, point2) {
	return Math.atan2(point2.x - point1.x, point2.y - point1.y);
}

const drawPoints = (size, lastPoint, currentPoint, draw) => {
	const distance = distanceBetween(lastPoint, currentPoint);
	const angle = angleBetween(lastPoint, currentPoint);

	for (let i = 0; i < distance; i += size / 8) {
		const x = lastPoint.x + (Math.sin(angle) * i);
		const y = lastPoint.y + (Math.cos(angle) * i);

		draw(x, y);
	}
};



export default class CanvasLayer {
	constructor(canvas, props) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.init();
		this.setStateFromProps(props);
		return this;
	}

	applyCanvasDefaults() {
		// TODO: Apply this to Canvas.js file.
		this.ctx.lineCap = 'round';
		this.ctx.translate(0.5, 0.5);
	}

	init() {
		// TODO: see why this is necessary
		setTimeout(() => this.setSize(), 0);
		return this;
	}

	// Setters
	//--------------------------------------------------------
	setColor(color) {
		const {ctx} = this;
		ctx.strokeStyle = ctx.fillStylecolor = ctx.shadowColor = color;
		return this;
	}

	// TODO: May be a bad method name if does nothing more than this
	setStrokeSize(size) {
		this.ctx.lineWidth = size;
		return this;
	}

	setShadowBlur(shadowBlur) {
		this.ctx.shadowBlur = shadowBlur;
		return this;
	}

	setCurrentTool(currentTool) {
		this.currentTool = currentTool;
		return this;
	}

	setEmoji(emoji) {
		this.emoji = emoji;
		return this;
	}

	setSize() {
		const {canvas} = this;

		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;

		// Setting canvas size clears the canvas drawings and settings. Restore.
		this.applyCanvasDefaults();
		this.setStateFromProps(this.props);

		return this;
	}


	// Drawing Methods
	//--------------------------------------------------------
	// drawCircle(x, y) {
	// 	const {ctx} = this;
	// 	ctx.beginPath();
	// 	ctx.arc(x, y, ctx.strokeWidth / 2, 0, 2 * Math.PI);
	// 	ctx.fill();
	// 	return this;
	// };
	//
	// drawLine(x1, y1, x2, y2) {
	// 	const {ctx} = this;
	// 	ctx.beginPath();
	// 	ctx.moveTo(x1, y1);
	// 	ctx.lineTo(x2, y2);
	// 	ctx.stroke();
	// 	return this;
	// };

	setStateFromProps(props) {
		this.props = props;
		const {
			colorPrimary,
			strokeSize,
			feather,
			currentTool,
			emoji
		} = props;

		return this.setColor(colorPrimary)
			.setStrokeSize(strokeSize)
			.setShadowBlur(feather)
			.setCurrentTool(currentTool)
			.setEmoji(emoji);
	}

	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}


	drawPoints(lastPoint, currentPoint, draw) {
		const {ctx} = this;
		const {lineWidth} = ctx;
		const distance = distanceBetween(lastPoint, currentPoint);
		const angle = angleBetween(lastPoint, currentPoint);

		for (let i = 0; i < distance; i += lineWidth / 8) {
			const x = lastPoint.x + (Math.sin(angle) * i);
			const y = lastPoint.y + (Math.cos(angle) * i);

			draw(x, y);
		}
	}

	// TODO: Move drawing methods to one place
	drawPENCIL(lastPoint, currentPoint) {
		const {ctx} = this;
		const {lineWidth} = ctx;
		const {colorPrimary} = this.props;
		const color = Color(colorPrimary);

		this.drawPoints(lastPoint, currentPoint, (x, y) => {
			const radgrad = ctx.createRadialGradient(x, y, lineWidth / 4, x, y, lineWidth / 2);

			radgrad.addColorStop(0, colorPrimary);
			radgrad.addColorStop(0.5, color.alpha(0.5));
			radgrad.addColorStop(1, color.alpha(0));

			ctx.fillStyle = radgrad;
			ctx.fillRect(x - lineWidth / 2, y - lineWidth / 2, lineWidth, lineWidth);
		});
	}

	drawEMOJI(lastPoint, currentPoint) {
		const {ctx} = this;
		const {lineWidth} = ctx;
		const offset = lineWidth / 2;
		ctx.font = `${lineWidth}px serif`;

		this.drawPoints(lastPoint, currentPoint, (x, y) => {
			ctx.fillText(this.emoji, x - offset, y + offset);
		});
	}

	draw(...args) {
		const {ctx} = this;
		ctx.save();

		brushes(ctx)(...args);

		ctx.restore();
	}

}
