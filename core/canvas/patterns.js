export const checkered = (size, color1, color2) => {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	const canvasSize = size * 2;

	canvas.width = canvas.height = canvasSize;

	// Fill entire canvas
	ctx.fillStyle = color1;
	ctx.fillRect(0, 0, canvasSize, canvasSize);

	// Fill two squares to make checkered pattern.
	ctx.fillStyle = color2;
	ctx.fillRect(0, 0, size, size);
	ctx.fillRect(size, size, size, size);

	return canvas;
};
