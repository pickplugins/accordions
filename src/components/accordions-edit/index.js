const { Component, RawHTML, useState, useEffect } = wp.element;
import { __ } from "@wordpress/i18n";

import {
	Icon,
	PanelBody,
	PanelRow,
	SelectControl,
	ToggleControl,
} from "@wordpress/components";
import { brush, close, settings } from "@wordpress/icons";

import breakPoints from "../../breakpoints";
import PGDropdown from "../dropdown";
import PGStyles from "../styles";
import PGtab from "../tab";
import PGtabs from "../tabs";
import PGIconPicker from "../icon-picker";

var myStore = wp.data.select("postgrid-shop");
import { RichText } from '@wordpress/block-editor'

function Html(props) {
	if (!props.warn) {
		return null;
	}

	var onChange = props.onChange;
	var postData = props.postData;

	if (postData.post_content == null) {
		return (
			<div className="p-3 my-5 bg-orange-400">Please choose an accordion first.</div>

		);
	}

	var breakPointX = "Desktop";


	var [accordionData, setaccordionData] = useState(postData.post_content); // Using the hook.
	var [styleObj, setstyleObj] = useState({}); // Using the hook.

	var [wrapper, setwrapper] = useState(accordionData.wrapper); // Using the hook.
	var [items, setwrapper] = useState(accordionData.items); // Using the hook.
	var [content, setcontent] = useState(accordionData.content);
	var [accOptions, setaccOptions] = useState(accordionData.accOptions);
	var [header, setheader] = useState(accordionData.header);
	var [headerActive, setheaderActive] = useState(accordionData.headerActive);
	var [headerLabel, setheaderLabel] = useState(accordionData.headerLabel);
	var [labelCounter, setlabelCounter] = useState(accordionData.labelCounter);
	var [labelIcon, setlabelIcon] = useState(accordionData.labelIcon);
	var [icon, seticon] = useState(accordionData.icon);
	var [iconToggle, seticonToggle] = useState(accordionData.iconToggle);

	const gapValue = accOptions?.gap || "0px";
	const [number, setNumber] = useState(parseInt(gapValue));
	const [unit, setUnit] = useState(gapValue.replace(number, ""));

	var breakPointList = [{ label: "Select..", icon: "", value: "" }];
	for (var x in breakPoints) {
		var breakPointItem = breakPoints[x];
		breakPointList.push({
			label: breakPointItem.name,
			icon: breakPointItem.icon,
			value: breakPointItem.id,
		});
	}

	var blockClass = ".pg-accordion-nested";

	var wrapperSelector = blockClass + "";
	var contentSelector = blockClass + " .accordion-content";
	var headerSelector = blockClass + " .accordion-header";
	var headerActiveSelector = blockClass + " .accordion-header-active";
	var headerLabelSelector = blockClass + " .accordion-header-label";
	var labelCounterSelector = blockClass + " .accordion-label-counter";
	var labelIconSelector = blockClass + " .accordion-label-icon";
	var iconSelector = blockClass + " .accordion-icon";
	var iconToggleSelector = blockClass + " .accordion-icon-toggle";

	var blockId = postData.ID;

	function getElementSelector(sudoScource, mainSelector) {
		var elementSelector = mainSelector;
		if (sudoScource == "styles") {
			elementSelector = mainSelector;
		} else if (sudoScource == "hover") {
			elementSelector = mainSelector + ":hover";
		} else if (sudoScource == "after") {
			elementSelector = mainSelector + "::after";
		} else if (sudoScource == "before") {
			elementSelector = mainSelector + "::before";
		} else if (sudoScource == "first-child") {
			elementSelector = mainSelector + ":first-child";
		} else if (sudoScource == "last-child") {
			elementSelector = mainSelector + ":last-child";
		} else if (sudoScource == "visited") {
			elementSelector = mainSelector + ":visited";
		} else if (sudoScource == "selection") {
			elementSelector = mainSelector + "::selection";
		} else if (sudoScource == "first-letter") {
			elementSelector = mainSelector + "::first-letter";
		} else if (sudoScource == "first-line") {
			elementSelector = mainSelector + "::first-line";
		} else {
			elementSelector = mainSelector + ":" + sudoScource;
		}
		return elementSelector;
	}
	function cssAttrParse(key) {
		var cssProp = "";
		if (key == "alignContent") {
			cssProp = "align-content";
		} else if (key == "alignItems") {
			cssProp = "align-items";
		} else if (key == "animationName") {
			cssProp = "animation-name";
		} else if (key == "alignSelf") {
			cssProp = "align-self";
		} else if (key == "aspectRatio") {
			cssProp = "aspect-ratio";
		} else if (key == "backfaceVisibility") {
			cssProp = "backface-visibility";
		} else if (key == "backgroundAttachment") {
			cssProp = "background-attachment";
		} else if (key == "backgroundBlendMode") {
			cssProp = "background-blend-mode";
		} else if (key == "backgroundClip") {
			cssProp = "background-clip";
		} else if (key == "bgColor") {
			cssProp = "background-color";
		} else if (key == "backgroundColor") {
			cssProp = "background-color";
		} else if (key == "backgroundOrigin") {
			cssProp = "background-origin";
		} else if (key == "backgroundRepeat") {
			cssProp = "background-repeat";
		} else if (key == "backgroundSize") {
			cssProp = "background-size";
		} else if (key == "backgroundPosition") {
			cssProp = "background-position";
		} else if (key == "backgroundImage") {
			cssProp = "background-image";
		} else if (key == "border") {
			cssProp = "border";
		} else if (key == "borderTop") {
			cssProp = "border-top";
		} else if (key == "borderRight") {
			cssProp = "border-right";
		} else if (key == "borderBottom") {
			cssProp = "border-bottom";
		} else if (key == "borderLeft") {
			cssProp = "border-left";
		} else if (key == "borderRadius") {
			cssProp = "border-radius";
		} else if (key == "borderCollapse") {
			cssProp = "border-collapse";
		} else if (key == "borderSpacing") {
			cssProp = "border-spacing";
		} else if (key == "borderImage") {
			cssProp = "border-image";
		} else if (key == "boxShadow") {
			cssProp = "box-shadow";
		} else if (key == "backdropFilter") {
			cssProp = "backdrop-filter";
		} else if (
			key == "bottom" ||
			key == "top" ||
			key == "left" ||
			key == "right" ||
			key == "clear" ||
			key == "color" ||
			key == "filter" ||
			key == "float"
		) {
			cssProp = key;
		} else if (key == "boxSizing") {
			cssProp = "box-sizing";
		} else if (key == "cursor") {
			cssProp = "cursor";
		} else if (key == "content") {
			cssProp = "content";
		} else if (key == "counterIncrement") {
			cssProp = "counter-increment";
		} else if (key == "counterReset") {
			cssProp = "counter-reset";
		} else if (key == "counterSet") {
			cssProp = "counter-set";
		} else if (key == "columnCount") {
			cssProp = "column-count";
		} else if (key == "columnRule") {
			cssProp = "column-rule";
		} else if (key == "direction") {
			cssProp = "direction";
		} else if (key == "fontFamily") {
			cssProp = "font-family";
		} else if (key == "fontSize") {
			cssProp = "font-size";
		} else if (key == "fontStyle") {
			cssProp = "font-style";
		} else if (key == "fontStretch") {
			cssProp = "font-stretch";
		} else if (key == "fontWeight") {
			cssProp = "font-weight";
		} else if (key == "fontVariantCaps") {
			cssProp = "font-variant-caps";
		} else if (key == "flexWrap") {
			cssProp = "flex-wrap";
		} else if (key == "flexDirection") {
			cssProp = "flex-direction";
		} else if (key == "flexGrow") {
			cssProp = "flex-grow";
		} else if (key == "flexShrink") {
			cssProp = "flex-shrink";
		} else if (key == "flexBasis") {
			cssProp = "flex-basis";
		} else if (key == "flexFlow") {
			cssProp = "flex-flow";
		} else if (key == "letterSpacing") {
			cssProp = "letter-spacing";
		} else if (key == "gridAutoFlow") {
			cssProp = "grid-auto-flow";
		} else if (key == "gridColumnEnd") {
			cssProp = "grid-column-end";
		} else if (key == "gridColumnStart") {
			cssProp = "grid-column-start";
		} else if (key == "gridRowEnd") {
			cssProp = "grid-row-end";
		} else if (key == "gridRowStart") {
			cssProp = "grid-row-start";
		} else if (key == "gridTemplateColumns") {
			cssProp = "grid-template-columns";
		} else if (key == "gridTemplateRows") {
			cssProp = "grid-template-rows";
		} else if (key == "listStyle") {
			cssProp = "list-style";
		} else if (key == "lineHeight") {
			cssProp = "line-height";
		} else if (key == "justifyContent") {
			cssProp = "justify-content";
		} else if (key == "maskImage") {
			cssProp = "mask-image";
		} else if (key == "objectFit") {
			cssProp = "object-fit";
		} else if (key == "opacity") {
			cssProp = "opacity";
		} else if (key == "outline") {
			cssProp = "outline";
		} else if (key == "order") {
			cssProp = "order";
		} else if (key == "outlineOffset") {
			cssProp = "outline-offset";
		} else if (key == "position") {
			cssProp = "position";
		} else if (key == "textIndent") {
			cssProp = "text-indent";
		} else if (key == "textJustify") {
			cssProp = "text-justify";
		} else if (key == "textTransform") {
			cssProp = "text-transform";
		} else if (key == "textDecoration") {
			cssProp = "text-decoration";
		} else if (key == "textOverflow") {
			cssProp = "text-overflow";
		} else if (key == "textShadow") {
			cssProp = "text-shadow";
		} else if (key == "textAlign") {
			cssProp = "text-align";
		} else if (key == "visibility") {
			cssProp = "visibility";
		} else if (key == "wordBreak") {
			cssProp = "word-break";
		} else if (key == "wordSpacing") {
			cssProp = "word-spacing";
		} else if (key == "zIndex") {
			cssProp = "z-index";
		} else if (key == "padding") {
			cssProp = "padding";
		} else if (key == "paddingTop") {
			cssProp = "padding-top";
		} else if (key == "paddingRight") {
			cssProp = "padding-right";
		} else if (key == "paddingBottom") {
			cssProp = "padding-bottom";
		} else if (key == "paddingLeft") {
			cssProp = "padding-left";
		} else if (key == "placeItems") {
			cssProp = "place-items";
		} else if (key == "margin") {
			cssProp = "margin";
		} else if (key == "marginTop") {
			cssProp = "margin-top";
		} else if (key == "marginRight") {
			cssProp = "margin-right";
		} else if (key == "marginBottom") {
			cssProp = "margin-bottom";
		} else if (key == "marginLeft") {
			cssProp = "margin-left";
		} else if (key == "display") {
			cssProp = "display";
		} else if (key == "width") {
			cssProp = "width";
		} else if (key == "height") {
			cssProp = "height";
		} else if (key == "verticalAlign") {
			cssProp = "vertical-align";
		} else if (key == "overflow") {
			cssProp = "overflow";
		} else if (key == "overflowX") {
			cssProp = "overflow-x";
		} else if (key == "overflowY") {
			cssProp = "overflow-y";
		} else if (key == "writingMode") {
			cssProp = "writing-mode";
		} else if (key == "wordWrap") {
			cssProp = "word-wrap";
		} else if (key == "perspective") {
			cssProp = "perspective";
		} else if (key == "minWidth") {
			cssProp = "min-width";
		} else if (key == "minHeight") {
			cssProp = "min-height";
		} else if (key == "maxHeight") {
			cssProp = "max-height";
		} else if (key == "maxWidth") {
			cssProp = "max-width";
		} else if (key == "transition") {
			cssProp = "transition";
		} else if (key == "transform") {
			cssProp = "transform";
		} else if (key == "transformOrigin") {
			cssProp = "transform-origin";
		} else if (key == "transformStyle") {
			cssProp = "transform-style";
		} else if (key == "tableLayout") {
			cssProp = "table-layout";
		} else if (key == "emptyCells") {
			cssProp = "empty-cells";
		} else if (key == "captionSide") {
			cssProp = "caption-side";
		} else if (key == "gap") {
			cssProp = "gap";
		} else if (key == "rowGap") {
			cssProp = "row-gap";
		} else if (key == "columnGap") {
			cssProp = "column-gap";
		} else if (key == "userSelect") {
			cssProp = "user-select";
		} else if (key == "-webkit-text-fill-color") {
			cssProp = "-webkit-text-fill-color";
		} else {
			cssProp = key;
		}
		return cssProp;
	}

	function generateElementCss(obj, elementSelector) {
		if (obj == null) {
			return {};
		}

		var cssObj = {};

		Object.entries(obj).map((args) => {
			var sudoSrc = args[0];
			var sudoArgs = args[1];
			if (sudoSrc != "options" && sudoArgs != null) {
				var selector = getElementSelector(sudoSrc, elementSelector);
				Object.entries(args[1]).map((x) => {
					var attr = x[0];
					var propVal = x[1];
					var cssPropty = cssAttrParse(attr);
					var found = Object.entries(propVal).reduce(
						(a, [k, v]) => (v ? ((a[k] = v), a) : a),
						{}
					);

					if (Object.keys(found).length > 0) {
						if (cssObj[selector] == undefined) {
							cssObj[selector] = {};
						}
						if (cssObj[selector][cssPropty] == undefined) {
							cssObj[selector][cssPropty] = {};
						}

						cssObj[selector][cssPropty] = x[1];
					}
				});
			}
		});

		return cssObj;
	}

	function generateBlockCss(items) {
		var reponsiveCssGroups = {};
		for (var selector in items) {
			var attrs = items[selector];
			for (var attr in attrs) {
				var breakpoints = attrs[attr];
				for (var device in breakpoints) {
					var attrValue = breakpoints[device];
					if (reponsiveCssGroups[device] == undefined) {
						reponsiveCssGroups[device] = [];
					}
					if (reponsiveCssGroups[device] == undefined) {
						reponsiveCssGroups[device] = [];
					}
					if (reponsiveCssGroups[device][selector] == undefined) {
						reponsiveCssGroups[device][selector] = [];
					}
					if (typeof attrValue == "string") {
						attrValue = attrValue.replaceAll("u0022", '"');
						reponsiveCssGroups[device][selector].push({
							attr: attr,
							val: attrValue,
						});
					}
				}
			}
		}
		var reponsiveCssDesktop = "";
		if (reponsiveCssGroups["Desktop"] != undefined) {
			for (var selector in reponsiveCssGroups["Desktop"]) {
				var attrs = reponsiveCssGroups["Desktop"][selector];
				reponsiveCssDesktop += selector + "{";
				for (var index in attrs) {
					var attr = attrs[index];
					var attrName = attr.attr;
					var attrValue = attr.val;
					reponsiveCssDesktop += attrName + ":" + attrValue + ";";
				}
				reponsiveCssDesktop += "}";
			}
		}
		var reponsiveCssTablet = "";
		if (reponsiveCssGroups["Tablet"] != undefined) {
			reponsiveCssTablet += "@media(max-width: 991px){";
			for (var selector in reponsiveCssGroups["Tablet"]) {
				var attrs = reponsiveCssGroups["Tablet"][selector];
				reponsiveCssTablet += selector + "{";
				for (var index in attrs) {
					var attr = attrs[index];
					var attrName = attr.attr;
					var attrValue = attr.val;
					reponsiveCssTablet += attrName + ":" + attrValue + ";";
				}
				reponsiveCssTablet += "}";
			}
			reponsiveCssTablet += "}";
		}
		var reponsiveCssMobile = "";
		if (reponsiveCssGroups["Mobile"] != undefined) {
			reponsiveCssMobile += "@media(max-width:767px){";
			for (var selector in reponsiveCssGroups["Mobile"]) {
				var attrs = reponsiveCssGroups["Mobile"][selector];
				reponsiveCssMobile += selector + "{";
				for (var index in attrs) {
					var attr = attrs[index];
					var attrName = attr.attr;
					var attrValue = attr.val;
					reponsiveCssMobile += attrName + ":" + attrValue + ";";
				}
				reponsiveCssMobile += "}";
			}
			reponsiveCssMobile += "}";
		}
		var reponsiveCss =
			reponsiveCssDesktop + reponsiveCssTablet + reponsiveCssMobile;

		var wpfooter = document.getElementById("wpfooter");
		var divWrap = document.getElementById("css-block");
		if (divWrap != undefined) {
			document.getElementById("css-block").outerHTML = "";
		}

		var divWrap = '<style id="css-block"></style>';
		wpfooter.insertAdjacentHTML("beforeend", divWrap);
		var csswrappg = document.getElementById("css-block");
		var str = "" + reponsiveCss + "";
		csswrappg.insertAdjacentHTML("beforeend", str);
	}

	useEffect(() => {
		//generateBlockCss(styleObj);
	}, [styleObj]);

	useEffect(() => {
		var styleObjX = { ...styleObj };


		var wrapperCss = generateElementCss(accordionData.wrapper, wrapperSelector);
		Object.entries(wrapperCss).map((selectors) => {
			var selector = selectors[0];
			var selectorData = selectors[1];
			styleObjX[selector] = selectorData;
		});


		var contentCss = generateElementCss(content, contentSelector);
		Object.entries(contentCss).map((selectors) => {
			var selector = selectors[0];
			var selectorData = selectors[1];
			styleObjX[selector] = selectorData;
		});

		var headerCss = generateElementCss(header, headerSelector);
		Object.entries(headerCss).map((selectors) => {
			var selector = selectors[0];
			var selectorData = selectors[1];
			styleObjX[selector] = selectorData;
		});

		var headerActiveCss = generateElementCss(headerActive, headerActiveSelector);
		Object.entries(headerActiveCss).map((selectors) => {
			var selector = selectors[0];
			var selectorData = selectors[1];
			styleObjX[selector] = selectorData;
		});

		var headerLabelCss = generateElementCss(
			headerLabel,
			headerLabelSelector
		);
		Object.entries(headerLabelCss).map((selectors) => {
			var selector = selectors[0];
			var selectorData = selectors[1];
			styleObjX[selector] = selectorData;
		});



		var labelCounterCss = generateElementCss(
			labelCounter,
			labelCounterSelector
		);
		Object.entries(labelCounterCss).map((selectors) => {
			var selector = selectors[0];
			var selectorData = selectors[1];
			styleObjX[selector] = selectorData;
		});

		var labelIconCss = generateElementCss(labelIcon, labelIconSelector);
		Object.entries(labelIconCss).map((selectors) => {
			var selector = selectors[0];
			var selectorData = selectors[1];
			styleObjX[selector] = selectorData;
		});



		var iconCss = generateElementCss(icon, iconSelector);
		Object.entries(iconCss).map((selectors) => {
			var selector = selectors[0];
			var selectorData = selectors[1];
			styleObjX[selector] = selectorData;
		});


		var iconToggleCss = generateElementCss(iconToggle, iconToggleSelector);
		Object.entries(iconToggleCss).map((selectors) => {
			var selector = selectors[0];
			var selectorData = selectors[1];
			styleObjX[selector] = selectorData;
		});


		setstyleObj(styleObjX)



	}, [accordionData]);





	useEffect(() => {
		var accordionDataX = { ...accordionData };
		accordionData.accOptions = accOptions;
		setaccordionData(accordionDataX);
	}, [accOptions]);

	useEffect(() => {
		var accordionDataX = { ...accordionData };
		accordionData.wrapper = wrapper;
		setaccordionData(accordionDataX);


	}, [wrapper]);

	useEffect(() => {
		var accordionDataX = { ...accordionData };
		accordionData.content = content;
		setaccordionData(accordionDataX);


	}, [content]);

	useEffect(() => {
		var accordionDataX = { ...accordionData };
		accordionData.header = header;
		setaccordionData(accordionDataX);




	}, [header]);

	useEffect(() => {
		var accordionDataX = { ...accordionData };
		accordionData.headerActive = headerActive;
		setaccordionData(accordionDataX);




	}, [headerActive]);

	useEffect(() => {
		var accordionDataX = { ...accordionData };
		accordionData.headerLabel = headerLabel;
		setaccordionData(accordionDataX);




	}, [headerLabel]);

	useEffect(() => {
		var accordionDataX = { ...accordionData };
		accordionData.labelCounter = labelCounter;
		setaccordionData(accordionDataX);




	}, [labelCounter]);

	useEffect(() => {
		var accordionDataX = { ...accordionData };
		accordionData.labelIcon = labelIcon;
		setaccordionData(accordionDataX);

	}, [labelIcon]);

	useEffect(() => {
		var accordionDataX = { ...accordionData };
		accordionData.icon = icon;
		setaccordionData(accordionDataX);




	}, [icon]);

	useEffect(() => {
		var accordionDataX = { ...accordionData };
		accordionData.iconToggle = iconToggle;
		setaccordionData(accordionDataX);


	}, [iconToggle]);

	var RemoveSliderArg = function ({ index }) {
		return (
			<span
				className="cursor-pointer hover:bg-red-500 hover:text-white "
				onClick={(ev) => {
					var sliderOptionsX = { ...accOptions };
					delete sliderOptionsX[index];
					setaccOptions(sliderOptionsX);
				}}>
				<Icon icon={close} />
			</span>
		);
	};

	function onChangeStyle(sudoScource, newVal, attr, propertyType, setProperty) {
		var path = [sudoScource, attr, breakPointX];
		let obj = { ...propertyType };
		const object = myStore.updatePropertyDeep(obj, path, newVal);
		setProperty(object);
	}

	function onAddStyle(sudoScource, key, propertyType, setProperty) {
		var path = [sudoScource, key, breakPointX];
		let obj = { ...propertyType };
		const object = myStore.addPropertyDeep(obj, path, "");
		setProperty(object);
	}

	function onResetStyle(sudoSources, propertyType, setProperty) {
		let obj = Object.assign({}, propertyType);
		Object.entries(sudoSources).map((args) => {
			var sudoScource = args[0];
			if (obj[sudoScource] == undefined) {
			} else {
				obj[sudoScource] = {};
				// var elementSelector = myStore.getElementSelector(
				// 	sudoScource,
				// 	contentSelector // Replace this selector if needed
				// );
			}
		});
		setProperty(obj);
	}

	function onRemoveStyle(sudoScource, key, propertyType, setProperty) {
		let obj = { ...propertyType };
		var object = myStore.deletePropertyDeep(obj, [
			sudoScource,
			key,
			breakPointX,
		]);
		var isEmpty =
			Object.entries(object[sudoScource][key]).length === 0 ? true : false;
		var objectX = isEmpty
			? myStore.deletePropertyDeep(object, [sudoScource, key])
			: object;
		setProperty(objectX);
	}

	var accOptionsArgs = {
		autoplay: { label: "Auto play", value: 1 },
	};

	var viewTypeArgs = {
		accordion: { label: "accordion", value: "accordion" },
		tabs: { label: "tabs", value: "tabs" },
		tabsVertical: { label: "tabsVertical", value: "tabsVertical" },
	};

	return (
		<div className="">

			{JSON.stringify(content)}


			{props.postData.post_content != null && (
				<>
					<div className="my-4 p-3">
						<PGDropdown
							position="bottom right"
							variant="secondary"
							buttonTitle={"Choose View Type"}
							options={viewTypeArgs}
							onChange={(option, index) => {
								var sliderOptionsX = { ...accOptions };
								sliderOptionsX.viewType = option.value;
								setaccOptions(sliderOptionsX);
							}}
							values=""></PGDropdown>
					</div>
					<PanelBody
						className="font-medium text-slate-900 "
						title="Accordion Settings"
						initialOpen={false}>
						<PGtab name="normal">
							<PanelRow className="my-3">
								<label>{__("Accordion Options", "post-grid")}</label>
								<PGDropdown
									position="bottom right"
									variant="secondary"
									buttonTitle={"Choose"}
									options={accOptionsArgs}
									onChange={(option, index) => {
										var sliderOptionsX = { ...accOptions };
										sliderOptionsX[index] = option.value;
										setaccOptions(sliderOptionsX);
									}}
									values=""></PGDropdown>
							</PanelRow>
							<PanelRow className="justify-start gap-4 mb-3"></PanelRow>
							{Object.entries(accOptions).map((item, index) => {
								var id = item[0];
								var value = item[1];
								return (
									<div key={index}>
										{id == "collapsible" && (
											<PanelRow>
												<div className="flex items-center">
													<RemoveSliderArg index={id} />
													<span>{__("collapsible?", "post-grid")}</span>
												</div>
												<SelectControl
													label=""
													value={value}
													options={[
														{ label: __("True", "post-grid"), value: 1 },
														{ label: __("False", "post-grid"), value: 0 },
													]}
													onChange={(newVal) => {
														var sliderOptionsX = { ...accOptions };
														sliderOptionsX[id] = newVal;
														setaccOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}
									</div>
								);
							})}
						</PGtab>
						<div></div>
					</PanelBody>
					{/* ////////////wrapper */}
					<PanelBody
						className="font-medium text-slate-900 "
						title="Wrapper"
						initialOpen={false}>
						<PGtabs
							activeTab="options"
							orientation="horizontal"
							activeClass="active-tab"
							onSelect={(tabName) => { }}
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
							<PGtab name="options"></PGtab>
							<PGtab name="styles">
								<PGStyles
									obj={wrapper}
									onChange={(sudoScource, newVal, attr) =>
										onChangeStyle(
											sudoScource,
											newVal,
											attr,
											wrapper,
											setwrapper
										)
									}
									onAdd={(sudoScource, key) =>
										onAddStyle(sudoScource, key, wrapper, setwrapper)
									}
									onRemove={(sudoScource, key) =>
										onRemoveStyle(sudoScource, key, wrapper, setwrapper)
									}
									onReset={(sudoSources) =>
										onResetStyle(sudoSources, wrapper, setwrapper)
									}
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
							onSelect={(tabName) => { }}
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
							<PGtab name="options"></PGtab>
							<PGtab name="styles">
								<PGStyles
									obj={content}
									onChange={(sudoScource, newVal, attr) =>
										onChangeStyle(
											sudoScource,
											newVal,
											attr,
											content,
											setcontent
										)
									}
									onAdd={(sudoScource, key) =>
										onAddStyle(sudoScource, key, content, setcontent)
									}
									onRemove={(sudoScource, key) =>
										onRemoveStyle(sudoScource, key, content, setcontent)
									}
									onReset={(sudoSources) =>
										onResetStyle(sudoSources, content, setcontent)
									}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>
					{/* /////////header */}
					<PanelBody
						className="font-medium text-slate-900 "
						title="Header"
						initialOpen={false}>
						<PGtabs
							activeTab="options"
							orientation="horizontal"
							activeClass="active-tab"
							onSelect={(tabName) => { }}
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
							<PGtab name="options"></PGtab>
							<PGtab name="styles">
								<PGStyles
									obj={header}
									onChange={(sudoScource, newVal, attr) =>
										onChangeStyle(sudoScource, newVal, attr, header, setheader)
									}
									onAdd={(sudoScource, key) =>
										onAddStyle(sudoScource, key, header, setheader)
									}
									onRemove={(sudoScource, key) =>
										onRemoveStyle(sudoScource, key, header, setheader)
									}
									onReset={(sudoSources) =>
										onResetStyle(sudoSources, header, setheader)
									}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>
					{/* ////////headerActive */}
					<PanelBody
						className="font-medium text-slate-900 "
						title="Header Active"
						initialOpen={false}>
						<PGtabs
							activeTab="options"
							orientation="horizontal"
							activeClass="active-tab"
							onSelect={(tabName) => { }}
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
							<PGtab name="options"></PGtab>
							<PGtab name="styles">
								<PGStyles
									obj={headerActive}
									onChange={(sudoScource, newVal, attr) =>
										onChangeStyle(
											sudoScource,
											newVal,
											attr,
											headerActive,
											setheaderActive
										)
									}
									onAdd={(sudoScource, key) =>
										onAddStyle(sudoScource, key, headerActive, setheaderActive)
									}
									onRemove={(sudoScource, key) =>
										onRemoveStyle(
											sudoScource,
											key,
											headerActive,
											setheaderActive
										)
									}
									onReset={(sudoSources) =>
										onResetStyle(sudoSources, headerActive, setheaderActive)
									}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>
					{/* /////////headerLabel */}
					<PanelBody
						className="font-medium text-slate-900 "
						title="Header Label"
						initialOpen={false}>
						<PGtabs
							activeTab="options"
							orientation="horizontal"
							activeClass="active-tab"
							onSelect={(tabName) => { }}
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
							<PGtab name="options"></PGtab>
							<PGtab name="styles">
								<PGStyles
									obj={headerLabel}
									onChange={(sudoScource, newVal, attr) =>
										onChangeStyle(
											sudoScource,
											newVal,
											attr,
											headerLabel,
											setheaderLabel
										)
									}
									onAdd={(sudoScource, key) =>
										onAddStyle(sudoScource, key, headerLabel, setheaderLabel)
									}
									onRemove={(sudoScource, key) =>
										onRemoveStyle(sudoScource, key, headerLabel, setheaderLabel)
									}
									onReset={(sudoSources) =>
										onResetStyle(sudoSources, headerLabel, setheaderLabel)
									}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>
					{/* ///////////labelCounter */}
					<PanelBody
						className="font-medium text-slate-900 "
						title="Label Counter"
						initialOpen={false}>
						<PGtabs
							activeTab="options"
							orientation="horizontal"
							activeClass="active-tab"
							onSelect={(tabName) => { }}
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
									<label htmlFor="" className="font-medium text-slate-900 ">
										{__("Counter position", "post-grid")}
									</label>
									<SelectControl
										label=""
										value={labelCounter.options.position}
										options={[
											{
												label: __("Choose Position", "post-grid"),
												value: "",
											},
											{ label: __("Left", "post-grid"), value: "left" },
											{ label: __("Right", "post-grid"), value: "right" },
											{
												label: __("Before Label Text", "post-grid"),
												value: "beforeLabelText",
											},
											{
												label: __("After Label Text", "post-grid"),
												value: "afterLabelText",
											},
										]}
										onChange={(newVal) => {
											var labelCounterX = { ...labelCounter }

											var optionsX = {
												...labelCounterX.options,
												position: newVal,

											};

											labelCounterX.options = optionsX;
											setlabelCounter(labelCounterX);
										}}
									/>
								</PanelRow>

							</PGtab>
							<PGtab name="styles">
								<PGStyles
									obj={labelCounter}
									onChange={(sudoScource, newVal, attr) =>
										onChangeStyle(
											sudoScource,
											newVal,
											attr,
											labelCounter,
											setlabelCounter
										)
									}
									onAdd={(sudoScource, key) =>
										onAddStyle(sudoScource, key, labelCounter, setlabelCounter)
									}
									onRemove={(sudoScource, key) =>
										onRemoveStyle(
											sudoScource,
											key,
											labelCounter,
											setlabelCounter
										)
									}
									onReset={(sudoSources) =>
										onResetStyle(sudoSources, labelCounter, setlabelCounter)
									}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>
					{/* ////////LabelIcon */}
					<PanelBody
						className="font-medium text-slate-900 "
						title="Label Icon"
						initialOpen={false}>
						<PGtabs
							activeTab="options"
							orientation="horizontal"
							activeClass="active-tab"
							onSelect={(tabName) => { }}
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
									<label htmlFor="" className="font-medium text-slate-900 ">
										{__("Choose Label Icon", "post-grid")}
									</label>
									<PGIconPicker
										library={labelIcon.options.library}
										srcType={labelIcon.options.srcType}
										iconSrc={labelIcon.options.iconSrc}
										onChange={(arg) => {


											var labelIconX = { ...labelIcon }

											var optionsX = {
												...labelIconX.options,
												srcType: arg.srcType,
												library: arg.library,
												iconSrc: arg.iconSrc,
											};

											labelIconX.options = optionsX;
											setlabelIcon(labelIconX);
										}}
									/>
								</PanelRow>

								<PanelRow>
									<label htmlFor="" className="font-medium text-slate-900 ">
										{__("Icon position", "post-grid")}
									</label>
									<SelectControl
										label=""
										value={labelIcon.options.position}
										options={[
											{
												label: __("Choose Position", "post-grid"),
												value: "",
											},
											{
												label: __("Before Label", "post-grid"),
												value: "beforeLabel",
											},
											{
												label: __("After Label", "post-grid"),
												value: "afterLabel",
											},
											{
												label: __("Before Label Text", "post-grid"),
												value: "beforeLabelText",
											},
											{
												label: __("After Label Text", "post-grid"),
												value: "afterLabelText",
											},
										]}
										onChange={(newVal) => {

											var labelIconX = { ...labelIcon }

											var optionsX = {
												...labelIconX.options,
												position: newVal,

											};

											labelIconX.options = optionsX;
											setlabelIcon(labelIconX);





										}}
									/>
								</PanelRow>


							</PGtab>
							<PGtab name="styles">
								<PGStyles
									obj={labelIcon}
									onChange={(sudoScource, newVal, attr) =>
										onChangeStyle(
											sudoScource,
											newVal,
											attr,
											labelIcon,
											setlabelIcon
										)
									}
									onAdd={(sudoScource, key) =>
										onAddStyle(sudoScource, key, labelIcon, setlabelIcon)
									}
									onRemove={(sudoScource, key) =>
										onRemoveStyle(sudoScource, key, labelIcon, setlabelIcon)
									}
									onReset={(sudoSources) =>
										onResetStyle(sudoSources, labelIcon, setlabelIcon)
									}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>
					{/* <PanelBody
						className="font-medium text-slate-900 "
						title="Navigation"
						initialOpen={false}>
						<div>
							<PGtabs
								activeTab="presets"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => {}}
								tabs={[
									{
										name: "presets",
										title: "presets",
										icon: settings,
										className: "tab-presets",
									},
									{
										name: "custom",
										title: "Custom",
										icon: brush,
										className: "tab-custom",
									},
								]}>
								<PGtab name="presets"></PGtab>
								<PGtab name="custom"></PGtab>
							</PGtabs>
						</div>
					</PanelBody> */}
					{/* ///////////Icon  */}
					<PanelBody
						className="font-medium text-slate-900 "
						title="Icon"
						initialOpen={false}>
						<PGtabs
							activeTab="options"
							orientation="horizontal"
							activeClass="active-tab"
							onSelect={(tabName) => { }}
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
									<label htmlFor="" className="font-medium text-slate-900 ">
										{__("Choose Icon", "post-grid")}
									</label>
									<PGIconPicker
										library={icon.options.library}
										srcType={icon.options.srcType}
										iconSrc={icon.options.iconSrc}
										onChange={(arg) => {


											var iconX = { ...icon }

											var optionsX = {
												...iconX.options,
												srcType: arg.srcType,
												library: arg.library,
												iconSrc: arg.iconSrc,
											};

											iconX.options = optionsX;
											seticon(iconX);
										}}
									/>
								</PanelRow>
								<PanelRow>
									<label htmlFor="" className="font-medium text-slate-900 ">
										{__("Choose Toggle Icon", "post-grid")}
									</label>
									<PGIconPicker
										library={iconToggle.options.library}
										srcType={iconToggle.options.srcType}
										iconSrc={iconToggle.options.iconSrc}
										onChange={(arg) => {


											var iconToggleX = { ...iconToggle }

											var optionsX = {
												...iconToggleX.options,
												srcType: arg.srcType,
												library: arg.library,
												iconSrc: arg.iconSrc,
											};

											iconToggleX.options = optionsX;
											seticonToggle(iconToggleX);
										}}
									/>
								</PanelRow>







								<PanelRow>
									<label htmlFor="" className="font-medium text-slate-900 ">
										{__("Icon position", "post-grid")}
									</label>
									<SelectControl
										label=""
										value={icon.options.position}
										options={[
											{
												label: __("Choose Position", "post-grid"),
												value: "",
											},
											{ label: __("Left", "post-grid"), value: "left" },
											{ label: __("Right", "post-grid"), value: "right" },
										]}
										onChange={(newVal) => {

											var iconX = { ...icon }

											var optionsX = {
												...iconX.options,
												position: newVal,

											};

											iconX.options = optionsX;
											seticon(iconX);





										}}
									/>
								</PanelRow>

							</PGtab>
							<PGtab name="styles">
								<PGStyles
									obj={icon}
									onChange={(sudoScource, newVal, attr) =>
										onChangeStyle(sudoScource, newVal, attr, icon, seticon)
									}
									onAdd={(sudoScource, key) =>
										onAddStyle(sudoScource, key, icon, seticon)
									}
									onRemove={(sudoScource, key) =>
										onRemoveStyle(sudoScource, key, icon, seticon)
									}
									onReset={(sudoSources) =>
										onResetStyle(sudoSources, icon, seticon)
									}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>
					{/* ///////////Icon Toggle  */}
					<PanelBody
						className="font-medium text-slate-900 "
						title="Icon Toggle"
						initialOpen={false}>
						<PGtabs
							activeTab="options"
							orientation="horizontal"
							activeClass="active-tab"
							onSelect={(tabName) => { }}
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







							</PGtab>
							<PGtab name="styles">
								<PGStyles
									obj={iconToggle}
									onChange={(sudoScource, newVal, attr) =>
										onChangeStyle(
											sudoScource,
											newVal,
											attr,
											iconToggle,
											seticonToggle
										)
									}
									onAdd={(sudoScource, key) =>
										onAddStyle(sudoScource, key, iconToggle, seticonToggle)
									}
									onRemove={(sudoScource, key) =>
										onRemoveStyle(sudoScource, key, iconToggle, seticonToggle)
									}
									onReset={(sudoSources) =>
										onResetStyle(sudoSources, iconToggle, seticonToggle)
									}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>
				</>
			)}
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
		var { onChange, postData } = this.props;

		console.log(postData);


		return (
			<Html
				onChange={onChange}
				postData={postData}
				warn={this.state.showWarning}
				isLoaded={this.state.isLoaded}
			/>
		);
	}
}

export default AccordionsEdit;
