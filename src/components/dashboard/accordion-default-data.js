

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
			class: "pg-accordion-nested",
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



	accOptions: {
		active: "9999",
		collapsible: true,
		heightStyle: "content",
	},
};
export default accordionDefaultData;
