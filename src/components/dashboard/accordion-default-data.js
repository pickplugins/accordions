

var accordionDefaultData = {
	globalOptions: {
		viewType: "accordion",

	},

	wrapper: {
		options: {
			content: "",
			tag: "div",
			class: "pg-accordion-nested",
		},
		styles: {},
	},
	items: [
		{
			headerLabel: {
				options: {
					text: "Accordion Header 1",
					tag: "",
					class: "accordion-header-label",
				},
			},
			content: {
				options: {
					tag: "",
					class: "accordion-content",
					text: "Accordion content 1",
				},
			},
		},
		{
			headerLabel: {
				options: {
					text: "Accordion Header 2",
					tag: "",
					class: "accordion-header-label",
				},
			},
			content: {
				options: {
					tag: "",
					class: "accordion-content",
					text: "Accordion content 2",
				},
			},
		},
		{
			headerLabel: {
				options: {
					text: "Accordion Header 3",
					tag: "",
					class: "accordion-header-label",
				},
			},
			content: {
				options: {
					tag: "",
					class: "accordion-content",
					text: "Accordion content 3",
				},
			},
		},
	],
	content: {
		options: {
			tag: "div",
			class: "accordion-content",
		},
		styles: {
			padding: { Desktop: "15px 15px 15px 15px" },
			backgroundColor: { Desktop: "#d5d4d9" },
		},
	},
	header: {
		options: {
			tag: "div",
			class: "accordion-header",
		},
		styles: {
			display: { Desktop: "flex" },
			gap: { Desktop: "1em" },
			padding: { Desktop: "12px 12px 12px 12px" },
			backgroundColor: { Desktop: "#9DD6DF" },
			margin: { Desktop: "0px 0px 1px 0px" },
			fontSize: { Desktop: "16px" },
		},
	},
	headerActive: {
		options: {
			tag: "div",
			class: "accordion-header-active",
		},
		styles: {},
	},
	headerLabel: {
		options: {
			text: "Accordion Header",
			tag: "div",
			class: "accordion-header-label",
		},
		styles: {},
	},
	labelCounter: {
		options: {
			enable: false,
			position: "",
			tag: "div",
			class: "accordion-label-counter",
		},
		styles: {},
	},
	labelIcon: {
		options: {
			library: "fontAwesome",
			srcType: "class",
			iconSrc: "",
			position: "",
			class: "accordion-label-icon",
		},
		styles: {},
	},
	icon: {
		options: {
			library: "fontAwesome",
			srcType: "class",
			iconSrc: "fas fa-angle-down",
			position: "left",
			class: "accordion-icon",
		},
		styles: {},
	},
	iconToggle: {
		options: {
			library: "fontAwesome",
			srcType: "class",
			iconSrc: " fas fa-angle-up",
			class: "accordion-icon-toggle",
		},
		styles: {},
	},
	accOptions: {
		active: "9999",
		collapsible: true,
		heightStyle: "content",
	},
};
export default accordionDefaultData;
