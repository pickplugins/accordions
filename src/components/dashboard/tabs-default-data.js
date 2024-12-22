

var tabsDefaultData = {
	viewType: "accordion",

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
			"isActive": false,
			"headerText": "What is Lorem Ipsum?",
			"content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
			"icon": "fas fa-angle-right",
			"iconToggle": "fas fa-angle-down",
			"styles": {}
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

	navsWrap: {
		options: {
			class: ""
		},
		styles: {}
	},
	navItem: {
		options: {
			class: ""
		},
		styles: {}
	},
	activeNavItem: {
		options: {
			class: "",
			id: ""
		},
		styles: {}
	},
	navLabel: {
		options: {
			class: ""
		},
		styles: {}
	},
	panelWrap: {
		options: {
			position: "left",
			class: ""
		},
		styles: {}
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
export default tabsDefaultData;
