export default class CanvasLayer {
	constructor(canvas, props) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.init();
		this.setStateFromProps(props);
		return this;
	}

	applyCanvasDefaults() {
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

	setSize() {
		const {canvas} = this;

		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;

		// Setting canvas size clears the canvas drawings and settings. Restore.
		this.applyCanvasDefaults();
		this.setStateFromProps(this.currentProps);

		return this;
	}


	// Drawing Methods
	//--------------------------------------------------------
	drawCircle(x, y) {
		const {ctx} = this;
		ctx.beginPath();
		ctx.arc(x, y, ctx.strokeWidth / 2, 0, 2 * Math.PI);
		ctx.fill();
		return this;
	};

	drawLine(x1, y1, x2, y2) {
		const {ctx} = this;
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();
		return this;
	};

	setStateFromProps(props) {
		this.currentProps = props;
		const {colorPrimary, strokeSize, feather} = props;

		return this.setColor(colorPrimary)
			.setStrokeSize(strokeSize)
			.setShadowBlur(feather);
	}

	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	drawCurve(points) {
		if (points.length < 3) {
			// Not enough points. Exit early
			// TODO: maybe we can draw a line for 2 points
			return this;
		}

		this.ctx.beginPath();
		this.ctx.moveTo(points[0].x, points[0].y);

		for (var i = 1, len = points.length - 2; i < len; i++) {
			var xc = (points[i].x + points[i + 1].x) / 2;
			var yc = (points[i].y + points[i + 1].y) / 2;
			this.ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
		}

		// curve through the last two points
		this.ctx.quadraticCurveTo(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
		this.ctx.stroke();
		return this;
	};

}
