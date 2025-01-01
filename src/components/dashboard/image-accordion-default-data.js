const imageAccordionDefaultData = {
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
		},
		hover: {
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
	contentWrap: {
		options: {
			class: "content-wrap",
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
				Desktop: "-200px",
			},
		},
	},
	content: {
		options: {
			content: "",
			tag: "div",
			class: "content",
		},
		styles: {},
	},
	title: {
		options: {
			content: "",
			tag: "div",
			class: "title",
		},
		styles: {},
	},
	image: {
		options: {
			class: "image",
		},
		styles: {},
	},
};

export default imageAccordionDefaultData;
