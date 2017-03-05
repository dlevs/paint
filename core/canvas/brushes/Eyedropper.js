import last from 'lodash/last';
import Color from 'color';

export default class Eyedropper {
	constructor(ctx) {
		this.ctx = ctx;
	}

	setColorFromPoint({x, y}) {
		const pixelData = this.ctx.getImageData(x, y, 1, 1).data;
		this.props.setColor('primary', Color(pixelData).hex());
	}

	// TODO: Make base class so these methods can be left out
	preStroke(props) {
		this.props = props;
	}

	strokeStart(point) {
		this.setColorFromPoint(point);
	}

	stroke(points) {
		this.setColorFromPoint(last(points));
	}

	strokeEnd() {
	};
}
