var accordionDefaultData = {
	globalOptions: {
		viewType: "accordion",
		itemSource: "manual",
		search: true,
	},
	itemQueryArgs: [],
	styleObj: {},
	reponsiveCss: "",
	wrapper: {
		options: {

			tag: "div",
			class: "tabs-wrapper",
		},
		styles: {},
	},
	items: [
		{
			active: 0,
			hideOnSchema: 0,
			headerLabelText: "Accordion Header 1 ",
			headerLabelSlug: "",
			headerLabelToggledText: "",
			contentText: "Accordion Content 1",
		},
		{
			active: 0,
			hideOnSchema: 0,
			headerLabelText: "Accordion Header 2",
			headerLabelSlug: "",
			headerLabelToggledText: "",
			contentText: "Accordion Content 2",
		},
		{
			active: 0,
			hideOnSchema: 0,
			headerLabelText: "Accordion Header 3",
			headerLabelSlug: "",
			headerLabelToggledText: "",
			contentText: "Accordion Content 3",
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
			tag: "a",
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
	searchInput: {
		options: {
			placeholder: "",
			class: "search-input",
		},
		styles: {},
	},
	expandCollapseAll: {
		options: {
			enable: false,
			class: "expand-collapse-all",
			expandAllText: "Expand All",
			collapseAllText: "Collapse All",
			expandAllIcon: {
				library: "fontAwesome",
				srcType: "class",
				iconSrc: " fas fa-angle-up",
			},
			collapseAllIcon: {
				library: "fontAwesome",
				srcType: "class",
				iconSrc: " fas fa-angle-up",
			},
		},
		styles: {},
	},
	topWrap: {
		options: {
			class: "top-wrap",
		},
		styles: {},
	},

};

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
			class: "accordions-wrapper",
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
var imageAccordionDefaultData = {
	globalOptions: {
		viewType: "imageAccordion",
		itemSource: "manual",
		search: true,
	},
	itemQueryArgs: [],
	styleObj: {},
	responsiveCss: "",
	wrapper: {
		options: {
			content: "",
			tag: "div",
			class: "image-accordion-wrapper",
		},
		styles: {},
	},
	itemsWrap: {
		options: {
			content: "",
			tag: "div",
			class: "items",
		},
		styles: {
			height: {
				Desktop: "70vh",
			},
			width: {
				Desktop: "100%",
			},
			display: {
				Desktop: "flex",
			},
		},
	},



	items: [
		{
			isActive: false,
			image: {
				id: "",
				url: "",
				altText: "",
			},
			link: "",
			title: "What is Lorem Ipsum?",
			content:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
		},
	],
	item: {
		options: {
			content: "",
			tag: "div",
			class: "image-accordion-item",
		},
		styles: {
			height: {
				Desktop: "100%",
			},
			backgroundPosition: {
				Desktop: "center center",
			},
			backgroundSize: {
				Desktop: "cover",
			},
			flexBasis: {
				Desktop: "0%",
			},
			flexGrow: {
				Desktop: "1",
			},
			flexShrink: {
				Desktop: "1",
			},
			position: {
				Desktop: "relative",
			},
			overflow: {
				Desktop: "hidden",
			},
			transition: {
				Desktop: "all 1s ease-in-out 0s",
			},
		},

	},
	itemActive: {
		options: {

		},
		styles: {
			flexBasis: {
				Desktop: "0%",
			},
			flexGrow: {
				Desktop: "8",
			},
			flexShrink: {
				Desktop: "1",
			},
		},
	},

	overlay: {
		options: {
			class: "image-accordion-overlay",
		},
		styles: {
			backgroundColor: {
				Desktop: "#ffffff",
			},
			padding: {
				Desktop: "20px 20px 20px 20px",
			},
			position: {
				Desktop: "absolute",
			},
			left: {
				Desktop: "30px",
			},
			width: {
				Desktop: "80%",
			},
			top: {
				Desktop: "200%",
			},
			transition: {
				Desktop: "all 1s ease-in-out 0s",
			},
		},
	},
	content: {
		options: {
			content: "",
			tag: "div",
			class: "image-accordion-content",
		},
		styles: {},
	},
	title: {
		options: {
			content: "",
			tag: "div",
			class: "image-accordion-title",
		},
		styles: {
			margin: {
				Desktop: "0px 0px 12px 0px",
			},
		},
	},
	image: {
		options: {
			class: "image-accordion-image",
		},
		styles: {
			height: {
				Desktop: "100%",
			},
			width: {
				Desktop: "100%",
			},
			objectFit: {
				Desktop: "cover",
			},
		},
	},
};

var accordionMenuDefaultData = {
	globalOptions: {
		viewType: "accordionMenu",
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
			class: "accordion-menu-wrapper",
		},
		styles: {},
	},
	item: {
		options: {
			content: "",
			tag: "div",
			class: "image-accordion-item",
		},
		styles: {},
	},



	items: [
		{
			"isActive": false,
			"image": {
				id: "",
				url: "",
				altText: "",
			},
			link: "",
			"title": "What is Lorem Ipsum?",
			"content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		},



	],


};

export default { accordionDefaultData, tabsDefaultData, imageAccordionDefaultData, accordionMenuDefaultData };
