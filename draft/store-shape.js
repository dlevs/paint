const state = {

	colors: {
		primary: "#333",
		secondary: "#fff"
	},
	currentTool: "PENCIL",
	toolSettings: {
		PENCIL: {
			size: 4
		},
		BRUSH: {
			size: 6,
			feather: 3
		},
		FILL: {
			mode: "FILL_ENTIRE_LAYER"
		}
	},
	history: {
		past: [],
		future: [],
		present: {
			layers: {
				image: "image/base64",
				opacity: 0.9,
				visible: true
			},
			imageThumb: "image/base64"
		}
	}

};
