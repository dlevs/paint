export default class CanvasLayer {
	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.init();
	}

	init() {
		// Initial canvas defaults
		this.ctx.lineCap = 'round';
		this.ctx.translate(0.5, 0.5);

		// TODO: see why this is necessary
		setTimeout(() => this.setSize(), 0);
	}

	// Setters
	//--------------------------------------------------------
	setColor(color) {
		const {ctx} = this;
		ctx.strokeStyle = ctx.fillStylecolor = ctx.shadowColor = color;
	}

	setSize() {
		const {canvas} = this;
		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
	}


	// Drawing Methods
	//--------------------------------------------------------
	drawCircle(x, y) {
		const {ctx} = this;
		ctx.beginPath();
		ctx.arc(x, y, ctx.strokeWidth / 2, 0, 2 * Math.PI);
		ctx.fill();
	};

	drawLine(x1, y1, x2, y2) {
		const {ctx} = this;
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();
		ctx.fill();
	};

	drawCurve(points) {
		var i,
			len = points.length - 2;

		this.ctx.beginPath();
		this.ctx.moveTo(points[0].x, points[0].y);

		for (i = 1; i < len; i++) {
			var xc = (points[i].x + points[i + 1].x) / 2;
			var yc = (points[i].y + points[i + 1].y) / 2;
			this.ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
		}

		// curve through the last two points
		this.ctx.quadraticCurveTo(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
		this.ctx.stroke();
	};

}
