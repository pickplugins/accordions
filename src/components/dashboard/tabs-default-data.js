

var tabsDefaultData = {
	globalOptions: {
		viewType: "tabs",
		itemSource: "manual",
		search: true,
	},
	itemQueryArgs: [],
	styleObj: {},
	reponsiveCss: "",
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
			"headerLabelSlug": "",
			"headerLabelText": "What is Lorem Ipsum?",
			"contentText": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",



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
			class: "navs-wrapper"
		},
		"styles": {
			"display": {
				"Desktop": "flex"
			},
			"gap": {
				"Desktop": "1em"
			},
			"alignItems": {
				"Desktop": "center"
			}
		}
	},
	navItem: {
		options: {
			class: "nav-item "
		},
		"styles": {
			"padding": {
				"Desktop": "15px 15px 15px 15px"
			},
			"backgroundColor": {
				"Desktop": "#735efbfa"
			},
			"borderRadius": {
				"Desktop": "3px 3px 3px 3px"
			},
			"color": {
				"Desktop": "#ffffff"
			},
			"display": {
				"Desktop": "flex"
			},
			"justifyContent": {
				"Desktop": "start"
			},
			"gap": {
				"Desktop": "1em"
			}
		}
	},
	activeNavItem: {
		options: {
			class: "nav-item-active",
			id: ""
		},
		"styles": {
			"backgroundColor": {
				"Desktop": "#462aff"
			}
		}
	},
	navLabel: {
		options: {
			class: ""
		},
		styles: {}
	},
	panelsWrap: {
		options: {
			class: "panels-wrap"
		},
		styles: {}
	},


	panelWrap: {
		options: {
			class: "tabs-panel "
		},
		"styles": {
			"padding": {
				"Desktop": "15px 15px 15px 15px"
			},
			"backgroundColor": {
				"Desktop": "#ffffff"
			},
			"margin": {
				"Desktop": "15px 0px 0px 0px"
			},
			"borderRadius": {
				"Desktop": "5px 5px 5px 5px"
			}
		}
	},
	panelWrapActive: {
		options: {
			class: "tabs-panel-active"
		},
		styles: {
			"display": {
				"Desktop": "block"
			},
		}
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
			position: "before",
			class: " nav-icon-idle nav-icon"
		},
		styles: {},
	},
	iconToggle: {
		options: {
			library: "fontAwesome",
			srcType: "class",
			iconSrc: " fas fa-angle-up",
			class: "nav-icon-toggle nav-icon"
		},
		styles: {},
	},
	labelIcon: {
		options: {
			library: "fontAwesome",
			srcType: "class",
			iconSrc: "",
			position: "beforeLabel",
			class: "label-icon",
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
