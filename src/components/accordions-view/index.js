
const { Component, RawHTML, useState, useEffect } = wp.element;
import { RichText } from '@wordpress/block-editor'

import { Icon, close, settings, cloud, plus, post } from "@wordpress/icons";
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
	ToggleControl,
	CustomSelectControl,
	Popover,
	__experimentalInputControl as InputControl,
} from "@wordpress/components";
import apiFetch from "@wordpress/api-fetch";
import { Splide, SplideTrack } from "@splidejs/react-splide";

import PGDropdown from '../../components/dropdown'


var myStore = wp.data.select("postgrid-shop");

function Html(props) {

	if (!props.warn) {
		return null;
	}


	var id = props.id;
	var isLoading = props.isLoading;


	var postData = props.postData;
	var accordionDataX = postData.post_content;



	// var [accordionDasdasd, setaccordionDasdasd] = useState(postData.post_content); // Using the hook.


	if (accordionDataX == null) {
		return null;
	}

	var [postData, setpostData] = useState(postData); // Using the hook.
	var [accordionData, setaccordionData] = useState(accordionDataX); // Using the hook.

	var [styleObj, setstyleObj] = useState({}); // Using the hook.

	var [wrapper, setwrapper] = useState(accordionData.wrapper); // Using the hook.
	var [items, setitems] = useState(accordionData.items); // Using the hook.
	var [content, setcontent] = useState(accordionData.content);
	var [accOptions, setaccOptions] = useState(accordionData.accOptions);
	var [header, setheader] = useState(accordionData.header);
	var [headerActive, setheaderActive] = useState(accordionData.headerActive);
	var [headerLabel, setheaderLabel] = useState(accordionData.headerLabel);
	var [labelCounter, setlabelCounter] = useState(accordionData.labelCounter);
	var [labelIcon, setlabelIcon] = useState(accordionData.labelIcon);
	var [icon, seticon] = useState(accordionData.icon);
	var [iconToggle, seticonToggle] = useState(accordionData.iconToggle);



	const [toggled, setToggled] = useState(false);
	const [labelIconHtml, setlabelIconHtml] = useState("");

	const [iconHtml, seticonHtml] = useState("");
	const [iconToggleHtml, seticonToggleHtml] = useState("");

	useEffect(() => {
		var iconSrc = iconToggle?.options?.iconSrc;
		var iconHtml = `<span class="${iconSrc}"></span>`;
		seticonToggleHtml(iconHtml);
	}, [iconToggle?.options]);

	useEffect(() => {
		var iconSrc = icon?.options?.iconSrc;
		var iconHtml = `<span class="${iconSrc}"></span>`;
		seticonHtml(iconHtml);
	}, [icon?.options]);

	useEffect(() => {
		var iconSrc = labelIcon?.options?.iconSrc;
		var iconHtml = `<span class="${iconSrc}"></span>`;
		setlabelIconHtml(iconHtml);
	}, [labelIcon?.options]);


	var [active, setactive] = useState(0);



	var blockId = "";
	var blockIdX = "";


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
		generateBlockCss(styleObj);
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










	return (
		<div className="ml-5">





			<div className="flex items-center justify-between align-middle bg-white p-5  mb-5">
				<div className="flex items-center gap-5">





					<h2>
						{postData?.post_title && (
							<>You are editing: {postData.post_title}</>
						)}
					</h2>
				</div>

				<div>
					{isLoading && (
						<div className="">
							<Spinner />
						</div>
					)}


					<div className='bg-slate-400 px-5 py-2 cursor-pointer hover:bg-slate-300' onClick={ev => {
						var itemsX = [...items]

						itemsX.push({
							headerLabel: {
								"options": {
									"text": "Accordion Header",
									"slug": "",
									"tag": "",
									"class": "accordion-header-label",
								},
							},
							content: {
								"options": {
									"tag": "",
									"class": "accordion-content",
									text: "Accordion content"
								},
							},
						});
						setitems(itemsX)
					}}>Add New</div>

				</div>
			</div>

			<div></div>






			<div className={`my-5 ${wrapper?.options?.class} `}>
				{items?.map((item, index) => {

					return (
						<>
							<div
								className={`${blockId}-accordion-header ${blockIdX}  ${header.options.class
									} ${active == index ? "accordion-header-active" : ""}`}
								onClick={(ev) => {
									setToggled(!toggled);
									setactive(index)
								}}>
								{labelCounter.options.position == "left" && (
									<span
										className={`${blockId}-accordion-label-counter accordion-label-counter`}>
										{index}
									</span>
								)}
								{icon.options.position == "left" && (
									<>
										{!toggled && (
											<span
												className={`${blockId}-accordion-icon accordion-icon`}
												dangerouslySetInnerHTML={{ __html: iconHtml }}></span>
										)}
										{toggled && (
											<span
												className={`${blockId}-accordion-icon-toggle accordion-icon accordion-icon-toggle}`}
												dangerouslySetInnerHTML={{ __html: iconToggleHtml }}></span>
										)}
									</>
								)}
								{labelIcon.options.position == "beforeLabel" && (
									<span
										className={`${blockId}-accordion-label-icon accordion-label-icon`}
										dangerouslySetInnerHTML={{ __html: labelIconHtml }}></span>
								)}
								<div
									className={`${blockId}-accordion-header-label accordion-header-label`}
									onClick={(e) => {
										return;
									}}>
									{labelCounter.options.position == "beforeLabelText" && (
										<span
											className={`${blockId}-accordion-label-counter accordion-label-counter`}>
											{index}
										</span>
									)}
									{labelIcon.options.position == "beforeLabelText" && (
										<span
											className={`${blockId}-accordion-label-icon accordion-label-icon`}
											dangerouslySetInnerHTML={{ __html: labelIconHtml }}></span>
									)}
									{item.headerLabel?.options.text.length > 0 ? (

										<>
											<RichText
												className=""
												tagName={"span"}
												value={item?.headerLabel.options.text}
												allowedFormats={["core/bold", "core/italic", "core/link"]}
												onChange={(content) => {
													var itemsX = [...items]

													itemsX[index].headerLabel.options.text = content;
													setitems(itemsX)

												}}
												placeholder={""}
											/>
										</>

									) : (
										"Start Writing..."
									)}
									{labelIcon.options.position == "afterLabelText" && (
										<span
											className={`${blockId}-accordion-label-icon accordion-label-icon`}
											dangerouslySetInnerHTML={{ __html: labelIconHtml }}></span>
									)}
									{labelCounter.options.position == "afterLabelText" && (
										<span
											className={`${blockId}-accordion-label-counter accordion-label-counter`}>
											{index}
										</span>
									)}
								</div>
								{labelIcon.options.position == "afterLabel" && (
									<span
										className={`${blockId}-accordion-label-icon accordion-label-icon`}
										dangerouslySetInnerHTML={{ __html: labelIconHtml }}></span>
								)}
								{labelCounter.options.position == "right" && (
									<span
										className={`${blockId}-accordion-label-counter accordion-label-counter`}>
										{index}
									</span>
								)}
								{icon.options.position == "right" && (
									<>
										{!toggled && (
											<span
												className={`${blockId}-accordion-icon accordion-icon`}
												dangerouslySetInnerHTML={{ __html: iconHtml }}></span>
										)}
										{toggled && (
											<span
												className={`${blockId}-accordion-icon-toggle accordion-icon-toggle`}
												dangerouslySetInnerHTML={{ __html: iconToggleHtml }}></span>
										)}
									</>
								)}


								<span
									className="cursor-pointer hover:bg-red-500 hover:text-white "
									onClick={(ev) => {
										var itemsX = [...items]

										itemsX.splice(index, 1);
										setitems(itemsX)
									}}>
									<Icon icon={close} />
								</span>


							</div>
							{active == index && (
								<>


									<RichText
										className={`${blockId}-accordion-content accordion-content`}
										tagName={"div"}
										value={item?.content.options.text}
										allowedFormats={["core/bold", "core/italic", "core/link"]}
										onChange={(content) => {
											var itemsX = [...items]

											itemsX[index].content.options.text = content;
											setitems(itemsX)
											//setsearchPrams({ ...searchPrams, content: content });
										}}
										placeholder={"Write details about your design..."}
									/>
								</>
							)}
						</>
					);
				})}
			</div>


		</div>
	);
}

class AccordionsView extends Component {
	constructor(props) {
		super(props);
		this.state = { showWarning: true };
		this.handleToggleClick = this.handleToggleClick.bind(this);
	}

	handleToggleClick() {
		this.setState((state) => ({
			showWarning: !state.showWarning,
		}));
	}


	render() {
		var { postData, id, isLoading } = this.props;

		return (
			<Html
				isLoading={isLoading}
				postData={postData}
				id={id}
				warn={this.state.showWarning}
			/>
		);
	}
}

export default AccordionsView;
