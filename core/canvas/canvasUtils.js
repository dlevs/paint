export const distanceBetween = (point1, point2) => {
	return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
};

export const angleBetween = (point1, point2) => {
	return Math.atan2(point2.x - point1.x, point2.y - point1.y);
};

export const drawPoints = (point1, point2, maxDistance, draw) => {
	const distance = distanceBetween(point1, point2);
	const angle = angleBetween(point1, point2);

	for (let i = 0; i < distance; i += maxDistance) {
		draw({
			x: point1.x + (Math.sin(angle) * i),
			y: point1.y + (Math.cos(angle) * i)
		});
	}
};

export const getOffsetPoint = ({x, y}, offset) => ({
	x: x - offset,
	y: y + offset
});
