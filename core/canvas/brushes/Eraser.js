import Brush from './Brush';

export default class Eraser extends Brush {
	constructor(ctx) {
		super(ctx);
	}

	preStroke(...args) {
		super.preStroke(...args);
		this.ctx.globalCompositeOperation = 'destination-out';
	}
}
