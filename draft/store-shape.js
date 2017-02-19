const state = {
	colors: {
		primary: "#333",
		secondary: "#fff"
	},
	currentTool: "PENCIL",
	toolSettings: {
		PENCIL: {
			size: 4,
			drawStyle: "CALLIGTAPHY"
		},
		// BRUSH: {
		// 	size: 6,
		// 	feather: 3
		// },
		EMOJI: {
			drawStyle: "STAMP",
			character: "😀",
			interpolation: true
		},
		TEXT: {
			FONT,
			SIZE,

			// This is for code, not state. Don't put in redux state
			maintainState: [
				"colors.primary",
				"&FONT",
				"&SIZE"

			]
		},
		FILL: {
			mode: "FILL_ENTIRE_LAYER"
		}
	},
	history: {
		past: [],
		future: [],
		present: {
			currentLayer: 0,
			layers: {
				// can we normalise state? Store image data in one object, reference in history, so strings aren't duplicated
				image: "image/base64",
				// layers need to be stored at full opacity. Set global opacity on display canvas when applying
				opacity: 0.9,
				visible: true,
				//
				name: "background",
				id: 0,


				// settings which should be applied to main state upon selecting this layer. This can be generated automatically. Set paths to store in the tool
				applyState: {
					colors: {
						"primary": "#ffffff"
					},

					toolSettings: {
						"TEXT": {
							"SIZE": 12,
							FONT: "\"Times New Roman\" serif"
						}
					}
				},
				textContent: "foo" // or null
			},
			imageThumb: "image/base64"
		}
	}
};
