const { Component, RawHTML, useState, useEffect } = wp.element;

import {
	Icon,
	close,
	settings,
	cloud,
	plus,
	brush,
	mediaAndText,
} from "@wordpress/icons";
import { ReactSortable } from "react-sortablejs";
import {
	PanelBody,
	RangeControl,
	Button,
	ButtonGroup,
	Panel,
	PanelRow,
	Dropdown,
	DropdownMenu,
	SelectControl,
	ColorPicker,
	ColorPalette,
	ToolsPanelItem,
	ComboboxControl,
	Spinner,
	CustomSelectControl,
	Popover,
	__experimentalInputControl as InputControl,
} from "@wordpress/components";
import apiFetch from "@wordpress/api-fetch";

import PGtabs from "../tabs";
import PGtab from "../tab";
import PGStyles from "../styles";
import PGIconPicker from "../icon-picker";

var myStore = wp.data.select("postgrid-shop");

function Html(props) {
	if (!props.warn) {
		return null;
	}

	var onChange = props.onChange;

	var breakPointX = "Desktop";

	var defaultPostData = {
		wrapper: {
			options: {
				class: "wrapper",
			},
			styles: {
				color: {
					Desktop: "#000000",
				},
			},
		},
		header: {
			options: {
				class: "header",
			},
			styles: {
				color: {
					Desktop: "#000000",
				},
			},
		},
		headerActive: {
			options: {
				class: "header-active",
			},
			styles: {
				color: {
					Desktop: "#000000",
				},
			},
		},
		headerLabel: {
			options: {
				class: "header-label",
			},
			styles: {
				color: {
					Desktop: "#000000",
				},
			},
		},
		labelIcon: {
			options: {
				enable: true,
				library: "fontAwesome",
				srcType: "class",
				iconSrc: "",
				position: "before",
				class: "label-icon",
			},
			styles: {},
		},
		labelCounter: {
			options: {
				position: "before",
				class: "label-counter",
			},
			styles: {},
		},
		content: {
			options: {
				class: "content",
			},
			styles: {
				color: {
					Desktop: "#000000",
				},
			},
		},
		icon: {
			options: {
				enable: true,
				library: "fontAwesome",
				srcType: "class",
				iconSrc: "fas fa-angle-right",
				position: "beforeText",
				class: "icon",
			},
			styles: {},
		},
		iconToggle: {
			options: {
				class: "icon-toggle",
				library: "fontAwesome",
				srcType: "class",
				iconSrc: "fas fa-angle-down",
			},
			styles: {
				color: {
					Desktop: "#000000",
				},
			},
		},

		items: [
			{
				header: {
					label: "Label 1",
					labelToggle: "Label 1 Toggle",
					icon: "",
					iconToggle: "",
				},
				content: { text: "Accordion content 1" },
			},
			{
				header: { label: "Label 2" },
				content: { text: "Accordion content 3" },
			},
		],
		blockCssY: { items: [] },
	};

	var accordionDataX =
		props.accordionData.post_content == null ||
		props.accordionData.post_content.length == 0
			? defaultPostData
			: props.accordionData;

	var [accordionData, setaccordionData] = useState(accordionDataX); // Using the hook.
	var [wrapper, setwrapper] = useState(accordionData.wrapper); // Using the hook.
	var [header, setheader] = useState(accordionData.header);
	var [headerActive, setheaderActive] = useState(accordionData.headerActive);
	var [headerLabel, setheaderLabel] = useState(accordionData.headerLabel);
	var [labelIcon, setlabelIcon] = useState(accordionData.labelIcon);
	var [labelCounter, setlabelCounter] = useState(accordionData.labelCounter);
	var [content, setcontent] = useState(accordionData.content);
	var [icon, seticon] = useState(accordionData.icon);
	var [iconToggle, seticonToggle] = useState(accordionData.iconToggle);
	var [blockCssY, setblockCssY] = useState(accordionData.blockCssY);

	var wrapperSelector = "." + wrapper.options.class;
	var headerSelector = "." + header.options.class;
	var headerActiveSelector = "." + headerActive.options.class;
	var headerLabelSelector = "." + headerLabel.options.class;
	var labelIconSelector = "." + labelIcon.options.class;
	var labelCounterSelector = "." + labelCounter.options.class;
	var contentSelector = "." + content.options.class;
	var iconSelector = "." + icon.options.class;
	var iconToggleSelector = "." + iconToggle.options.class;

	var blockId = "";

	useEffect(() => {
		myStore.generateBlockCss(blockCssY.items, blockId);
	}, [blockCssY]);

	function onChangeStyleWrapper(sudoScource, newVal, attr) {
		var path = [sudoScource, attr, breakPointX];
		let obj = { ...wrapper };
		const object = myStore.updatePropertyDeep(obj, path, newVal);

		setwrapper(object);

		var elementSelector = myStore.getElementSelector(
			sudoScource,
			wrapperSelector
		);
		var cssPropty = myStore.cssAttrParse(attr);

		let itemsX = Object.assign({}, blockCssY.items);

		if (itemsX[elementSelector] == undefined) {
			itemsX[elementSelector] = {};
		}

		var cssPath = [elementSelector, cssPropty, breakPointX];
		const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

		setblockCssY({ items: cssItems });
	}

	function onRemoveStyleWrapper(sudoScource, key) {
		let obj = { ...wrapper };
		var object = myStore.deletePropertyDeep(obj, [
			sudoScource,
			key,
			breakPointX,
		]);

		setwrapper(object);

		setblockCssY({ items: cssItems });
	}

	function onAddStyleWrapper(sudoScource, key) {
		var path = [sudoScource, key, breakPointX];
		let obj = { ...wrapper };

		const object = myStore.addPropertyDeep(obj, path, "");
		setwrapper(object);
	}

	function onBulkAddWrapper(sudoScource, cssObj) {
		let obj = { ...wrapper };
		obj[sudoScource] = cssObj;

		setwrapper(obj);

		var selector = myStore.getElementSelector(sudoScource, wrapperSelector);
		var stylesObj = {};

		Object.entries(cssObj).map((args) => {
			var attr = args[0];
			var cssPropty = myStore.cssAttrParse(attr);

			if (stylesObj[selector] == undefined) {
				stylesObj[selector] = {};
			}

			if (stylesObj[selector][cssPropty] == undefined) {
				stylesObj[selector][cssPropty] = {};
			}

			stylesObj[selector][cssPropty] = args[1];
		});

		var cssItems = { ...blockCssY.items };

		setblockCssY({ items: cssItems });
	}

	function onResetWrapper(sudoSources) {
		let obj = { ...wrapper };

		Object.entries(sudoSources).map((args) => {
			var sudoScource = args[0];
			if (obj[sudoScource] == undefined) {
			} else {
				obj[sudoScource] = {};
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					wrapperSelector
				);

				var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
					elementSelector,
				]);
				setblockCssY({ items: cssObject });
			}
		});

		setwrapper(obj);
	}

	// //header

	function onChangeStyleheader(sudoScource, newVal, attr) {
		var path = [sudoScource, attr, breakPointX];
		let obj = { ...header };
		const object = myStore.updatePropertyDeep(obj, path, newVal);

		setheader(object);

		var elementSelector = myStore.getElementSelector(
			sudoScource,
			headerSelector
		);
		var cssPropty = myStore.cssAttrParse(attr);

		let itemsX = Object.assign({}, blockCssY.items);

		if (itemsX[elementSelector] == undefined) {
			itemsX[elementSelector] = {};
		}

		var cssPath = [elementSelector, cssPropty, breakPointX];
		const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

		setblockCssY({ items: cssItems });
	}

	function onRemoveStyleheader(sudoScource, key) {
		let obj = { ...header };
		var object = myStore.deletePropertyDeep(obj, [
			sudoScource,
			key,
			breakPointX,
		]);

		setheader(object);

		setblockCssY({ items: cssItems });
	}

	function onAddStyleheader(sudoScource, key) {
		var path = [sudoScource, key, breakPointX];
		let obj = { ...header };

		const object = myStore.addPropertyDeep(obj, path, "");
		setheader(object);
	}

	function onBulkAddheader(sudoScource, cssObj) {
		let obj = { ...header };
		obj[sudoScource] = cssObj;

		setheader(obj);

		var selector = myStore.getElementSelector(sudoScource, headerSelector);
		var stylesObj = {};

		Object.entries(cssObj).map((args) => {
			var attr = args[0];
			var cssPropty = myStore.cssAttrParse(attr);

			if (stylesObj[selector] == undefined) {
				stylesObj[selector] = {};
			}

			if (stylesObj[selector][cssPropty] == undefined) {
				stylesObj[selector][cssPropty] = {};
			}

			stylesObj[selector][cssPropty] = args[1];
		});

		var cssItems = { ...blockCssY.items };

		setblockCssY({ items: cssItems });
	}

	function onResetheader(sudoSources) {
		let obj = { ...header };

		Object.entries(sudoSources).map((args) => {
			var sudoScource = args[0];
			if (obj[sudoScource] == undefined) {
			} else {
				obj[sudoScource] = {};
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					headerSelector
				);

				var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
					elementSelector,
				]);
				setblockCssY({ items: cssObject });
			}
		});

		setheader(obj);
	}

	// //headerActive

	function onChangeStyleheaderActive(sudoScource, newVal, attr) {
		var path = [sudoScource, attr, breakPointX];
		let obj = { ...headerActive };
		const object = myStore.updatePropertyDeep(obj, path, newVal);

		setheaderActive(object);

		var elementSelector = myStore.getElementSelector(
			sudoScource,
			headerActiveSelector
		);
		var cssPropty = myStore.cssAttrParse(attr);

		let itemsX = Object.assign({}, blockCssY.items);

		if (itemsX[elementSelector] == undefined) {
			itemsX[elementSelector] = {};
		}

		var cssPath = [elementSelector, cssPropty, breakPointX];
		const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

		setblockCssY({ items: cssItems });
	}

	function onRemoveStyleheaderActive(sudoScource, key) {
		let obj = { ...headerActive };
		var object = myStore.deletePropertyDeep(obj, [
			sudoScource,
			key,
			breakPointX,
		]);

		setheaderActive(object);

		setblockCssY({ items: cssItems });
	}

	function onAddStyleheaderActive(sudoScource, key) {
		var path = [sudoScource, key, breakPointX];
		let obj = { ...headerActive };

		const object = myStore.addPropertyDeep(obj, path, "");
		setheaderActive(object);
	}

	function onBulkAddheaderActive(sudoScource, cssObj) {
		let obj = { ...headerActive };
		obj[sudoScource] = cssObj;

		setheaderActive(obj);

		var selector = myStore.getElementSelector(
			sudoScource,
			headerActiveSelector
		);
		var stylesObj = {};

		Object.entries(cssObj).map((args) => {
			var attr = args[0];
			var cssPropty = myStore.cssAttrParse(attr);

			if (stylesObj[selector] == undefined) {
				stylesObj[selector] = {};
			}

			if (stylesObj[selector][cssPropty] == undefined) {
				stylesObj[selector][cssPropty] = {};
			}

			stylesObj[selector][cssPropty] = args[1];
		});

		var cssItems = { ...blockCssY.items };

		setblockCssY({ items: cssItems });
	}

	function onResetheaderActive(sudoSources) {
		let obj = { ...headerActive };

		Object.entries(sudoSources).map((args) => {
			var sudoScource = args[0];
			if (obj[sudoScource] == undefined) {
			} else {
				obj[sudoScource] = {};
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					headerActiveSelector
				);

				var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
					elementSelector,
				]);
				setblockCssY({ items: cssObject });
			}
		});

		setheaderActive(obj);
	}

	// //headerLabel

	function onChangeStyleheaderLabel(sudoScource, newVal, attr) {
		var path = [sudoScource, attr, breakPointX];
		let obj = { ...headerLabel };
		const object = myStore.updatePropertyDeep(obj, path, newVal);

		setheaderLabel(object);

		var elementSelector = myStore.getElementSelector(
			sudoScource,
			headerLabelSelector
		);
		var cssPropty = myStore.cssAttrParse(attr);

		let itemsX = Object.assign({}, blockCssY.items);

		if (itemsX[elementSelector] == undefined) {
			itemsX[elementSelector] = {};
		}

		var cssPath = [elementSelector, cssPropty, breakPointX];
		const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

		setblockCssY({ items: cssItems });
	}

	function onRemoveStyleheaderLabel(sudoScource, key) {
		let obj = { ...headerLabel };
		var object = myStore.deletePropertyDeep(obj, [
			sudoScource,
			key,
			breakPointX,
		]);

		setheaderLabel(object);

		setblockCssY({ items: cssItems });
	}

	function onAddStyleheaderLabel(sudoScource, key) {
		var path = [sudoScource, key, breakPointX];
		let obj = { ...headerLabel };

		const object = myStore.addPropertyDeep(obj, path, "");
		setheaderLabel(object);
	}

	function onBulkAddheaderLabel(sudoScource, cssObj) {
		let obj = { ...headerLabel };
		obj[sudoScource] = cssObj;

		setheaderLabel(obj);

		var selector = myStore.getElementSelector(
			sudoScource,
			headerLabelSelector
		);
		var stylesObj = {};

		Object.entries(cssObj).map((args) => {
			var attr = args[0];
			var cssPropty = myStore.cssAttrParse(attr);

			if (stylesObj[selector] == undefined) {
				stylesObj[selector] = {};
			}

			if (stylesObj[selector][cssPropty] == undefined) {
				stylesObj[selector][cssPropty] = {};
			}

			stylesObj[selector][cssPropty] = args[1];
		});

		var cssItems = { ...blockCssY.items };

		setblockCssY({ items: cssItems });
	}

	function onResetheaderLabel(sudoSources) {
		let obj = { ...headerLabel };

		Object.entries(sudoSources).map((args) => {
			var sudoScource = args[0];
			if (obj[sudoScource] == undefined) {
			} else {
				obj[sudoScource] = {};
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					headerLabelSelector
				);

				var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
					elementSelector,
				]);
				setblockCssY({ items: cssObject });
			}
		});

		setheaderLabel(obj);
	}

	// //labelIcon

	function onChangeStylelabelIcon(sudoScource, newVal, attr) {
		var path = [sudoScource, attr, breakPointX];
		let obj = { ...labelIcon };
		const object = myStore.updatePropertyDeep(obj, path, newVal);

		setlabelIcon(object);

		var elementSelector = myStore.getElementSelector(
			sudoScource,
			labelIconSelector
		);
		var cssPropty = myStore.cssAttrParse(attr);

		let itemsX = Object.assign({}, blockCssY.items);

		if (itemsX[elementSelector] == undefined) {
			itemsX[elementSelector] = {};
		}

		var cssPath = [elementSelector, cssPropty, breakPointX];
		const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

		setblockCssY({ items: cssItems });
	}

	function onRemoveStylelabelIcon(sudoScource, key) {
		let obj = { ...labelIcon };
		var object = myStore.deletePropertyDeep(obj, [
			sudoScource,
			key,
			breakPointX,
		]);

		setlabelIcon(object);

		setblockCssY({ items: cssItems });
	}

	function onAddStylelabelIcon(sudoScource, key) {
		var path = [sudoScource, key, breakPointX];
		let obj = { ...labelIcon };

		const object = myStore.addPropertyDeep(obj, path, "");
		setlabelIcon(object);
	}

	function onBulkAddlabelIcon(sudoScource, cssObj) {
		let obj = { ...labelIcon };
		obj[sudoScource] = cssObj;

		setlabelIcon(obj);

		var selector = myStore.getElementSelector(
			sudoScource,
			labelIconSelector
		);
		var stylesObj = {};

		Object.entries(cssObj).map((args) => {
			var attr = args[0];
			var cssPropty = myStore.cssAttrParse(attr);

			if (stylesObj[selector] == undefined) {
				stylesObj[selector] = {};
			}

			if (stylesObj[selector][cssPropty] == undefined) {
				stylesObj[selector][cssPropty] = {};
			}

			stylesObj[selector][cssPropty] = args[1];
		});

		var cssItems = { ...blockCssY.items };

		setblockCssY({ items: cssItems });
	}

	function onResetlabelIcon(sudoSources) {
		let obj = { ...labelIcon };

		Object.entries(sudoSources).map((args) => {
			var sudoScource = args[0];
			if (obj[sudoScource] == undefined) {
			} else {
				obj[sudoScource] = {};
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					labelIconSelector
				);

				var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
					elementSelector,
				]);
				setblockCssY({ items: cssObject });
			}
		});

		setlabelIcon(obj);
	}

	// //labelCounter

	function onChangeStylelabelCounter(sudoScource, newVal, attr) {
		var path = [sudoScource, attr, breakPointX];
		let obj = { ...labelCounter };
		const object = myStore.updatePropertyDeep(obj, path, newVal);

		setlabelCounter(object);

		var elementSelector = myStore.getElementSelector(
			sudoScource,
			labelCounterSelector
		);
		var cssPropty = myStore.cssAttrParse(attr);

		let itemsX = Object.assign({}, blockCssY.items);

		if (itemsX[elementSelector] == undefined) {
			itemsX[elementSelector] = {};
		}

		var cssPath = [elementSelector, cssPropty, breakPointX];
		const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

		setblockCssY({ items: cssItems });
	}

	function onRemoveStylelabelCounter(sudoScource, key) {
		let obj = { ...labelCounter };
		var object = myStore.deletePropertyDeep(obj, [
			sudoScource,
			key,
			breakPointX,
		]);

		setlabelCounter(object);

		setblockCssY({ items: cssItems });
	}

	function onAddStylelabelCounter(sudoScource, key) {
		var path = [sudoScource, key, breakPointX];
		let obj = { ...labelCounter };

		const object = myStore.addPropertyDeep(obj, path, "");
		setlabelCounter(object);
	}

	function onBulkAddlabelCounter(sudoScource, cssObj) {
		let obj = { ...labelCounter };
		obj[sudoScource] = cssObj;

		setlabelCounter(obj);

		var selector = myStore.getElementSelector(
			sudoScource,
			labelCounterSelector
		);
		var stylesObj = {};

		Object.entries(cssObj).map((args) => {
			var attr = args[0];
			var cssPropty = myStore.cssAttrParse(attr);

			if (stylesObj[selector] == undefined) {
				stylesObj[selector] = {};
			}

			if (stylesObj[selector][cssPropty] == undefined) {
				stylesObj[selector][cssPropty] = {};
			}

			stylesObj[selector][cssPropty] = args[1];
		});

		var cssItems = { ...blockCssY.items };

		setblockCssY({ items: cssItems });
	}

	function onResetlabelCounter(sudoSources) {
		let obj = { ...labelCounter };

		Object.entries(sudoSources).map((args) => {
			var sudoScource = args[0];
			if (obj[sudoScource] == undefined) {
			} else {
				obj[sudoScource] = {};
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					labelCounterSelector
				);

				var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
					elementSelector,
				]);
				setblockCssY({ items: cssObject });
			}
		});

		setlabelCounter(obj);
	}

	// //content

	function onChangeStylecontent(sudoScource, newVal, attr) {
		var path = [sudoScource, attr, breakPointX];
		let obj = { ...content };
		const object = myStore.updatePropertyDeep(obj, path, newVal);

		setcontent(object);

		var elementSelector = myStore.getElementSelector(
			sudoScource,
			contentSelector
		);
		var cssPropty = myStore.cssAttrParse(attr);

		let itemsX = Object.assign({}, blockCssY.items);

		if (itemsX[elementSelector] == undefined) {
			itemsX[elementSelector] = {};
		}

		var cssPath = [elementSelector, cssPropty, breakPointX];
		const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

		setblockCssY({ items: cssItems });
	}

	function onRemoveStylecontent(sudoScource, key) {
		let obj = { ...content };
		var object = myStore.deletePropertyDeep(obj, [
			sudoScource,
			key,
			breakPointX,
		]);

		setcontent(object);

		setblockCssY({ items: cssItems });
	}

	function onAddStylecontent(sudoScource, key) {
		var path = [sudoScource, key, breakPointX];
		let obj = { ...content };

		const object = myStore.addPropertyDeep(obj, path, "");
		setcontent(object);
	}

	function onBulkAddcontent(sudoScource, cssObj) {
		let obj = { ...content };
		obj[sudoScource] = cssObj;

		setcontent(obj);

		var selector = myStore.getElementSelector(
			sudoScource,
			contentSelector
		);
		var stylesObj = {};

		Object.entries(cssObj).map((args) => {
			var attr = args[0];
			var cssPropty = myStore.cssAttrParse(attr);

			if (stylesObj[selector] == undefined) {
				stylesObj[selector] = {};
			}

			if (stylesObj[selector][cssPropty] == undefined) {
				stylesObj[selector][cssPropty] = {};
			}

			stylesObj[selector][cssPropty] = args[1];
		});

		var cssItems = { ...blockCssY.items };

		setblockCssY({ items: cssItems });
	}

	function onResetcontent(sudoSources) {
		let obj = { ...content };

		Object.entries(sudoSources).map((args) => {
			var sudoScource = args[0];
			if (obj[sudoScource] == undefined) {
			} else {
				obj[sudoScource] = {};
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					contentSelector
				);

				var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
					elementSelector,
				]);
				setblockCssY({ items: cssObject });
			}
		});

		setcontent(obj);
	}

	// //labelIcon

	function onChangeStylelabelIcon(sudoScource, newVal, attr) {
		var path = [sudoScource, attr, breakPointX];
		let obj = { ...labelIcon };
		const object = myStore.updatePropertyDeep(obj, path, newVal);

		setlabelIcon(object);

		var elementSelector = myStore.getElementSelector(
			sudoScource,
			labelIconSelector
		);
		var cssPropty = myStore.cssAttrParse(attr);

		let itemsX = Object.assign({}, blockCssY.items);

		if (itemsX[elementSelector] == undefined) {
			itemsX[elementSelector] = {};
		}

		var cssPath = [elementSelector, cssPropty, breakPointX];
		const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

		setblockCssY({ items: cssItems });
	}

	function onRemoveStylelabelIcon(sudoScource, key) {
		let obj = { ...labelIcon };
		var object = myStore.deletePropertyDeep(obj, [
			sudoScource,
			key,
			breakPointX,
		]);

		setlabelIcon(object);

		setblockCssY({ items: cssItems });
	}

	function onAddStylelabelIcon(sudoScource, key) {
		var path = [sudoScource, key, breakPointX];
		let obj = { ...labelIcon };

		const object = myStore.addPropertyDeep(obj, path, "");
		setlabelIcon(object);
	}

	function onBulkAddlabelIcon(sudoScource, cssObj) {
		let obj = { ...labelIcon };
		obj[sudoScource] = cssObj;

		setlabelIcon(obj);

		var selector = myStore.getElementSelector(
			sudoScource,
			labelIconSelector
		);
		var stylesObj = {};

		Object.entries(cssObj).map((args) => {
			var attr = args[0];
			var cssPropty = myStore.cssAttrParse(attr);

			if (stylesObj[selector] == undefined) {
				stylesObj[selector] = {};
			}

			if (stylesObj[selector][cssPropty] == undefined) {
				stylesObj[selector][cssPropty] = {};
			}

			stylesObj[selector][cssPropty] = args[1];
		});

		var cssItems = { ...blockCssY.items };

		setblockCssY({ items: cssItems });
	}

	function onResetlabelIcon(sudoSources) {
		let obj = { ...labelIcon };

		Object.entries(sudoSources).map((args) => {
			var sudoScource = args[0];
			if (obj[sudoScource] == undefined) {
			} else {
				obj[sudoScource] = {};
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					labelIconSelector
				);

				var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
					elementSelector,
				]);
				setblockCssY({ items: cssObject });
			}
		});

		setlabelIcon(obj);
	}

	// //icon

	function onChangeStyleicon(sudoScource, newVal, attr) {
		var path = [sudoScource, attr, breakPointX];
		let obj = { ...icon };
		const object = myStore.updatePropertyDeep(obj, path, newVal);

		seticon(object);

		var elementSelector = myStore.getElementSelector(
			sudoScource,
			iconSelector
		);
		var cssPropty = myStore.cssAttrParse(attr);

		let itemsX = Object.assign({}, blockCssY.items);

		if (itemsX[elementSelector] == undefined) {
			itemsX[elementSelector] = {};
		}

		var cssPath = [elementSelector, cssPropty, breakPointX];
		const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

		setblockCssY({ items: cssItems });
	}

	function onRemoveStyleicon(sudoScource, key) {
		let obj = { ...icon };
		var object = myStore.deletePropertyDeep(obj, [
			sudoScource,
			key,
			breakPointX,
		]);

		seticon(object);

		setblockCssY({ items: cssItems });
	}

	function onAddStyleicon(sudoScource, key) {
		var path = [sudoScource, key, breakPointX];
		let obj = { ...icon };

		const object = myStore.addPropertyDeep(obj, path, "");
		seticon(object);
	}

	function onBulkAddicon(sudoScource, cssObj) {
		let obj = { ...icon };
		obj[sudoScource] = cssObj;

		seticon(obj);

		var selector = myStore.getElementSelector(
			sudoScource,
			iconSelector
		);
		var stylesObj = {};

		Object.entries(cssObj).map((args) => {
			var attr = args[0];
			var cssPropty = myStore.cssAttrParse(attr);

			if (stylesObj[selector] == undefined) {
				stylesObj[selector] = {};
			}

			if (stylesObj[selector][cssPropty] == undefined) {
				stylesObj[selector][cssPropty] = {};
			}

			stylesObj[selector][cssPropty] = args[1];
		});

		var cssItems = { ...blockCssY.items };

		setblockCssY({ items: cssItems });
	}

	function onReseticon(sudoSources) {
		let obj = { ...icon };

		Object.entries(sudoSources).map((args) => {
			var sudoScource = args[0];
			if (obj[sudoScource] == undefined) {
			} else {
				obj[sudoScource] = {};
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					iconSelector
				);

				var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
					elementSelector,
				]);
				setblockCssY({ items: cssObject });
			}
		});

		seticon(obj);
	}

	// //iconToggle

	function onChangeStyleiconToggle(sudoScource, newVal, attr) {
		var path = [sudoScource, attr, breakPointX];
		let obj = { ...iconToggle };
		const object = myStore.updatePropertyDeep(obj, path, newVal);

		seticonToggle(object);

		var elementSelector = myStore.getElementSelector(
			sudoScource,
			iconToggleSelector
		);
		var cssPropty = myStore.cssAttrParse(attr);

		let itemsX = Object.assign({}, blockCssY.items);

		if (itemsX[elementSelector] == undefined) {
			itemsX[elementSelector] = {};
		}

		var cssPath = [elementSelector, cssPropty, breakPointX];
		const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

		setblockCssY({ items: cssItems });
	}

	function onRemoveStyleiconToggle(sudoScource, key) {
		let obj = { ...iconToggle };
		var object = myStore.deletePropertyDeep(obj, [
			sudoScource,
			key,
			breakPointX,
		]);

		seticonToggle(object);

		setblockCssY({ items: cssItems });
	}

	function onAddStyleiconToggle(sudoScource, key) {
		var path = [sudoScource, key, breakPointX];
		let obj = { ...iconToggle };

		const object = myStore.addPropertyDeep(obj, path, "");
		seticonToggle(object);
	}

	function onBulkAddiconToggle(sudoScource, cssObj) {
		let obj = { ...iconToggle };
		obj[sudoScource] = cssObj;

		seticonToggle(obj);

		var selector = myStore.getElementSelector(
			sudoScource,
			iconToggleSelector
		);
		var stylesObj = {};

		Object.entries(cssObj).map((args) => {
			var attr = args[0];
			var cssPropty = myStore.cssAttrParse(attr);

			if (stylesObj[selector] == undefined) {
				stylesObj[selector] = {};
			}

			if (stylesObj[selector][cssPropty] == undefined) {
				stylesObj[selector][cssPropty] = {};
			}

			stylesObj[selector][cssPropty] = args[1];
		});

		var cssItems = { ...blockCssY.items };

		setblockCssY({ items: cssItems });
	}

	function onReseticonToggle(sudoSources) {
		let obj = { ...iconToggle };

		Object.entries(sudoSources).map((args) => {
			var sudoScource = args[0];
			if (obj[sudoScource] == undefined) {
			} else {
				obj[sudoScource] = {};
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					iconToggleSelector
				);

				var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
					elementSelector,
				]);
				setblockCssY({ items: cssObject });
			}
		});

		seticonToggle(obj);
	}

	function onChangeIcon(arg) {
		var options = {
			...icon.options,
			srcType: arg.srcType,
			library: arg.library,
			iconSrc: arg.iconSrc,
		};
		
		seticon({ ...icon, options: options  });
	}
	function onChangeIconToggle(arg) {
		var options = {
			...iconToggle.options,
			srcType: arg.srcType,
			library: arg.library,
			iconSrc: arg.iconSrc,
		};

		seticonToggle({ ...iconToggle, options: options });
	}
	function onChangeLabelIcon(arg) {
		var options = {
			...labelIcon.options,
			srcType: arg.srcType,
			library: arg.library,
			iconSrc: arg.iconSrc,
		};

		setlabelIcon({ ...labelIcon, options: options });
	}

	return (
		<div className="p-5">
			{/* {JSON.stringify(icon)}
			{JSON.stringify(blockCssY)} */}

			<PanelBody
				className="font-medium text-slate-900 "
				title="Wrapper"
				initialOpen={false}>
				<PGtabs
					activeTab="options"
					orientation="horizontal"
					activeClass="active-tab"
					onSelect={(tabName) => {}}
					tabs={[
						{
							name: "options",
							title: "Options",
							icon: settings,
							className: "tab-settings",
						},
						{
							name: "styles",
							title: "Styles",
							icon: brush,
							className: "tab-style",
						},
						// {
						// 	name: "css",
						// 	title: "CSS Library",
						// 	icon: mediaAndText,
						// 	className: "tab-css",
						// },
					]}>
					<PGtab name="options">
						<div>
							<label htmlFor="" className="font-medium text-slate-900 ">
								Wrapper Class
							</label>
							<InputControl
								value={wrapper.options.class}
								onChange={(newVal) => {
									var accordionDataX = { ...accordionData };

									accordionDataX.wrapper.options.class = newVal;

									setaccordionData(accordionDataX);
								}}
							/>
						</div>
					</PGtab>
					<PGtab name="styles">
						<PGStyles
							obj={wrapper}
							onChange={onChangeStyleWrapper}
							onAdd={onAddStyleWrapper}
							onRemove={onRemoveStyleWrapper}
							onBulkAdd={onBulkAddWrapper}
							onReset={onResetWrapper}
						/>
					</PGtab>
				</PGtabs>
			</PanelBody>
			{/* //*header  */}
			<PanelBody
				className="font-medium text-slate-900 "
				title="Header"
				initialOpen={false}>
				<PGtabs
					activeTab="options"
					orientation="horizontal"
					activeClass="active-tab"
					onSelect={(tabName) => {}}
					tabs={[
						{
							name: "options",
							title: "Options",
							icon: settings,
							className: "tab-settings",
						},
						{
							name: "styles",
							title: "Styles",
							icon: brush,
							className: "tab-style",
						},
						// {
						// 	name: "css",
						// 	title: "CSS Library",
						// 	icon: mediaAndText,
						// 	className: "tab-css",
						// },
					]}>
					<PGtab name="options">
						<div>
							<label htmlFor="" className="font-medium text-slate-900 ">
								Header Class
							</label>
							<InputControl
								value={header.options.class}
								onChange={(newVal) => {
									var accordionDataX = { ...accordionData };

									accordionDataX.header.options.class = newVal;

									setaccordionData(accordionDataX);
								}}
							/>
						</div>
					</PGtab>
					<PGtab name="styles">
						<PGStyles
							obj={header}
							onChange={onChangeStyleheader}
							onAdd={onAddStyleheader}
							onRemove={onRemoveStyleheader}
							onBulkAdd={onBulkAddheader}
							onReset={onResetheader}
						/>
					</PGtab>
				</PGtabs>
			</PanelBody>
			{/* //*headerActive  */}
			<PanelBody
				className="font-medium text-slate-900 "
				title="Header Active"
				initialOpen={false}>
				<PGtabs
					activeTab="options"
					orientation="horizontal"
					activeClass="active-tab"
					onSelect={(tabName) => {}}
					tabs={[
						{
							name: "options",
							title: "Options",
							icon: settings,
							className: "tab-settings",
						},
						{
							name: "styles",
							title: "Styles",
							icon: brush,
							className: "tab-style",
						},
						// {
						// 	name: "css",
						// 	title: "CSS Library",
						// 	icon: mediaAndText,
						// 	className: "tab-css",
						// },
					]}>
					<PGtab name="options">
						<div>
							<label htmlFor="" className="font-medium text-slate-900 ">
								Header Active Class
							</label>
							<InputControl
								value={headerActive.options.class}
								onChange={(newVal) => {
									var accordionDataX = { ...accordionData };

									accordionDataX.headerActive.options.class = newVal;

									setaccordionData(accordionDataX);
								}}
							/>
						</div>
					</PGtab>
					<PGtab name="styles">
						<PGStyles
							obj={headerActive}
							onChange={onChangeStyleheaderActive}
							onAdd={onAddStyleheaderActive}
							onRemove={onRemoveStyleheaderActive}
							onBulkAdd={onBulkAddheaderActive}
							onReset={onResetheaderActive}
						/>
					</PGtab>
				</PGtabs>
			</PanelBody>
			{/* //*headerLabel  */}
			<PanelBody
				className="font-medium text-slate-900 "
				title="Header Label"
				initialOpen={false}>
				<PGtabs
					activeTab="options"
					orientation="horizontal"
					activeClass="active-tab"
					onSelect={(tabName) => {}}
					tabs={[
						{
							name: "options",
							title: "Options",
							icon: settings,
							className: "tab-settings",
						},
						{
							name: "styles",
							title: "Styles",
							icon: brush,
							className: "tab-style",
						},
						// {
						// 	name: "css",
						// 	title: "CSS Library",
						// 	icon: mediaAndText,
						// 	className: "tab-css",
						// },
					]}>
					<PGtab name="options">
						<div>
							<label htmlFor="" className="font-medium text-slate-900 ">
								Header Label Class
							</label>
							<InputControl
								value={headerLabel.options.class}
								onChange={(newVal) => {
									var accordionDataX = { ...accordionData };

									accordionDataX.headerLabel.options.class = newVal;

									setaccordionData(accordionDataX);
								}}
							/>
						</div>
					</PGtab>
					<PGtab name="styles">
						<PGStyles
							obj={headerLabel}
							onChange={onChangeStyleheaderLabel}
							onAdd={onAddStyleheaderLabel}
							onRemove={onRemoveStyleheaderLabel}
							onBulkAdd={onBulkAddheaderLabel}
							onReset={onResetheaderLabel}
						/>
					</PGtab>
				</PGtabs>
			</PanelBody>
			{/* //*labelCounter  */}
			<PanelBody
				className="font-medium text-slate-900 "
				title="Label Counter"
				initialOpen={false}>
				<PGtabs
					activeTab="options"
					orientation="horizontal"
					activeClass="active-tab"
					onSelect={(tabName) => {}}
					tabs={[
						{
							name: "options",
							title: "Options",
							icon: settings,
							className: "tab-settings",
						},
						{
							name: "styles",
							title: "Styles",
							icon: brush,
							className: "tab-style",
						},
						// {
						// 	name: "css",
						// 	title: "CSS Library",
						// 	icon: mediaAndText,
						// 	className: "tab-css",
						// },
					]}>
					<PGtab name="options">
						<div>
							<label htmlFor="" className="font-medium text-slate-900 ">
								Label Counter Class
							</label>
							<InputControl
								value={labelCounter.options.class}
								onChange={(newVal) => {
									var accordionDataX = { ...accordionData };

									accordionDataX.labelCounter.options.class = newVal;

									setaccordionData(accordionDataX);
								}}
							/>
						</div>
						<PanelRow>
							<label htmlFor="" className="font-medium text-slate-900 ">
								Icon position
							</label>

							<SelectControl
								label=""
								value={labelCounter.options.position}
								options={[
									{ label: "Choose Position", value: "" },

									{ label: "Before", value: "before" },
									{ label: "After", value: "after" },
									// { label: "Before Prefix", value: "beforePrefix" },
									// { label: "After Prefix", value: "afterPrefix" },
									// { label: "Before Postfix", value: "beforePostfix" },
									// { label: "After Postfix", value: "afterPostfix" },
									// { label: "Before Link", value: "beforeLink" },
									// { label: "After Link", value: "afterLink" },
								]}
								onChange={(newVal) => {
									var options = { ...labelCounter.options, position: newVal };
									setlabelCounter({ ...labelCounter, options: options });
								}}
							/>
						</PanelRow>
					</PGtab>
					<PGtab name="styles">
						<PGStyles
							obj={labelCounter}
							onChange={onChangeStylelabelCounter}
							onAdd={onAddStylelabelCounter}
							onRemove={onRemoveStylelabelCounter}
							onBulkAdd={onBulkAddlabelCounter}
							onReset={onResetlabelCounter}
						/>
					</PGtab>
				</PGtabs>
			</PanelBody>
			{/* //*labelIcon  */}
			<PanelBody
				className="font-medium text-slate-900 "
				title="Label Icon"
				initialOpen={false}>
				<PGtabs
					activeTab="options"
					orientation="horizontal"
					activeClass="active-tab"
					onSelect={(tabName) => {}}
					tabs={[
						{
							name: "options",
							title: "Options",
							icon: settings,
							className: "tab-settings",
						},
						{
							name: "styles",
							title: "Styles",
							icon: brush,
							className: "tab-style",
						},
						// {
						// 	name: "css",
						// 	title: "CSS Library",
						// 	icon: mediaAndText,
						// 	className: "tab-css",
						// },
					]}>
					<PGtab name="options">
						<div>
							<label htmlFor="" className="font-medium text-slate-900 ">
								Label Icon Class
							</label>
							<InputControl
								value={labelIcon.options.class}
								onChange={(newVal) => {
									var accordionDataX = { ...accordionData };

									accordionDataX.labelIcon.options.class = newVal;

									setaccordionData(accordionDataX);
								}}
							/>
						</div>
						<PanelRow>
							<label htmlFor="" className="font-medium text-slate-900 ">
								Choose Icon
							</label>

							<PGIconPicker
								library={labelIcon.options.library}
								srcType={labelIcon.options.srcType}
								iconSrc={labelIcon.options.iconSrc}
								onChange={onChangeLabelIcon}
							/>
						</PanelRow>

						<PanelRow>
							<label htmlFor="" className="font-medium text-slate-900 ">
								Icon position
							</label>

							<SelectControl
								label=""
								value={icon.options.position}
								options={[
									{ label: "Choose Position", value: "" },

									{ label: "Before", value: "before" },
									{ label: "After", value: "after" },
									// { label: "Before Prefix", value: "beforePrefix" },
									// { label: "After Prefix", value: "afterPrefix" },
									// { label: "Before Postfix", value: "beforePostfix" },
									// { label: "After Postfix", value: "afterPostfix" },
									// { label: "Before Link", value: "beforeLink" },
									// { label: "After Link", value: "afterLink" },
								]}
								onChange={(newVal) => {
									var options = { ...labelIcon.options, position: newVal };
									setlabelIcon({ ...labelIcon, options: options });
								}}
							/>
						</PanelRow>
					</PGtab>
					<PGtab name="styles">
						<PGStyles
							obj={labelIcon}
							onChange={onChangeStylelabelIcon}
							onAdd={onAddStylelabelIcon}
							onRemove={onRemoveStylelabelIcon}
							onBulkAdd={onBulkAddlabelIcon}
							onReset={onResetlabelIcon}
						/>
					</PGtab>
				</PGtabs>
			</PanelBody>
			{/* //*content  */}
			<PanelBody
				className="font-medium text-slate-900 "
				title="Content"
				initialOpen={false}>
				<PGtabs
					activeTab="options"
					orientation="horizontal"
					activeClass="active-tab"
					onSelect={(tabName) => {}}
					tabs={[
						{
							name: "options",
							title: "Options",
							icon: settings,
							className: "tab-settings",
						},
						{
							name: "styles",
							title: "Styles",
							icon: brush,
							className: "tab-style",
						},
						// {
						// 	name: "css",
						// 	title: "CSS Library",
						// 	icon: mediaAndText,
						// 	className: "tab-css",
						// },
					]}>
					<PGtab name="options">
						<div>
							<label htmlFor="" className="font-medium text-slate-900 ">
								Content Class
							</label>
							<InputControl
								value={content.options.class}
								onChange={(newVal) => {
									var accordionDataX = { ...accordionData };

									accordionDataX.content.options.class = newVal;

									setaccordionData(accordionDataX);
								}}
							/>
						</div>
					</PGtab>
					<PGtab name="styles">
						<PGStyles
							obj={content}
							onChange={onChangeStylecontent}
							onAdd={onAddStylecontent}
							onRemove={onRemoveStylecontent}
							onBulkAdd={onBulkAddcontent}
							onReset={onResetcontent}
						/>
					</PGtab>
				</PGtabs>
			</PanelBody>

			{/* //*icon  */}
			<PanelBody
				className="font-medium text-slate-900 "
				title="Icon"
				initialOpen={false}>
				<PGtabs
					activeTab="options"
					orientation="horizontal"
					activeClass="active-tab"
					onSelect={(tabName) => {}}
					tabs={[
						{
							name: "options",
							title: "Options",
							icon: settings,
							className: "tab-settings",
						},
						{
							name: "styles",
							title: "Styles",
							icon: brush,
							className: "tab-style",
						},
						// {
						// 	name: "css",
						// 	title: "CSS Library",
						// 	icon: mediaAndText,
						// 	className: "tab-css",
						// },
					]}>
					<PGtab name="options">
						<div>
							<label htmlFor="" className="font-medium text-slate-900 ">
								Icon Class
							</label>
							<InputControl
								value={icon.options.class}
								onChange={(newVal) => {
									var accordionDataX = { ...accordionData };

									accordionDataX.icon.options.class = newVal;

									setaccordionData(accordionDataX);
								}}
							/>
						</div>
						<PanelRow>
							<label htmlFor="" className="font-medium text-slate-900 ">
								Choose Icon
							</label>

							<PGIconPicker
								library={icon.options.library}
								srcType={icon.options.srcType}
								iconSrc={icon.options.iconSrc}
								onChange={onChangeIcon}
							/>
						</PanelRow>

						<PanelRow>
							<label htmlFor="" className="font-medium text-slate-900 ">
								Icon position
							</label>

							<SelectControl
								label=""
								value={icon.options.position}
								options={[
									{ label: "Choose Position", value: "" },

									{ label: "Before", value: "before" },
									{ label: "After", value: "after" },
									// { label: "Before Prefix", value: "beforePrefix" },
									// { label: "After Prefix", value: "afterPrefix" },
									// { label: "Before Postfix", value: "beforePostfix" },
									// { label: "After Postfix", value: "afterPostfix" },
									// { label: "Before Link", value: "beforeLink" },
									// { label: "After Link", value: "afterLink" },
								]}
								onChange={(newVal) => {
									var options = { ...icon.options, position: newVal };
									seticon({ ...icon, options: options });
								}}
							/>
						</PanelRow>
					</PGtab>
					<PGtab name="styles">
						<PGStyles
							obj={icon}
							onChange={onChangeStyleicon}
							onAdd={onAddStyleicon}
							onRemove={onRemoveStyleicon}
							onBulkAdd={onBulkAddicon}
							onReset={onReseticon}
						/>
					</PGtab>
				</PGtabs>
			</PanelBody>
			{/* //*iconToggle  */}
			<PanelBody
				className="font-medium text-slate-900 "
				title="Icon Toggle"
				initialOpen={false}>
				<PGtabs
					activeTab="options"
					orientation="horizontal"
					activeClass="active-tab"
					onSelect={(tabName) => {}}
					tabs={[
						{
							name: "options",
							title: "Options",
							icon: settings,
							className: "tab-settings",
						},
						{
							name: "styles",
							title: "Styles",
							icon: brush,
							className: "tab-style",
						},
						// {
						// 	name: "css",
						// 	title: "CSS Library",
						// 	icon: mediaAndText,
						// 	className: "tab-css",
						// },
					]}>
					<PGtab name="options">
						<div>
							<label htmlFor="" className="font-medium text-slate-900 ">
								Icon Toggle Class
							</label>
							<InputControl
								value={iconToggle.options.class}
								onChange={(newVal) => {
									var accordionDataX = { ...accordionData };

									accordionDataX.iconToggle.options.class = newVal;

									setaccordionData(accordionDataX);
								}}
							/>
						</div>
						<PanelRow>
							<label htmlFor="" className="font-medium text-slate-900 ">
								Choose Icon
							</label>

							<PGIconPicker
								library={iconToggle.options.library}
								srcType={iconToggle.options.srcType}
								iconSrc={iconToggle.options.iconSrc}
								onChange={onChangeIconToggle}
							/>
						</PanelRow>
					</PGtab>
					<PGtab name="styles">
						<PGStyles
							obj={iconToggle}
							onChange={onChangeStyleiconToggle}
							onAdd={onAddStyleiconToggle}
							onRemove={onRemoveStyleiconToggle}
							onBulkAdd={onBulkAddiconToggle}
							onReset={onReseticonToggle}
						/>
					</PGtab>
				</PGtabs>
			</PanelBody>

			{/* {JSON.stringify(accordionData)} */}
		</div>
	);
}

class AccordionsEdit extends Component {
	constructor(props) {
		super(props);
		this.state = { showWarning: true, isLoaded: false };
		this.handleToggleClick = this.handleToggleClick.bind(this);
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState((state) => ({
				isLoaded: !state.isLoaded,
			}));
		}, 1000);
	}

	handleToggleClick() {
		this.setState((state) => ({
			showWarning: !state.showWarning,
		}));
	}

	render() {
		var { onChange, accordionData } = this.props;

		return (
			<Html
				onChange={onChange}
				accordionData={accordionData}
				warn={this.state.showWarning}
				isLoaded={this.state.isLoaded}
			/>
		);
	}
}

export default AccordionsEdit;
