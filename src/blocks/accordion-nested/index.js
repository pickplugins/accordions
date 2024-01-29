import { registerBlockType, createBlock } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { useSelect, select, useDispatch, dispatch } from "@wordpress/data";
import { useEntityRecord } from "@wordpress/core-data";
import {
	createElement,
	useCallback,
	memo,
	useMemo,
	useState,
	useEffect,
} from "@wordpress/element";
import {
	PanelBody,
	RangeControl,
	Button,
	Panel,
	PanelRow,
	Dropdown,
	DropdownMenu,
	SelectControl,
	ColorPicker,
	ColorPalette,
	ToolsPanelItem,
	ComboboxControl,
	ToggleControl,
	MenuGroup,
	MenuItem,
	TextareaControl,
	Popover,
	Spinner,
} from "@wordpress/components";
import { __experimentalBoxControl as BoxControl } from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import apiFetch from "@wordpress/api-fetch";
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from "@wordpress/block-editor";
import {
	Icon,
	styles,
	settings,
	link,
	linkOff,
	brush,
	close,
	mediaAndText,
} from "@wordpress/icons";
import { applyFilters } from "@wordpress/hooks";
import { createBlocksFromInnerBlocksTemplate } from "@wordpress/blocks";

import {
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	RichText,
	__experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";
import { __experimentalInputControl as InputControl } from "@wordpress/components";

const { RawHTML } = wp.element;
import { store } from "../../store";

import PGMailSubsctibe from "../../components/mail-subscribe";
import PGContactSupport from "../../components/contact-support";

import PGDropdown from "../../components/dropdown";

import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import PGStyles from "../../components/styles";
import PGCssLibrary from "../../components/css-library";
import PGIconPicker from "../../components/icon-picker";
import PGLibraryBlockVariations from "../../components/library-block-variations";

import variations from "./variations";
import metadata from "./block.json";
import PGcssClassPicker from "../../components/css-class-picker";
import customTags from "../../custom-tags";
import PGTutorials from "../../components/tutorials";
import PGBlockVariationsPicker from "../../components/block-variations-picker";

var myStore = wp.data.select("postgrid-shop");

registerBlockType(metadata, {
	icon: {
		// Specifying a background color to appear with the icon e.g.: in the inserter.
		background: "#fff",
		// Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
		foreground: "#fff",
		// Specifying an icon for the block
		src: (
			<svg
				width="160"
				height="160"
				viewBox="0 0 160 160"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path d="M160 27H0V45.8H160V27Z" fill="url(#paint0_linear_61_752)" />
				<path
					d="M17.6226 38.8999C17.4235 38.8999 17.3238 38.7998 17.2242 38.6998L13.9385 34.8999C13.7394 34.6999 13.7395 34.2998 14.0382 34.0998C14.2373 33.8998 14.6356 33.8998 14.8348 34.1998L17.722 37.5998L20.6095 34.1998C20.8087 33.9998 21.1072 33.8998 21.4059 34.0998C21.605 34.2998 21.7047 34.5999 21.5055 34.8999L18.2199 38.6998C17.9212 38.7998 17.8217 38.8999 17.6226 38.8999Z"
					fill="white"
				/>
				<path
					d="M104.443 33.8999H26.9819V38.7999H104.443V33.8999Z"
					fill="white"
				/>
				<path d="M160 71.3999H0V110.1H160V71.3999Z" fill="#C15940" />
				<path d="M160 49.2002H0V68.0002H160V49.2002Z" fill="#C15940" />
				<path
					d="M17.623 56.2002C17.8221 56.2002 17.9216 56.3003 18.0211 56.4003L21.3068 60.2002C21.5059 60.4002 21.5058 60.8002 21.2071 61.0002C21.008 61.2002 20.6097 61.2003 20.4106 60.9003L17.5233 57.5002L14.636 60.9003C14.4369 61.1003 14.1382 61.2002 13.8395 61.0002C13.5408 60.8002 13.5407 60.5002 13.7398 60.2002L17.0255 56.4003C17.3242 56.2003 17.4238 56.2002 17.623 56.2002Z"
					fill="white"
				/>
				<path
					d="M104.443 56.2002H26.9819V61.1002H104.443V56.2002Z"
					fill="white"
				/>
				<path
					d="M160 113.5H0V132.3H160V113.5Z"
					fill="url(#paint1_linear_61_752)"
				/>
				<path
					d="M17.6226 125.4C17.4235 125.4 17.3238 125.3 17.2242 125.2L13.9385 121.4C13.7394 121.2 13.7395 120.8 14.0382 120.6C14.2373 120.4 14.6356 120.4 14.8348 120.7L17.722 124.1L20.6095 120.7C20.8087 120.5 21.1072 120.4 21.4059 120.6C21.605 120.8 21.7047 121.1 21.5055 121.4L18.2199 125.2C17.9212 125.3 17.8217 125.4 17.6226 125.4Z"
					fill="white"
				/>
				<path d="M104.443 120.4H26.9819V125.3H104.443V120.4Z" fill="white" />
				<defs>
					<linearGradient
						id="paint0_linear_61_752"
						x1="0"
						y1="36.4"
						x2="160"
						y2="36.4"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_61_752"
						x1="0"
						y1="122.9"
						x2="160"
						y2="122.9"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#FC7F64" />
						<stop offset="1" stop-color="#FF9D42" />
					</linearGradient>
				</defs>
			</svg>
		),
	},

	edit: function (props) {
		var attributes = props.attributes;
		var setAttributes = props.setAttributes;
		var context = props.context;
		var clientId = props.clientId;

		var blockId = attributes.blockId;

		var blockIdX = attributes.blockId
			? attributes.blockId
			: "pg" + clientId.split("-").pop();
		var blockClass = "." + blockIdX;

		var wrapper = attributes.wrapper;
		var header = attributes.header;
		var headerActive = attributes.headerActive;

		var headerLabel = attributes.headerLabel;
		var labelIcon = attributes.labelIcon;
		var labelCounter = attributes.labelCounter;

		var searchWrap = attributes.searchWrap;
		var searchInput = attributes.searchInput;
		var schema = attributes.schema;

		var content = attributes.content;
		var icon = attributes.icon;
		var iconToggle = attributes.iconToggle;
		var accOptions = attributes.accOptions;

		var blockCssY = attributes.blockCssY;

		let isProFeature = applyFilters("isProFeature", true);

		var breakPointX = myStore.getBreakPoint();

		// Wrapper CSS Class Selectors
		var wrapperSelector = blockClass;
		const contentSelector = blockClass + " .accordion-content";
		const headerSelector = blockClass + " .accordion-header";
		const headerActiveSelector = blockClass + " .accordion-header-active";

		const headerLabelSelector = blockClass + " .accordion-header-label";
		const labelIconSelector = blockClass + " .accordion-label-icon";
		const labelCounterSelector = blockClass + " .accordion-label-counter";

		const searchWrapSelector = blockClass + "-accordion-search-wrap";
		const searchInputSelector = blockClass + "-accordion-search-input";

		const iconSelector = blockClass + " .accordion-icon";
		const iconToggleSelector = blockClass + " .accordion-icon-toggle";

		const { replaceInnerBlocks } = useDispatch(blockEditorStore);

		const hasInnerBlocks = useSelect(
			(select) => select(blockEditorStore).getBlocks(clientId).length > 0,
			[clientId]
		);

		useEffect(() => {
			var blockIdX = "pg" + clientId.split("-").pop();

			setAttributes({ blockId: blockIdX });
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [clientId]);

		useEffect(() => {
			myStore.generateBlockCss(blockCssY.items, blockId);
		}, [blockCssY]);

		useEffect(() => {
			var blockCssObj = {};
			blockCssObj[wrapperSelector] = wrapper;
			blockCssObj[contentSelector] = content;

			blockCssObj[headerActiveSelector] = headerActive;
			blockCssObj[headerSelector] = header;
			blockCssObj[headerLabelSelector] = headerLabel;
			blockCssObj[labelCounterSelector] = labelCounter;
			blockCssObj[labelIconSelector] = labelIcon;
			blockCssObj[searchWrapSelector] = searchWrap;
			blockCssObj[searchInputSelector] = searchInput;
			blockCssObj[iconSelector] = icon;
			blockCssObj[iconToggleSelector] = iconToggle;

			var blockCssRules = myStore.getBlockCssRules(blockCssObj);
			

			var items = blockCssRules;
			setAttributes({ blockCssY: { items: items } });
		}, [blockId]);

		// useEffect(() => {
		// 	var childBlocks =
		// 		select("core/block-editor").getBlocksByClientId(clientId)[0]
		// 			.innerBlocks;

		// 	childBlocks.map((childBlock) => {
		// 		var childClientId = childBlock.clientId;
		// 		var childAttributes = childBlock.attributes;

		// 		childAttributes.icon.options.position = icon.options.position;

		// 		dispatch("core/block-editor").updateBlockAttributes(
		// 			childClientId,
		// 			childAttributes
		// 		);
		// 		wp.data.dispatch("core/block-editor").selectBlock(childClientId);
		// 	});
		// 	wp.data.dispatch("core/block-editor").selectBlock(clientId);
		// }, [icon.options.position]);

		// useEffect(() => {
		// 	var childBlocks =
		// 		select("core/block-editor").getBlocksByClientId(clientId)[0]
		// 			.innerBlocks;

		// 	childBlocks.map((childBlock) => {
		// 		var childClientId = childBlock.clientId;
		// 		var childAttributes = childBlock.attributes;

		// 		childAttributes.labelCounter.options.position =
		// 			labelCounter.options.position;

		// 		dispatch("core/block-editor").updateBlockAttributes(
		// 			childClientId,
		// 			childAttributes
		// 		);
		// 		wp.data.dispatch("core/block-editor").selectBlock(childClientId);
		// 	});
		// 	wp.data.dispatch("core/block-editor").selectBlock(clientId);
		// }, [labelCounter.options.position]);

		function onPickBlockVariation(content, action) {
			const { parse } = wp.blockSerializationDefaultParser;

			var blocks = content.length > 0 ? parse(content) : "";

			const attributes = blocks[0].attrs;

			wp.data
				.dispatch("core/block-editor")
				.replaceBlock(clientId, wp.blocks.parse(content));
		}

		function onPickBlockPatterns(content, action) {
			const { parse } = wp.blockSerializationDefaultParser;

			var blocks = content.length > 0 ? parse(content) : "";

			const attributes = blocks[0].attrs;

			if (action == "insert") {
				wp.data
					.dispatch("core/block-editor")
					.insertBlocks(wp.blocks.parse(content));
			}
			if (action == "applyStyle") {
				// var blockId = attributes.blockId
				var wrapperX = attributes.wrapper;
				var headerX = attributes.header;
				var headerActiveX = attributes.headerActive;
				var headerLabelX = attributes.headerLabel;
				var labelIconX = attributes.labelIcon;
				var labelCounterX = attributes.labelCounter;
				var schemaX = attributes.schema;
				var contentX = attributes.content;
				var iconX = attributes.icon;
				var iconToggleX = attributes.iconToggle;

				var blockCssObj = {};
				if (wrapperX != undefined) {
					//var wrapperY = { ...wrapperX, options: wrapper.options }
					setAttributes({ wrapper: wrapperX });
					blockCssObj[wrapperSelector] = wrapperX;
				}

				if (headerX != undefined) {
					//var headerY = { ...headerX, options: header.options }
					setAttributes({ header: headerX });
					blockCssObj[headerSelector] = headerX;
				}

				if (headerActiveX != undefined) {
					//var headerActiveY = { ...headerActiveX, options: headerActive.options }
					setAttributes({ headerActive: headerActiveX });
					blockCssObj[headerActiveSelector] = headerActiveX;
				}

				if (headerLabelX != undefined) {
					//var headerLabelY = { ...headerLabelX, options: headerLabel.options }
					setAttributes({ headerLabel: headerLabelX });
					blockCssObj[headerLabelSelector] = headerLabelX;
				}

				if (labelIconX != undefined) {
					//var labelIconY = { ...labelIconX, options: labelIcon.options }
					setAttributes({ labelIcon: labelIconX });
					blockCssObj[labelIconSelector] = labelIconX;
				}

				if (labelCounterX != undefined) {
					//var labelCounterY = { ...labelCounterX, options: labelCounter.options }
					setAttributes({ labelCounter: labelCounterX });
					blockCssObj[labelCounterSelector] = labelCounterX;
				}

				if (schemaX != undefined) {
					var schemaY = { ...schemaX, options: schema.options };
					setAttributes({ schema: schemaY });
					//blockCssObj[schemaSelector] = schemaY;
				}

				if (contentX != undefined) {
					//var contentY = { ...contentX, options: content.options }

					setAttributes({ content: contentX });
					blockCssObj[contentSelector] = contentX;
				}

				if (iconX != undefined) {
					//var iconY = { ...iconX, options: icon.options }
					setAttributes({ icon: iconX });
					blockCssObj[iconSelector] = iconX;
				}

				if (iconToggleX != undefined) {
					//var iconToggleY = { ...iconToggleX, options: iconToggle.options }
					setAttributes({ iconToggle: iconToggleX });
					blockCssObj[iconToggleSelector] = iconToggleX;
				}

				var blockCssRules = myStore.getBlockCssRules(blockCssObj);

				var items = blockCssRules;
				setAttributes({ blockCssY: { items: items } });
			}
			if (action == "replace") {
				if (confirm("Do you want to replace?")) {
					wp.data
						.dispatch("core/block-editor")
						.replaceBlock(clientId, wp.blocks.parse(content));
				}
			}
		}

		function handleLinkClick(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			return false;
		}

		function onChangeStyleWrapper(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, wrapper);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ wrapper: object });

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

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleWrapper(sudoScource, key) {
			var object = myStore.deletePropertyDeep(wrapper, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ wrapper: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				wrapperSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleWrapper(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, wrapper);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ wrapper: object });
		}

		function onChangeStyleHeader(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, header);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ header: object });

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

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleHeader(sudoScource, key) {
			var object = myStore.deletePropertyDeep(header, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ header: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				headerSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleHeader(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];

			let obj = Object.assign({}, header);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ header: object });
		}

		function onPickCssLibraryHeader(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				header[sudoScource] = sudoScourceArgs;
			});

			var headerX = Object.assign({}, header);
			setAttributes({ header: headerX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					headerSelector
				);

				var sudoObj = {};
				Object.entries(sudoScourceArgs).map((y) => {
					var cssPropty = y[0];
					var cssProptyVal = y[1];
					var cssProptyKey = myStore.cssAttrParse(cssPropty);
					sudoObj[cssProptyKey] = cssProptyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		// #########

		function onChangeStyleHeaderActive(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, headerActive);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ headerActive: object });

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

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleHeaderActive(sudoScource, key) {
			var object = myStore.deletePropertyDeep(headerActive, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ headerActive: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				headerActiveSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleHeaderActive(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];

			let obj = Object.assign({}, headerActive);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ headerActive: object });
		}

		function onPickCssLibraryHeaderActive(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				headerActive[sudoScource] = sudoScourceArgs;
			});

			var headerActiveX = Object.assign({}, headerActive);
			setAttributes({ headerActive: headerActiveX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					headerActiveSelector
				);

				var sudoObj = {};
				Object.entries(sudoScourceArgs).map((y) => {
					var cssPropty = y[0];
					var cssProptyVal = y[1];
					var cssProptyKey = myStore.cssAttrParse(cssPropty);
					sudoObj[cssProptyKey] = cssProptyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		//########

		function onChangeStyleHeaderLabel(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, headerLabel);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ headerLabel: object });

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

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleHeaderLabel(sudoScource, key) {
			var object = myStore.deletePropertyDeep(headerLabel, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ headerLabel: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				headerLabelSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleHeaderLabel(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, headerLabel);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ headerLabel: object });
		}

		function onPickCssLibraryHeaderLabel(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				headerLabel[sudoScource] = sudoScourceArgs;
			});

			var headerLabelX = Object.assign({}, headerLabel);
			setAttributes({ headerLabel: headerLabelX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					headerLabelSelector
				);

				var sudoObj = {};
				Object.entries(sudoScourceArgs).map((y) => {
					var cssPropty = y[0];
					var cssProptyVal = y[1];
					var cssProptyKey = myStore.cssAttrParse(cssPropty);
					sudoObj[cssProptyKey] = cssProptyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onChangeStyleLabelCounter(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, labelCounter);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ labelCounter: object });

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

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleLabelCounter(sudoScource, key) {
			var object = myStore.deletePropertyDeep(labelCounter, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ labelCounter: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				labelCounterSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleLabelCounter(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, labelCounter);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ labelCounter: object });
		}

		function onPickCssLibraryLabelCounter(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				labelCounter[sudoScource] = sudoScourceArgs;
			});

			var labelCounterX = Object.assign({}, labelCounter);
			setAttributes({ labelCounter: labelCounterX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					labelCounterSelector
				);

				var sudoObj = {};
				Object.entries(sudoScourceArgs).map((y) => {
					var cssPropty = y[0];
					var cssProptyVal = y[1];
					var cssProptyKey = myStore.cssAttrParse(cssPropty);
					sudoObj[cssProptyKey] = cssProptyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		////

		function onChangeStyleLabelIcon(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, labelIcon);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ labelIcon: object });

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

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleLabelIcon(sudoScource, key) {
			var object = myStore.deletePropertyDeep(labelIcon, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ labelIcon: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				labelIconSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleLabelIcon(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, labelIcon);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ labelIcon: object });
		}

		function onChangeStyleContent(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, content);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ content: object });

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

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleContent(sudoScource, key) {
			var object = myStore.deletePropertyDeep(content, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ content: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				contentSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleContent(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, content);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ content: object });
		}

		function onChangeStyleIcon(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, icon);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ icon: object });

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

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleIcon(sudoScource, key) {
			var object = myStore.deletePropertyDeep(icon, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ icon: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				iconSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleIcon(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, icon);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ icon: object });
		}

		function onPickCssLibraryIcon(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				icon[sudoScource] = sudoScourceArgs;
			});

			var iconX = Object.assign({}, icon);
			setAttributes({ icon: iconX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					iconSelector
				);

				var sudoObj = {};
				Object.entries(sudoScourceArgs).map((y) => {
					var cssPropty = y[0];
					var cssProptyVal = y[1];
					var cssProptyKey = myStore.cssAttrParse(cssPropty);
					sudoObj[cssProptyKey] = cssProptyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onChangeStyleIconToggle(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, iconToggle);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ iconToggle: object });

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

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleIconToggle(sudoScource, key) {
			var object = myStore.deletePropertyDeep(iconToggle, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ iconToggle: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				iconToggleSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleIconToggle(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, iconToggle);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ iconToggle: object });
		}

		function onPickCssLibraryIconToggle(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				iconToggle[sudoScource] = sudoScourceArgs;
			});

			var iconToggleX = Object.assign({}, iconToggle);
			setAttributes({ iconToggle: iconToggleX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					iconToggleSelector
				);

				var sudoObj = {};
				Object.entries(sudoScourceArgs).map((y) => {
					var cssPropty = y[0];
					var cssProptyVal = y[1];
					var cssProptyKey = myStore.cssAttrParse(cssPropty);
					sudoObj[cssProptyKey] = cssProptyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onPickCssLibraryContent(args) {
			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				content[sudoScource] = sudoScourceArgs;
			});

			var contentX = Object.assign({}, content);
			setAttributes({ content: contentX });

			var styleObj = {};

			Object.entries(args).map((x) => {
				var sudoScource = x[0];
				var sudoScourceArgs = x[1];
				var elementSelector = myStore.getElementSelector(
					sudoScource,
					contentSelector
				);

				var sudoObj = {};
				Object.entries(sudoScourceArgs).map((y) => {
					var cssPropty = y[0];
					var cssProptyVal = y[1];
					var cssProptyKey = myStore.cssAttrParse(cssPropty);
					sudoObj[cssProptyKey] = cssProptyVal;
				});

				styleObj[elementSelector] = sudoObj;
			});

			var cssItems = Object.assign(blockCssY.items, styleObj);
			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onChangeStyleSearchWrap(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, searchWrap);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ searchWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				searchWrapSelector
			);
			var cssPropty = myStore.cssAttrParse(attr);

			let itemsX = Object.assign({}, blockCssY.items);

			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}

			var cssPath = [elementSelector, cssPropty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleSearchWrap(sudoScource, key) {
			var object = myStore.deletePropertyDeep(searchWrap, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ searchWrap: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				searchWrapSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleSearchWrap(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, searchWrap);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ searchWrap: object });
		}

		function onChangeStyleSearchInput(sudoScource, newVal, attr) {
			var path = [sudoScource, attr, breakPointX];
			let obj = Object.assign({}, searchInput);
			const object = myStore.updatePropertyDeep(obj, path, newVal);

			setAttributes({ searchInput: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				searchInputSelector
			);
			var cssPropty = myStore.cssAttrParse(attr);

			let itemsX = Object.assign({}, blockCssY.items);

			if (itemsX[elementSelector] == undefined) {
				itemsX[elementSelector] = {};
			}

			var cssPath = [elementSelector, cssPropty, breakPointX];
			const cssItems = myStore.updatePropertyDeep(itemsX, cssPath, newVal);

			setAttributes({ blockCssY: { items: cssItems } });
		}

		function onRemoveStyleSearchInput(sudoScource, key) {
			var object = myStore.deletePropertyDeep(searchInput, [
				sudoScource,
				key,
				breakPointX,
			]);
			setAttributes({ searchInput: object });

			var elementSelector = myStore.getElementSelector(
				sudoScource,
				searchInputSelector
			);
			var cssPropty = myStore.cssAttrParse(key);
			var cssObject = myStore.deletePropertyDeep(blockCssY.items, [
				elementSelector,
				cssPropty,
				breakPointX,
			]);
			setAttributes({ blockCssY: { items: cssObject } });
		}

		function onAddStyleSearchInput(sudoScource, key) {
			var path = [sudoScource, key, breakPointX];
			let obj = Object.assign({}, searchInput);
			const object = myStore.addPropertyDeep(obj, path, "");
			setAttributes({ searchInput: object });
		}

		// add bulk style start
		function onBulkAddWrapper(sudoScource, cssObj) {
			let obj = Object.assign({}, wrapper);
			obj[sudoScource] = cssObj;

			setAttributes({ wrapper: obj });

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
			var cssItemsX = { ...cssItems, ...stylesObj };

			setAttributes({ blockCssY: { items: cssItemsX } });
		}

		function onBulkAddHeader(sudoScource, cssObj) {
			let obj = Object.assign({}, header);
			obj[sudoScource] = cssObj;

			setAttributes({ header: obj });

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
			var cssItemsX = { ...cssItems, ...stylesObj };

			setAttributes({ blockCssY: { items: cssItemsX } });
		}

		function onBulkAddHeaderActive(sudoScource, cssObj) {
			let obj = Object.assign({}, headerActive);
			obj[sudoScource] = cssObj;

			setAttributes({ headerActive: obj });

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
			var cssItemsX = { ...cssItems, ...stylesObj };

			setAttributes({ blockCssY: { items: cssItemsX } });
		}

		function onBulkAddHeaderLabel(sudoScource, cssObj) {
			let obj = Object.assign({}, headerLabel);
			obj[sudoScource] = cssObj;

			setAttributes({ headerLabel: obj });

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
			var cssItemsX = { ...cssItems, ...stylesObj };

			setAttributes({ blockCssY: { items: cssItemsX } });
		}

		function onBulkAddLabelIcon(sudoScource, cssObj) {
			let obj = Object.assign({}, labelIcon);
			obj[sudoScource] = cssObj;

			setAttributes({ labelIcon: obj });

			var selector = myStore.getElementSelector(sudoScource, labelIconSelector);
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
			var cssItemsX = { ...cssItems, ...stylesObj };

			setAttributes({ blockCssY: { items: cssItemsX } });
		}

		function onBulkAddLabelCounter(sudoScource, cssObj) {
			let obj = Object.assign({}, labelCounter);
			obj[sudoScource] = cssObj;

			setAttributes({ labelCounter: obj });

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
			var cssItemsX = { ...cssItems, ...stylesObj };

			setAttributes({ blockCssY: { items: cssItemsX } });
		}

		function onBulkAddContent(sudoScource, cssObj) {
			let obj = Object.assign({}, content);
			obj[sudoScource] = cssObj;

			setAttributes({ content: obj });

			var selector = myStore.getElementSelector(sudoScource, contentSelector);
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
			var cssItemsX = { ...cssItems, ...stylesObj };

			setAttributes({ blockCssY: { items: cssItemsX } });
		}

		function onBulkAddIcon(sudoScource, cssObj) {
			let obj = Object.assign({}, icon);
			obj[sudoScource] = cssObj;

			setAttributes({ icon: obj });

			var selector = myStore.getElementSelector(sudoScource, iconSelector);
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
			var cssItemsX = { ...cssItems, ...stylesObj };

			setAttributes({ blockCssY: { items: cssItemsX } });
		}

		function onBulkAddIconToggle(sudoScource, cssObj) {
			let obj = Object.assign({}, iconToggle);
			obj[sudoScource] = cssObj;

			setAttributes({ iconToggle: obj });

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
			var cssItemsX = { ...cssItems, ...stylesObj };

			setAttributes({ blockCssY: { items: cssItemsX } });
		}

		// add bulk style end

		// reset style start

		function onResetWrapper(sudoScources) {
			let obj = Object.assign({}, wrapper);

			Object.entries(sudoScources).map((args) => {
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
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ wrapper: obj });
		}

		function onResetHeader(sudoScources) {
			let obj = Object.assign({}, header);

			Object.entries(sudoScources).map((args) => {
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
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ header: obj });
		}

		function onResetHeaderActive(sudoScources) {
			let obj = Object.assign({}, headerActive);

			Object.entries(sudoScources).map((args) => {
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
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ headerActive: obj });
		}

		function onResetHeaderLabel(sudoScources) {
			let obj = Object.assign({}, headerLabel);

			Object.entries(sudoScources).map((args) => {
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
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ headerLabel: obj });
		}

		function onResetLabelIcon(sudoScources) {
			let obj = Object.assign({}, labelIcon);

			Object.entries(sudoScources).map((args) => {
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
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ labelIcon: obj });
		}

		function onResetLabelCounter(sudoScources) {
			let obj = Object.assign({}, labelCounter);

			Object.entries(sudoScources).map((args) => {
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
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ labelCounter: obj });
		}

		function onResetContent(sudoScources) {
			let obj = Object.assign({}, content);

			Object.entries(sudoScources).map((args) => {
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
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ content: obj });
		}

		function onResetIcon(sudoScources) {
			let obj = Object.assign({}, icon);

			Object.entries(sudoScources).map((args) => {
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
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ icon: obj });
		}

		function onResetIconToggle(sudoScources) {
			let obj = Object.assign({}, iconToggle);

			Object.entries(sudoScources).map((args) => {
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
					setAttributes({ blockCssY: { items: cssObject } });
				}
			});

			setAttributes({ iconToggle: obj });
		}

		// reset style end

		const ALLOWED_BLOCKS = ["post-grid/accordion-nested-item"];

		const MY_TEMPLATE = [
			["post-grid/accordion-nested-item", {}],
			["post-grid/accordion-nested-item", {}],
		];

		const blockProps = useBlockProps({
			className: ` ${blockId} ${wrapper.options?.class} `,
		});

		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			allowedBlocks: ALLOWED_BLOCKS,
			// __experimentalDirectInsert: true,
			template: MY_TEMPLATE,
			//templateInsertUpdatesSelection: true,
		});

		var childBlocks =
			select("core/block-editor").getBlocksByClientId(clientId)[0].innerBlocks;

		var count = 0;

		childBlocks.forEach(function (childBlock) {
			count++;
			var childClientId = childBlock.clientId;
			var childAttributes = childBlock.attributes;
			childAttributes.count = count;

			dispatch("core/block-editor").updateBlockAttributes(
				childClientId,
				childAttributes
			);
		});

		const addChild = () => {
			var childBlocks = wp.data.select(blockEditorStore).getBlocks(clientId);

			const slide = createBlock("post-grid/accordion-nested-item");
			const position = childBlocks.length;
			dispatch("core/block-editor").insertBlock(slide, position, clientId);

			wp.data.dispatch("core/block-editor").selectBlock(clientId);
			//setActiveTab(slide.clientId);
		};

		var accOptionsArgs = {
			active: { label: "Active", value: "0" },
			animate: { label: "Animate", value: "500" },
			collapsible: { label: "Collapsible", value: false },
			disabled: { label: "Disabled", value: false },
			event: { label: "Event", value: "click" },
			// header: { label: "Header", value: "div" },
			heightStyle: { label: "Height Style", value: "auto" },
		};

		var RemoveAccArg = function ({ index }) {
			return (
				<span
					className="cursor-pointer inline-block hover:bg-red-500 hover:text-white px-1 py-1"
					onClick={(ev) => {
						var accOptionsX = { ...accOptions };
						delete accOptionsX[index];

						setAttributes({ accOptions: accOptionsX });
					}}>
					<Icon icon={close} />
				</span>
			);
		};

		// var RemoveAccArgRes = function ({ index }) {
		// 	return (
		// 		<span
		// 			className="cursor-pointer inline-block hover:bg-red-500 hover:text-white px-1 py-1"
		// 			onClick={(ev) => {
		// 				var sliderOptionsResX = { ...sliderOptionsRes };

		// 				delete sliderOptionsResX[index];
		// 				setAttributes({ sliderOptionsRes: sliderOptionsResX });
		// 			}}>
		// 			<Icon icon={close} />
		// 		</span>
		// 	);
		// };

		return (
			<>
				<InspectorControls>
					<div className="pg-setting-input-text">
						<div
							className="pg-font flex gap-2 justify-center my-2 cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-800 text-white font-medium rounded hover:bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700 mx-3"
							// className="bg-blue-600 mx-3 my-2 cursor-pointer hover:text-white font-bold text-[16px] px-5 py-2 block text-center text-white rounded"
							onClick={(ev) => {
								addChild();
							}}>
							Add Item
						</div>
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
								]}>
								<PGtab name="options">
									<PGcssClassPicker
										tags={customTags}
										label="CSS Class"
										placeholder="Add Class"
										value={wrapper.options?.class}
										onChange={(newVal) => {
											var options = { ...wrapper.options, class: newVal };
											setAttributes({
												wrapper: { styles: wrapper.styles, options: options },
											});
										}}
									/>
									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Block ID
										</label>
										<InputControl
											value={blockId}
											disabled={true}
											onChange={(newVal) => {
												setAttributes({
													blockId: newVal,
												});
											}}
										/>
									</PanelRow>
									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Wrapper Tag
										</label>

										<SelectControl
											label=""
											value={wrapper.options?.tag}
											options={[
												{ label: "Choose", value: "" },
												{ label: "H1", value: "h1" },
												{ label: "H2", value: "h2" },
												{ label: "H3", value: "h3" },
												{ label: "H4", value: "h4" },
												{ label: "H5", value: "h5" },
												{ label: "H6", value: "h6" },
												{ label: "SPAN", value: "span" },
												{ label: "DIV", value: "div" },
												{ label: "P", value: "p" },
											]}
											onChange={(newVal) => {
												var options = { ...wrapper.options, tag: newVal };
												setAttributes({
													wrapper: { ...wrapper, options: options },
												});
											}}
										/>
									</PanelRow>
									<div className="">
										<PanelRow className="my-3">
											<label>Accordion Options</label>
											<PGDropdown
												position="bottom right"
												variant="secondary"
												buttonTitle={"Choose"}
												options={accOptionsArgs}
												onChange={(option, index) => {
													var accOptionsX = { ...accOptions };

													accOptionsX[index] = option.value;

													setAttributes({ accOptions: accOptionsX });
												}}
												values=""></PGDropdown>
										</PanelRow>

										<div className="flex flex-col gap-2 items-start">
											{Object.entries(accOptions).map((item, index) => {
												var id = item[0];
												var value = item[1];

												return (
													<div>
														{id == "active" && (
															<PanelRow className="gap-2 justify-between ">
																<div className="flex items-center">
																	<RemoveAccArg index={id} />
																	<span>Active?</span>
																</div>

																<InputControl
																	value={value}
																	type="number"
																	onChange={(newVal) => {
																		var accOptionsX = { ...accOptions };
																		accOptionsX[id] = newVal;
																		setAttributes({
																			accOptions: accOptionsX,
																		});
																	}}
																/>
															</PanelRow>
														)}
														{id == "animate" && (
															<PanelRow className="gap-2 justify-between ">
																<div className="flex items-center">
																	<RemoveAccArg index={id} />
																	<span>Animate?</span>
																</div>

																<InputControl
																	value={value}
																	type="number"
																	onChange={(newVal) => {
																		var accOptionsX = { ...accOptions };
																		accOptionsX[id] = newVal;
																		setAttributes({
																			accOptions: accOptionsX,
																		});
																	}}
																/>
															</PanelRow>
														)}
														{id == "header" && (
															<PanelRow className="gap-2 justify-between ">
																<div className="flex items-center">
																	<RemoveAccArg index={id} />
																	<span>Header?</span>
																</div>

																<InputControl
																	value={value}
																	type="text"
																	onChange={(newVal) => {
																		var accOptionsX = { ...accOptions };
																		accOptionsX[id] = newVal;
																		setAttributes({
																			accOptions: accOptionsX,
																		});
																	}}
																/>
															</PanelRow>
														)}
														{id == "event" && (
															<PanelRow className="gap-2 justify-between ">
																<div className="flex items-center">
																	<RemoveAccArg index={id} />
																	<span>Event?</span>
																</div>

																<InputControl
																	value={value}
																	type="text"
																	onChange={(newVal) => {
																		var accOptionsX = { ...accOptions };
																		accOptionsX[id] = newVal;
																		setAttributes({
																			accOptions: accOptionsX,
																		});
																	}}
																/>
															</PanelRow>
														)}
														{id == "disabled" && (
															<PanelRow className="gap-2 justify-between ">
																<div className="flex items-center">
																	<RemoveAccArg index={id} />
																	<span>Disabled?</span>
																</div>

																<ToggleControl
																	help={value ? "Enabled" : "Disabled."}
																	checked={value ? true : false}
																	onChange={(e) => {
																		var accOptionsX = { ...accOptions };
																		accOptionsX[id] = value ? false : true;
																		setAttributes({
																			accOptions: accOptionsX,
																		});
																	}}
																/>
															</PanelRow>
														)}
														{id == "collapsible" && (
															<PanelRow className="gap-2 justify-between ">
																<div className="flex items-center">
																	<RemoveAccArg index={id} />
																	<span>Collapsible?</span>
																</div>

																<ToggleControl
																	help={value ? "Enabled" : "Disabled."}
																	checked={value ? true : false}
																	onChange={(e) => {
																		var accOptionsX = { ...accOptions };
																		accOptionsX[id] = value ? false : true;
																		setAttributes({
																			accOptions: accOptionsX,
																		});
																	}}
																/>
															</PanelRow>
														)}
														{id == "heightStyle" && (
															<PanelRow className="gap-2 justify-between ">
																<div className="flex items-center">
																	<RemoveAccArg index={id} />
																	<span>Height Style?</span>
																</div>

																<SelectControl
																	label=""
																	value={value}
																	options={[
																		{ label: "Auto", value: "auto" },
																		{ label: "Fill", value: "fill" },
																		{ label: "Content", value: "content" },
																	]}
																	onChange={(newVal) => {
																		var accOptionsX = { ...accOptions };
																		accOptionsX[id] = newVal;
																		setAttributes({
																			accOptions: accOptionsX,
																		});
																	}}
																/>
															</PanelRow>
														)}
													</div>
												);
											})}
										</div>
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
									{
										name: "css",
										title: "CSS Library",
										icon: mediaAndText,
										className: "tab-css",
									},
								]}>
								<PGtab name="options">
									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Wrapper Tag
										</label>

										<SelectControl
											label=""
											value={header.options.tag}
											options={[
												{ label: "Choose", value: "" },
												{ label: "H1", value: "h1" },
												{ label: "H2", value: "h2" },
												{ label: "H3", value: "h3" },
												{ label: "H4", value: "h4" },
												{ label: "H5", value: "h5" },
												{ label: "H6", value: "h6" },
												{ label: "SPAN", value: "span" },
												{ label: "DIV", value: "div" },
												{ label: "P", value: "p" },
											]}
											onChange={(newVal) => {
												var options = { ...header.options, tag: newVal };
												setAttributes({
													header: { ...header, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={header}
										onChange={onChangeStyleHeader}
										onAdd={onAddStyleHeader}
										onRemove={onRemoveStyleHeader}
										onBulkAdd={onBulkAddHeader}
										onReset={onResetHeader}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={header}
										onChange={onPickCssLibraryHeader}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

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
									{
										name: "css",
										title: "CSS Library",
										icon: mediaAndText,
										className: "tab-css",
									},
								]}>
								<PGtab name="options"></PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={headerActive}
										onChange={onChangeStyleHeaderActive}
										onAdd={onAddStyleHeaderActive}
										onRemove={onRemoveStyleHeaderActive}
										onBulkAdd={onBulkAddHeaderActive}
										onReset={onResetHeaderActive}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={headerActive}
										onChange={onPickCssLibraryHeaderActive}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

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
									{
										name: "css",
										title: "CSS Library",
										icon: mediaAndText,
										className: "tab-css",
									},
								]}>
								<PGtab name="options">
									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Wrapper Tag
										</label>

										<SelectControl
											label=""
											value={headerLabel.options.tag}
											options={[
												{ label: "Choose", value: "" },
												{ label: "H1", value: "h1" },
												{ label: "H2", value: "h2" },
												{ label: "H3", value: "h3" },
												{ label: "H4", value: "h4" },
												{ label: "H5", value: "h5" },
												{ label: "H6", value: "h6" },
												{ label: "SPAN", value: "span" },
												{ label: "DIV", value: "div" },
												{ label: "P", value: "p" },
												{ label: "a", value: "a" },
											]}
											onChange={(newVal) => {
												var options = { ...headerLabel.options, tag: newVal };
												setAttributes({
													headerLabel: { ...headerLabel, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={headerLabel}
										onChange={onChangeStyleHeaderLabel}
										onAdd={onAddStyleHeaderLabel}
										onRemove={onRemoveStyleHeaderLabel}
										onBulkAdd={onBulkAddHeaderLabel}
										onReset={onResetHeaderLabel}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={headerLabel}
										onChange={onPickCssLibraryHeaderLabel}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							// title="Label Counter"
							opened={isProFeature ? false : null}
							title={
								<span className="flex justify-between w-full">
									<span>Label Counter</span>
									{isProFeature ? (
										<span
											className="pg-bg-color text-white px-3 py-1 rounded-md"
											onClick={(ev) => {
												window.open(
													"https://getpostgrid.com/pricing/",
													"_blank"
												);
											}}>
											Pro
										</span>
									) : (
										""
									)}{" "}
								</span>
							}
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
									{
										name: "css",
										title: "CSS Library",
										icon: mediaAndText,
										className: "tab-css",
									},
								]}>
								<PGtab name="options">
									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Counter position
										</label>

										<SelectControl
											label=""
											value={labelCounter.options.position}
											options={[
												{ label: "Choose Position", value: "" },
												{ label: "Left", value: "left" },
												{ label: "Right", value: "right" },
											]}
											onChange={(newVal) => {
												var options = {
													...labelCounter.options,
													position: newVal,
												};
												setAttributes({
													labelCounter: { ...labelCounter, options: options },
												});
											}}
										/>
									</PanelRow>

									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Wrapper Tag
										</label>

										<SelectControl
											label=""
											value={labelCounter.options.tag}
											options={[
												{ label: "Choose", value: "" },
												{ label: "H1", value: "h1" },
												{ label: "H2", value: "h2" },
												{ label: "H3", value: "h3" },
												{ label: "H4", value: "h4" },
												{ label: "H5", value: "h5" },
												{ label: "H6", value: "h6" },
												{ label: "SPAN", value: "span" },
												{ label: "DIV", value: "div" },
												{ label: "P", value: "p" },
											]}
											onChange={(newVal) => {
												var options = { ...labelCounter.options, tag: newVal };
												setAttributes({
													labelCounter: { ...labelCounter, options: options },
												});
											}}
										/>
									</PanelRow>
									<ToggleControl
										label="Enable Override Child?"
										help={
											labelCounter.options.overrideChild
												? "Override Child Enabled"
												: "Override Child Disabled."
										}
										checked={labelCounter.options.overrideChild ? true : false}
										onChange={(e) => {
											var options = {
												...labelCounter.options,
												overrideChild: labelCounter.options.overrideChild
													? false
													: true,
											};

											setAttributes({
												labelCounter: { ...labelCounter, options: options },
											});
										}}
									/>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={labelCounter}
										onChange={onChangeStyleLabelCounter}
										onAdd={onAddStyleLabelCounter}
										onRemove={onRemoveStyleLabelCounter}
										onBulkAdd={onBulkAddLabelCounter}
										onReset={onResetLabelCounter}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={labelCounter}
										onChange={onPickCssLibraryLabelCounter}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							// title="Label Icon"
							opened={isProFeature ? false : null}
							title={
								<span className="flex justify-between w-full">
									<span>Label Icon</span>
									{isProFeature ? (
										<span
											className="pg-bg-color text-white px-3 py-1 rounded-md"
											onClick={(ev) => {
												window.open(
													"https://getpostgrid.com/pricing/",
													"_blank"
												);
											}}>
											Pro
										</span>
									) : (
										""
									)}{" "}
								</span>
							}
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
								]}>
								<PGtab name="options">
									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Label Icon position
										</label>

										<SelectControl
											label=""
											value={labelIcon.options.position}
											options={[
												{ label: "Choose Position", value: "" },

												{ label: "Before Label", value: "beforeLabel" },
												{ label: "After Label", value: "afterLabel" },
												{
													label: "Before Label Text",
													value: "beforeLabelText",
												},
												{ label: "After Label Text", value: "afterLabelText" },
											]}
											onChange={(newVal) => {
												var options = {
													...labelIcon.options,
													position: newVal,
												};
												setAttributes({
													labelIcon: { ...labelIcon, options: options },
												});

												// var childBlocks = select('core/block-editor').getBlocksByClientId(clientId)[0].innerBlocks;

												// childBlocks.map(childBlock => {

												//   var childClientId = childBlock.clientId;

												//   var childAttributes = childBlock.attributes;
												//   childAttributes.labelIcon.options.position = newVal;

												//   dispatch('core/block-editor').updateBlockAttributes(childClientId, childAttributes)
												//   wp.data.dispatch('core/block-editor').selectBlock(childClientId)
												// })

												// wp.data.dispatch('core/block-editor').selectBlock(clientId)
											}}
										/>
									</PanelRow>

									{labelIcon.options.position.length > 0 && (
										<PanelRow>
											<label for="" className="font-medium text-slate-900 ">
												Choose Icon
											</label>

											<PGIconPicker
												library={labelIcon.options.library}
												srcType={labelIcon.options.srcType}
												iconSrc={labelIcon.options.iconSrc}
												onChange={(arg) => {
													var options = {
														...labelIcon.options,
														srcType: arg.srcType,
														library: arg.library,
														iconSrc: arg.iconSrc,
													};
													setAttributes({
														labelIcon: { ...labelIcon, options: options },
													});

													// var childBlocks =
													// 	select("core/block-editor").getBlocksByClientId(
													// 		clientId
													// 	)[0].innerBlocks;

													// childBlocks.map((childBlock) => {
													// 	var childClientId = childBlock.clientId;

													

													// 	var childAttributes = childBlock.attributes;
													// 	childAttributes.labelIcon.options.srcType =
													// 		arg.srcType;
													// 	childAttributes.labelIcon.options.library =
													// 		arg.library;
													// 	childAttributes.labelIcon.options.iconSrc =
													// 		arg.iconSrc;

													// 	dispatch("core/block-editor").updateBlockAttributes(
													// 		childClientId,
													// 		childAttributes
													// 	);
													// 	wp.data
													// 		.dispatch("core/block-editor")
													// 		.selectBlock(childClientId);
													// });

													

													// wp.data
													// 	.dispatch("core/block-editor")
													// 	.selectBlock(clientId);
												}}
											/>
										</PanelRow>
									)}

									<ToggleControl
										label="Enable Override Child?"
										help={
											labelIcon.options.overrideChild
												? "Override Child Enabled"
												: "Override Child Disabled."
										}
										checked={labelIcon.options.overrideChild ? true : false}
										onChange={(e) => {
											var options = {
												...labelIcon.options,
												overrideChild: labelIcon.options.overrideChild
													? false
													: true,
											};

											setAttributes({
												labelIcon: { ...labelIcon, options: options },
											});
										}}
									/>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={labelIcon}
										onChange={onChangeStyleLabelIcon}
										onAdd={onAddStyleLabelIcon}
										onRemove={onRemoveStyleLabelIcon}
										onBulkAdd={onBulkAddLabelIcon}
										onReset={onResetLabelIcon}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

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
									{
										name: "css",
										title: "CSS Library",
										icon: mediaAndText,
										className: "tab-css",
									},
								]}>
								<PGtab name="options">
									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Wrapper Tag
										</label>

										<SelectControl
											label=""
											value={content.options.tag}
											options={[
												{ label: "Choose", value: "" },
												{ label: "H1", value: "h1" },
												{ label: "H2", value: "h2" },
												{ label: "H3", value: "h3" },
												{ label: "H4", value: "h4" },
												{ label: "H5", value: "h5" },
												{ label: "H6", value: "h6" },
												{ label: "SPAN", value: "span" },
												{ label: "DIV", value: "div" },
												{ label: "P", value: "p" },
											]}
											onChange={(newVal) => {
												var options = { ...content.options, tag: newVal };
												setAttributes({
													content: { ...content, options: options },
												});
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={content}
										onChange={onChangeStyleContent}
										onAdd={onAddStyleContent}
										onRemove={onRemoveStyleContent}
										onBulkAdd={onBulkAddContent}
										onReset={onResetContent}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={content}
										onChange={onPickCssLibraryContent}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>

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
									{
										name: "css",
										title: "CSS Library",
										icon: mediaAndText,
										className: "tab-css",
									},
								]}>
								<PGtab name="options">
									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Choose Icon
										</label>

										<PGIconPicker
											library={icon.options.library}
											srcType={icon.options.srcType}
											iconSrc={icon.options.iconSrc}
											onChange={(arg) => {
												var options = {
													...icon.options,
													srcType: arg.srcType,
													library: arg.library,
													iconSrc: arg.iconSrc,
												};
												setAttributes({ icon: { ...icon, options: options } });
											}}
										/>
									</PanelRow>

									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Choose Toggled Icon
										</label>

										<PGIconPicker
											library={iconToggle.options.library}
											srcType={iconToggle.options.srcType}
											iconSrc={iconToggle.options.iconSrc}
											onChange={(arg) => {
												var options = {
													...iconToggle.options,
													srcType: arg.srcType,
													library: arg.library,
													iconSrc: arg.iconSrc,
												};
												setAttributes({
													iconToggle: { ...iconToggle, options: options },
												});
											}}
										/>
									</PanelRow>

									<PanelRow>
										<label for="" className="font-medium text-slate-900 ">
											Icon position
										</label>

										<SelectControl
											label=""
											value={icon.options.position}
											options={[
												{ label: "Choose Position", value: "" },

												{ label: "Left", value: "left" },
												{ label: "Right", value: "right" },
											]}
											onChange={(newVal) => {
												var options = { ...icon.options, position: newVal };
												setAttributes({ icon: { ...icon, options: options } });
											}}
										/>
									</PanelRow>
									<ToggleControl
										label="Enable Override Child?"
										help={
											icon.options.overrideChild
												? "Override Child Enabled"
												: "Override Child Disabled."
										}
										checked={icon.options.overrideChild ? true : false}
										onChange={(e) => {
											var options = {
												...icon.options,
												overrideChild: icon.options.overrideChild
													? false
													: true,
											};

											setAttributes({
												icon: { ...icon, options: options },
											});
										}}
									/>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={icon}
										onChange={onChangeStyleIcon}
										onAdd={onAddStyleIcon}
										onRemove={onRemoveStyleIcon}
										onBulkAdd={onBulkAddIcon}
										onReset={onResetIcon}
									/>
								</PGtab>
								<PGtab name="css">
									<PGCssLibrary
										blockId={blockId}
										obj={icon}
										onChange={onPickCssLibraryIcon}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>
						<PanelBody
							className="font-medium text-slate-900 "
							title="Schema"
							initialOpen={false}>
							<ToggleControl
								label="Enable Schema?"
								help={
									schema.options.enable ? "Schema Enabled" : "Schema Disabled."
								}
								checked={schema.options.enable ? true : false}
								onChange={(e) => {
									var options = {
										...schema.options,
										enable: schema.options.enable ? false : true,
									};
									setAttributes({ schema: { ...schema, options: options } });
								}}
							/>
						</PanelBody>
						<PanelBody
							className="font-medium text-slate-900 "
							title="Search"
							initialOpen={false}>
							<PanelRow className="my-3">
								<ToggleControl
									label="Enable Search?"
									help={
										searchWrap.options.enable
											? "Search Enabled"
											: "Search Disabled."
									}
									disabled={isProFeature}
									checked={searchWrap.options.enable ? true : false}
									onChange={(e) => {
										var options = {
											...searchWrap.options,
											enable: searchWrap.options.enable ? false : true,
										};
										setAttributes({
											searchWrap: { ...searchWrap, options: options },
										});
									}}
								/>
								{isProFeature && (
									<span className="bg-amber-400 mx-2 rounded-sm px-3  text-white hover:text-white">
										<a
											target="_blank"
											href={
												"https://getpostgrid.com/pricing/?utm_source=search&utm_term=blockaccordion&utm_campaign=pluginPostGrid&utm_medium=search"
											}>
											Pro
										</a>
									</span>
								)}
							</PanelRow>

							<PanelBody
								className="font-medium text-slate-900 "
								title="Search Wrap"
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
										{
											name: "css",
											title: "CSS Library",
											icon: styles,
											className: "tab-css",
										},
									]}>
									<PGtab name="options"></PGtab>
									<PGtab name="styles">
										<PGStyles
											obj={searchWrap}
											onChange={onChangeStyleSearchWrap}
											onAdd={onAddStyleSearchWrap}
											onRemove={onRemoveStyleSearchWrap}
											onBulkAdd={onBulkAddIconToggle}
											onReset={onResetIconToggle}
										/>
									</PGtab>
								</PGtabs>
							</PanelBody>

							<PanelBody
								className="font-medium text-slate-900 "
								title="Search Input"
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
										{
											name: "css",
											title: "CSS Library",
											icon: styles,
											className: "tab-css",
										},
									]}>
									<PGtab name="options"></PGtab>
									<PGtab name="styles">
										<PGStyles
											obj={searchInput}
											onChange={onChangeStyleSearchInput}
											onAdd={onAddStyleSearchInput}
											onRemove={onRemoveStyleSearchInput}
										/>
									</PGtab>
								</PGtabs>
							</PanelBody>
						</PanelBody>

						<PanelBody
							className="font-medium text-slate-900 "
							title="Block Variations"
							initialOpen={false}>
							<PGLibraryBlockVariations
								blockName={"accordion-nested"}
								blockId={blockId}
								clientId={clientId}
								onChange={onPickBlockPatterns}
							/>
						</PanelBody>

						<div className="px-3">
							<PGMailSubsctibe />
							<PGContactSupport
								utm={{
									utm_source: "BlockText",
									utm_campaign: "PostGridCombo",
									utm_content: "BlockOptions",
								}}
							/>
						</div>
						<div className="px-3">
							<PGTutorials slug="accordion-nested" />
						</div>
					</div>
				</InspectorControls>

				<>
					{!hasInnerBlocks && (
						<div {...innerBlocksProps} className="flex justify-center my-4">
							<div className="border border-solid border-gray-300 w-[95%] rounded-md p-5">
								<div className="flex justify-between mb-5">
									<div className="text-xl rounded-sm">
										Click to pick a variation
									</div>

									<div
										className="pg-bg-color rounded-sm px-4 py-1 font-semibold text-lg text-white cursor-pointer"
										onClick={(ev) => {
											replaceInnerBlocks(
												clientId,
												createBlocksFromInnerBlocksTemplate([
													["post-grid/accordion-nested-item", {}],
												]),
												true
											);
										}}>
										Skip
									</div>
								</div>

								<div className="">
									<PGBlockVariationsPicker
										blockName={"accordion-nested"}
										blockId={blockId}
										clientId={clientId}
										onChange={onPickBlockVariation}
									/>
									{/* {variations.map((variation) => {
										return (
											// <div
											// 	className="text-center inline-block m-4 w-32 align-top p-4 bg-gray-400 cursor-pointer hover:bg-gray-500 relative"
											// 	onClick={(ev) => {
											// 		if (variation.isPro) {
											// 			alert(
											// 				"Sorry this variation only vailable in pro version"
											// 			);
											// 			return false;
											// 		}

											// 		var atts = variation.atts;

											// 		var wrapper = { ...atts.wrapper };
											// 		var searchWrap = { ...atts.searchWrap };
											// 		var searchInput = { ...atts.searchInput };
											// 		var content = { ...atts.content };
											// 		var header = { ...atts.header };
											// 		var headerLabel = { ...atts.headerLabel };
											// 		var labelCounter = { ...atts.labelCounter };
											// 		var labelIcon = { ...atts.labelIcon };
											// 		var icon = { ...atts.icon };
											// 		var iconToggle = { ...atts.iconToggle };
											// 		var blockCssY = { ...atts.blockCssY };

											// 		var blockCssObj = {};

											// 		blockCssObj[wrapperSelector] = wrapper;
											// 		blockCssObj[contentSelector] = content;
											// 		blockCssObj[headerSelector] = header;
											// 		blockCssObj[headerLabelSelector] = headerLabel;
											// 		blockCssObj[labelIconSelector] = labelIcon;
											// 		blockCssObj[labelCounterSelector] = labelCounter;
											// 		blockCssObj[searchWrapSelector] = searchWrap;
											// 		blockCssObj[searchInputSelector] = searchInput;
											// 		blockCssObj[iconSelector] = icon;
											// 		blockCssObj[iconToggleSelector] = iconToggle;

											// 		setAttributes({
											// 			wrapper: wrapper,
											// 			searchWrap: searchWrap,
											// 			searchInput: searchInput,
											// 			content: content,
											// 			header: header,
											// 			headerLabel: headerLabel,
											// 			labelCounter: labelCounter,
											// 			labelIcon: labelIcon,
											// 			icon: icon,
											// 			iconToggle: iconToggle,
											// 		});

											// 		var blockCssRules =
											// 			myStore.getBlockCssRules(blockCssObj);

											// 		var items = blockCssRules;

											// 		setAttributes({ blockCssY: { items: items } });

											// 		replaceInnerBlocks(
											// 			clientId,
											// 			createBlocksFromInnerBlocksTemplate(
											// 				variation.innerBlocks
											// 			),
											// 			true
											// 		);
											// 	}}>
											// 	<div>{variation.icon}</div>
											// 	<div>{variation.title}</div>

											// 	{variation.isPro && (
											// 		<span className="bg-amber-400 rounded-sm text-sm inline-block  bg-opacity-90 text-white hover:text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
											// 			<a
											// 				target="_blank"
											// 				className="block px-3"
											// 				href={
											// 					"https://getpostgrid.com/pricing/?utm_source=dropdownComponent&utm_term=proFeature&utm_campaign=pluginPostGrid&utm_medium=" +
											// 					variation.label
											// 				}>
											// 				Pro
											// 			</a>
											// 		</span>
											// 	)}
											// </div>
											
										);
									})} */}
								</div>
							</div>
						</div>
					)}
					{hasInnerBlocks && (
						<div {...innerBlocksProps}>
							{searchWrap.options.enable && (
								<div className={`${blockId}-accordion-search-wrap`}>
									<input
										className={`${blockId}-accordion-search-input my-4`}
										type={searchInput.options.type}
										placeholder={searchInput.options.placeholder}
										value={searchInput.options.value}
									/>
								</div>
							)}
							{innerBlocksProps.children}
						</div>
					)}
				</>
			</>
		);
	},
	save: function (props) {
		// to make a truly dynamic block, we're handling front end by render_callback under index.php file

		var attributes = props.attributes;

		var blockId = attributes.blockId;

		const blockProps = useBlockProps.save({
			className: ` ${blockId} pg-accordion-nested`,
		});
		//const innerBlocksProps = useInnerBlocksProps.save(blockProps);
		const { children, ...innerBlocksProps } =
			useInnerBlocksProps.save(blockProps);

		return <>{children}</>;

		//return null;
	},
});
