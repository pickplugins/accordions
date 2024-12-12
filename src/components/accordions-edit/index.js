const { Component, RawHTML, useState, useEffect } = wp.element;
import { __ } from "@wordpress/i18n";

import {
	Icon,
	__experimentalInputControl as InputControl,
	PanelBody,
	PanelRow,
	SelectControl,
} from "@wordpress/components";
import { brush, close, settings } from "@wordpress/icons";

import breakPoints from "../../breakpoints";
import PGDropdown from "../dropdown";
import PGStyles from "../styles";
import PGtab from "../tab";
import PGtabs from "../tabs";

var myStore = wp.data.select("postgrid-shop");

function Html(props) {
	if (!props.warn) {
		return null;
	}

	var onChange = props.onChange;
	var postData = props.postData;

	var breakPointX = "Desktop";


	var accordionDataX = postData.post_content;



	var [styleObj, setstyleObj] = useState({}); // Using the hook.

	var [wrapper, setwrapper] = useState(accordionDataX.wrapper); // Using the hook.
	var [itemsWrap, setitemsWrap] = useState(accordionDataX.itemsWrap);
	var [item, setitem] = useState(accordionDataX.item);
	var [accOptions, setsliderOptions] = useState(accordionDataX.accOptions);
	var [navsWrap, setnavsWrap] = useState(accordionDataX.navsWrap);
	var [prev, setprev] = useState(accordionDataX.prev);
	var [next, setnext] = useState(accordionDataX.next);
	var [prevIcon, setprevIcon] = useState(accordionDataX.prevIcon);
	var [nextIcon, setnextIcon] = useState(accordionDataX.nextIcon);
	var [paginationWrap, setpaginationWrap] = useState(accordionDataX.paginationWrap);
	var [paginationActive, setpaginationActive] = useState(accordionDataX.paginationActive);
	var [pagination, setpagination] = useState(accordionDataX.pagination);



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




	var blockClass = ".wcps-content-slider";


	var wrapperSelector = blockClass + " .splide";
	var itemsWrapSelector = blockClass + " .splide__track";
	var itemSelector = blockClass + " .pg-content-slider-item";
	var nextSelector = blockClass + " .splide__arrow--next";
	var prevSelector = blockClass + " .splide__arrow--prev";
	var nextIconSelector = blockClass + " .splide__arrow--next .icon";
	var prevIconSelector = blockClass + " .splide__arrow--prev .icon";
	var navsWrapSelector = blockClass + " .splide__arrows";
	var paginationWrapSelector = blockClass + " .splide__pagination";
	var paginationSelector = blockClass + " .splide__pagination__page";
	var paginationActiveSelector =
		blockClass + " .splide__pagination__page.is-active";










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
				var selector = getElementSelector(

					sudoSrc,
					elementSelector
				);
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
		var reponsiveCss = reponsiveCssDesktop + reponsiveCssTablet + reponsiveCssMobile;

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

		console.log(styleObj);
		generateBlockCss(styleObj)

	}, [styleObj]);



	useEffect(() => {
		var postDataX = { ...postData };
		postDataX.post_content.accOptions = accOptions;
		onChange(postDataX)
	}, [accOptions]);

	useEffect(() => {
		var postDataX = { ...postData };
		postDataX.post_content.wrapper = wrapper;
		onChange(postDataX)


		var styleObjX = { ...styleObj }
		var wrapperCss = generateElementCss(wrapper, wrapperSelector)
		Object.entries(wrapperCss).map(selectors => {
			var selector = selectors[0]
			var selectorData = selectors[1]
			styleObjX[selector] = selectorData;
		})
		setstyleObj(styleObjX)

	}, [wrapper]);

	useEffect(() => {
		var postDataX = { ...postData };
		postDataX.post_content.itemsWrap = itemsWrap;
		onChange(postDataX)

		var styleObjX = { ...styleObj }
		var itemsWrapCss = generateElementCss(itemsWrap, itemsWrapSelector)
		Object.entries(itemsWrapCss).map(selectors => {
			var selector = selectors[0]
			var selectorData = selectors[1]
			styleObjX[selector] = selectorData;
		})
		setstyleObj(styleObjX)


	}, [itemsWrap]);

	useEffect(() => {
		var postDataX = { ...postData };
		postDataX.post_content.item = item;
		onChange(postDataX)

		var styleObjX = { ...styleObj }
		var itemCss = generateElementCss(item, itemSelector)
		Object.entries(itemCss).map(selectors => {
			var selector = selectors[0]
			var selectorData = selectors[1]
			styleObjX[selector] = selectorData;
		})
		setstyleObj(styleObjX)
	}, [item]);




	useEffect(() => {
		var postDataX = { ...postData };
		postDataX.post_content.navsWrap = navsWrap;
		onChange(postDataX)

		var styleObjX = { ...styleObj }
		var navsWrapCss = generateElementCss(navsWrap, navsWrapSelector)
		Object.entries(navsWrapCss).map(selectors => {
			var selector = selectors[0]
			var selectorData = selectors[1]
			styleObjX[selector] = selectorData;
		})
		setstyleObj(styleObjX)
	}, [navsWrap]);


	useEffect(() => {
		var postDataX = { ...postData };
		postDataX.post_content.prev = prev;
		onChange(postDataX)

		var styleObjX = { ...styleObj }
		var prevCss = generateElementCss(prev, prevSelector)
		Object.entries(prevCss).map(selectors => {
			var selector = selectors[0]
			var selectorData = selectors[1]
			styleObjX[selector] = selectorData;
		})
		setstyleObj(styleObjX)
	}, [prev]);

	useEffect(() => {
		var postDataX = { ...postData };
		postDataX.post_content.next = next;
		onChange(postDataX)

		var styleObjX = { ...styleObj }
		var nextCss = generateElementCss(next, nextSelector)
		Object.entries(nextCss).map(selectors => {
			var selector = selectors[0]
			var selectorData = selectors[1]
			styleObjX[selector] = selectorData;
		})
		setstyleObj(styleObjX)
	}, [next]);

	useEffect(() => {
		var postDataX = { ...postData };
		postDataX.post_content.prevIcon = prevIcon;
		onChange(postDataX)

		var styleObjX = { ...styleObj }
		var prevIconCss = generateElementCss(prevIcon, prevIconSelector)
		Object.entries(prevIconCss).map(selectors => {
			var selector = selectors[0]
			var selectorData = selectors[1]
			styleObjX[selector] = selectorData;
		})
		setstyleObj(styleObjX)
	}, [prevIcon]);

	useEffect(() => {
		var postDataX = { ...postData };
		postDataX.post_content.nextIcon = nextIcon;
		onChange(postDataX)

		var styleObjX = { ...styleObj }
		var nextIconCss = generateElementCss(nextIcon, nextIconSelector)
		Object.entries(nextIconCss).map(selectors => {
			var selector = selectors[0]
			var selectorData = selectors[1]
			styleObjX[selector] = selectorData;
		})
		setstyleObj(styleObjX)
	}, [nextIcon]);

	useEffect(() => {
		var postDataX = { ...postData };
		postDataX.post_content.paginationWrap = paginationWrap;
		onChange(postDataX)

		var styleObjX = { ...styleObj }
		var paginationWrapCss = generateElementCss(paginationWrap, paginationWrapSelector)
		Object.entries(paginationWrapCss).map(selectors => {
			var selector = selectors[0]
			var selectorData = selectors[1]
			styleObjX[selector] = selectorData;
		})
		setstyleObj(styleObjX)
	}, [paginationWrap]);

	useEffect(() => {
		var postDataX = { ...postData };
		postDataX.post_content.pagination = pagination;
		onChange(postDataX)

		var styleObjX = { ...styleObj }
		var paginationCss = generateElementCss(pagination, paginationSelector)
		Object.entries(paginationCss).map(selectors => {
			var selector = selectors[0]
			var selectorData = selectors[1]
			styleObjX[selector] = selectorData;
		})
		setstyleObj(styleObjX)
	}, [pagination]);
	useEffect(() => {
		var postDataX = { ...postData };
		postDataX.post_content.paginationActive = paginationActive;
		onChange(postDataX)

		var styleObjX = { ...styleObj }
		var paginationActiveCss = generateElementCss(paginationActive, paginationActiveSelector)
		Object.entries(paginationActiveCss).map(selectors => {
			var selector = selectors[0]
			var selectorData = selectors[1]
			styleObjX[selector] = selectorData;
		})
		setstyleObj(styleObjX)
	}, [paginationActive]);










	var RemoveSliderArg = function ({ index }) {
		return (
			<span
				className="cursor-pointer hover:bg-red-500 hover:text-white "
				onClick={(ev) => {
					var sliderOptionsX = { ...accOptions };
					delete sliderOptionsX[index];
					setsliderOptions(sliderOptionsX);
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
				// 	itemsWrapSelector // Replace this selector if needed
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

	var sliderOptionsArgs = {
		autoplay: { label: "Auto play", value: 1 },
		interval: { label: "Interval", value: "500" },
		pauseOnHover: { label: "Pause On Hover", value: 1 },
		pauseOnFocus: { label: "Pause On Focus", value: 1 },
		lazyLoad: { label: "Lazy Load", value: 1 },
		preloadPages: { label: "Preload Pages", value: 1 },
		keyboard: { label: "Keyboard", value: 1 },
		wheel: { label: "Wheel", value: 1 },
		releaseWheel: { label: "Release Wheel", value: 1 },
		direction: { label: "Direction", value: "ltr" },
		cover: { label: "Cover", value: 0 },
		rewind: { label: "Rewind", value: 0 },
		speed: { label: "Speed", value: 400 },
		rewindSpeed: { label: "Rewind Speed", value: 400 },
		rewindByDrag: { label: "Rewind By Drag", value: 0 },
		type: { label: "Slider Type", value: "slide" },
		width: { label: "Width", value: "" },
		height: { label: "Height", value: "" },
		fixedWidth: { label: "Fixed Width", value: "" },
		fixedHeight: { label: "Fixed Height", value: "" },
		heightRatio: { label: "Height Ratio", value: "" },
		autoWidth: { label: "Auto Width", value: 0 },
		autoHeight: { label: "Auto Height", value: 0 },
		start: { label: "Start", value: 0 },
		perPage: { label: "Per Page", value: 3 },
		perMove: { label: "Per Move", value: 3 },
		focus: { label: "Focus", value: "center" },
		gap: { label: "Gap", value: "1em", unit: "em", number: "1" },
		padding: { label: "Padding", value: "" },
		arrows: { label: "Arrows", value: 1 },
		pagination: { label: "Pagination", value: 1 },
		//easing: { label: 'Easing', value: 'cubic-bezier(0.25, 1, 0.5, 1)' },
		paginationKeyboard: { label: "Pagination Keyboard", value: 1 },
		paginationDirection: {
			label: "Pagination Direction",
			value: "paginationDirectltrion",
		},
		drag: { label: "Drag", value: 1 },
		noDrag: { label: "No Drag", value: "input, textarea, .rich-text" },
		snap: { label: "Snap", value: 1 },
		mediaQuery: { label: "Media Query", value: "max" },
	};


	var sliderForArgs = {
		Products: { label: "Products", value: "products" },
		terms: { label: "Terms", value: "terms" },
		dokanShops: { label: "Dokan Shops", value: "dokanShops" },
	}

	return (
		<div className="">
			{props.postData.post_content == null && (
				<div className="p-3 text-center">Please select WCPS first</div>
			)}
			<div className="fixed top-20 right-0 w-[400px] z-50">			</div>

			<code className="break-all	p-4 block">
				{JSON.stringify(styleObj)}
			</code>


			{props.postData.post_content != null && (
				<>

					<div className="my-4 p-3">
						<PGDropdown
							position="bottom right"
							variant="secondary"
							buttonTitle={"Slider For"}
							options={sliderForArgs}
							onChange={(option, index) => {


								var sliderOptionsX = { ...accOptions };
								sliderOptionsX.sliderFor = option.value;
								setsliderOptions(sliderOptionsX);
							}}
							values=""></PGDropdown>
					</div>

					<PanelBody
						className="font-medium text-slate-900 "
						title="Slider Settings"
						initialOpen={false}>
						<PGtab name="normal">
							<PanelRow className="my-3">
								<label>{__("Slider Options", "post-grid")}</label>
								<PGDropdown
									position="bottom right"
									variant="secondary"
									buttonTitle={"Choose"}
									options={sliderOptionsArgs}
									onChange={(option, index) => {
										var sliderOptionsX = { ...accOptions };
										sliderOptionsX[index] = option.value;
										setsliderOptions(sliderOptionsX);
									}}
									values=""></PGDropdown>
							</PanelRow>
							<PanelRow className="justify-start gap-4 mb-3">

							</PanelRow>
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
														setsliderOptions(sliderOptionsX);
													}}
												/>
											</PanelRow>
										)}

									</div>
								);
							})}
						</PGtab>
						<div>

						</div>
					</PanelBody>
					<PanelBody
						className="font-medium text-slate-900 "
						title="Query Items"
						initialOpen={false}>
						<div>
							<PGtabs
								activeTab="presets"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => { }}
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
					</PanelBody>

					<PanelBody
						className="font-medium text-slate-900 "
						title="Layouts"
						initialOpen={false}>
						<div>
							<PGtabs
								activeTab="presets"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => { }}
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
					</PanelBody>

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
								{/* <PGStyles
									obj={wrapper}
									onChange={onChangeStyleWrapper}
									onAdd={onAddStyleWrapper}
									onRemove={onRemoveStyleWrapper}
									// onBulkAdd={onBulkAddText}
									onReset={onResetWrapper}
								/> */}
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
						title="Loop Wrap"
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
									obj={itemsWrap}
									onChange={(sudoScource, newVal, attr) =>
										onChangeStyle(
											sudoScource,
											newVal,
											attr,
											itemsWrap,
											setitemsWrap
										)
									}
									onAdd={(sudoScource, key) =>
										onAddStyle(sudoScource, key, itemsWrap, setitemsWrap)
									}
									onRemove={(sudoScource, key) =>
										onRemoveStyle(sudoScource, key, itemsWrap, setitemsWrap)
									}
									onReset={(sudoSources) =>
										onResetStyle(sudoSources, itemsWrap, setitemsWrap)
									}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>
					<PanelBody
						className="font-medium text-slate-900 "
						title="Item"
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
									obj={item}
									onChange={(sudoScource, newVal, attr) =>
										onChangeStyle(sudoScource, newVal, attr, item, setitem)
									}
									onAdd={(sudoScource, key) =>
										onAddStyle(sudoScource, key, item, setitem)
									}
									onRemove={(sudoScource, key) =>
										onRemoveStyle(sudoScource, key, item, setitem)
									}
									onReset={(sudoSources) =>
										onResetStyle(sudoSources, item, setitem)
									}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>
					<PanelBody
						className="font-medium text-slate-900 "
						title="Navigation"
						initialOpen={false}>
						<div>
							<PGtabs
								activeTab="presets"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => { }}
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
								<PGtab name="custom">
									<PanelBody
										className="font-medium text-slate-900 "
										title="Navs Wrap"
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
													obj={navsWrap}
													onChange={(sudoScource, newVal, attr) =>
														onChangeStyle(sudoScource, newVal, attr, navsWrap, setnavsWrap)
													}
													onAdd={(sudoScource, key) =>
														onAddStyle(sudoScource, key, navsWrap, setnavsWrap)
													}
													onRemove={(sudoScource, key) =>
														onRemoveStyle(sudoScource, key, navsWrap, setnavsWrap)
													}
													onReset={(sudoSources) =>
														onResetStyle(sudoSources, navsWrap, setnavsWrap)
													}
												/>
											</PGtab>
										</PGtabs>
									</PanelBody>
									<PanelBody
										className="font-medium text-slate-900 "
										title="Prev Button"
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
													obj={prev}
													onChange={(sudoScource, newVal, attr) =>
														onChangeStyle(sudoScource, newVal, attr, prev, setprev)
													}
													onAdd={(sudoScource, key) =>
														onAddStyle(sudoScource, key, prev, setprev)
													}
													onRemove={(sudoScource, key) =>
														onRemoveStyle(sudoScource, key, prev, setprev)
													}
													onReset={(sudoSources) =>
														onResetStyle(sudoSources, prev, setprev)
													}
												/>
											</PGtab>
										</PGtabs>
									</PanelBody>
									<PanelBody
										className="font-medium text-slate-900 "
										title="Next Button"
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
													obj={next}
													onChange={(sudoScource, newVal, attr) =>
														onChangeStyle(sudoScource, newVal, attr, next, setnext)
													}
													onAdd={(sudoScource, key) =>
														onAddStyle(sudoScource, key, next, setnext)
													}
													onRemove={(sudoScource, key) =>
														onRemoveStyle(sudoScource, key, next, setnext)
													}
													onReset={(sudoSources) =>
														onResetStyle(sudoSources, next, setnext)
													}
												/>
											</PGtab>
										</PGtabs>
									</PanelBody>
									<PanelBody
										className="font-medium text-slate-900 "
										title="Prev Icon"
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
													obj={prevIcon}
													onChange={(sudoScource, newVal, attr) =>
														onChangeStyle(
															sudoScource,
															newVal,
															attr,
															prevIcon,
															setprevIcon
														)
													}
													onAdd={(sudoScource, key) =>
														onAddStyle(sudoScource, key, prevIcon, setprevIcon)
													}
													onRemove={(sudoScource, key) =>
														onRemoveStyle(sudoScource, key, prevIcon, setprevIcon)
													}
													onReset={(sudoSources) =>
														onResetStyle(sudoSources, prevIcon, setprevIcon)
													}
												/>
											</PGtab>
										</PGtabs>
									</PanelBody>
									<PanelBody
										className="font-medium text-slate-900 "
										title="Next Icon"
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
													obj={nextIcon}
													onChange={(sudoScource, newVal, attr) =>
														onChangeStyle(
															sudoScource,
															newVal,
															attr,
															nextIcon,
															setnextIcon
														)
													}
													onAdd={(sudoScource, key) =>
														onAddStyle(sudoScource, key, nextIcon, setnextIcon)
													}
													onRemove={(sudoScource, key) =>
														onRemoveStyle(sudoScource, key, nextIcon, setnextIcon)
													}
													onReset={(sudoSources) =>
														onResetStyle(sudoSources, nextIcon, setnextIcon)
													}
												/>
											</PGtab>
										</PGtabs>
									</PanelBody>

								</PGtab>
							</PGtabs>
						</div>
					</PanelBody>
					<PanelBody
						className="font-medium text-slate-900 "
						title="Pagination/Dots"
						initialOpen={false}>
						<div>
							<PGtabs
								activeTab="presets"
								orientation="horizontal"
								activeClass="active-tab"
								onSelect={(tabName) => { }}
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
								<PGtab name="custom">
									<PanelBody
										className="font-medium text-slate-900 "
										title="Pagination Wrap"
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
													obj={paginationWrap}
													onChange={(sudoScource, newVal, attr) =>
														onChangeStyle(
															sudoScource,
															newVal,
															attr,
															paginationWrap,
															setpaginationWrap
														)
													}
													onAdd={(sudoScource, key) =>
														onAddStyle(
															sudoScource,
															key,
															paginationWrap,
															setpaginationWrap
														)
													}
													onRemove={(sudoScource, key) =>
														onRemoveStyle(
															sudoScource,
															key,
															paginationWrap,
															setpaginationWrap
														)
													}
													onReset={(sudoSources) =>
														onResetStyle(sudoSources, paginationWrap, setpaginationWrap)
													}
												/>
											</PGtab>
										</PGtabs>
									</PanelBody>
									<PanelBody
										className="font-medium text-slate-900 "
										title="Pagination Active"
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
													obj={paginationActive}
													onChange={(sudoScource, newVal, attr) =>
														onChangeStyle(
															sudoScource,
															newVal,
															attr,
															paginationActive,
															setpaginationActive
														)
													}
													onAdd={(sudoScource, key) =>
														onAddStyle(sudoScource, key, paginationActive, setpaginationActive)
													}
													onRemove={(sudoScource, key) =>
														onRemoveStyle(sudoScource, key, paginationActive, setpaginationActive)
													}
													onReset={(sudoSources) =>
														onResetStyle(sudoSources, paginationActive, setpaginationActive)
													}
												/>
											</PGtab>
										</PGtabs>
									</PanelBody>
									<PanelBody
										className="font-medium text-slate-900 "
										title="Pagination"
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
													obj={pagination}
													onChange={(sudoScource, newVal, attr) =>
														onChangeStyle(
															sudoScource,
															newVal,
															attr,
															pagination,
															setpagination
														)
													}
													onAdd={(sudoScource, key) =>
														onAddStyle(sudoScource, key, pagination, setpagination)
													}
													onRemove={(sudoScource, key) =>
														onRemoveStyle(sudoScource, key, pagination, setpagination)
													}
													onReset={(sudoSources) =>
														onResetStyle(sudoSources, pagination, setpagination)
													}
												/>
											</PGtab>
										</PGtabs>
									</PanelBody>
								</PGtab>
							</PGtabs>
						</div>
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
