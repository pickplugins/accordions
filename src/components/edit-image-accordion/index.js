const { Component, RawHTML, useState, useEffect } = wp.element;
import apiFetch from "@wordpress/api-fetch";
import { MediaUpload, RichText } from "@wordpress/block-editor";
import {
	Icon,
	__experimentalInputControl as InputControl,
	PanelBody,
	PanelRow,
	SelectControl,
} from "@wordpress/components";
import { store as coreStore } from "@wordpress/core-data";
import { useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import {
	addCard,
	brush,
	close,
	copy,
	gallery,
	help,
	menu,
	page,
	settings,
} from "@wordpress/icons";
import { ReactSortable } from "react-sortablejs";
import breakPoints from "../../breakpoints";
import PGDropdown from "../dropdown";
import PGinputSelect from "../input-select";
import PGinputText from "../input-text";
import WPEditor from "../input-wp-editor";

import { popupEntranceAnimateBasic } from "../../inAnimation";
import { popupCloseAnimateBasic } from "../../outAnimation";
import InputToggle from "../input-toggle";
import PGStyles from "../styles";
import PGtab from "../tab";
import PGtabs from "../tabs";
var myStore = wp.data.select("postgrid-shop");

function Html(props) {
	if (!props.warn) {
		return null;
	}

	var onChange = props.onChange;
	var addNotifications = props.addNotifications;
	var setHelp = props.setHelp;

	var postData = props.postData;

	if (postData.post_content == null) {
		return (
			<div className="p-3 my-5 bg-orange-400">
				Please choose an accordion first.
			</div>
		);
	}

	var breakPointX = "Desktop";

	var [accordionData, setaccordionData] = useState(postData.post_content); // Using the hook.

	var [globalOptions, setglobalOptions] = useState(accordionData.globalOptions); // Using the hook.

	var [itemQueryArgs, setitemQueryArgs] = useState(accordionData.itemQueryArgs); // Using the hook.

	var [wrapper, setwrapper] = useState(accordionData.wrapper); // Using the hook.
	var [items, setitems] = useState(accordionData.items); // Using the hook.
	var [item, setitem] = useState(accordionData.item);
	var [itemActive, setitemActive] = useState(accordionData.itemActive);
	var [itemsWrap, setitemsWrap] = useState(accordionData.itemsWrap);
	var [overlay, setoverlay] = useState(accordionData.overlay);
	var [content, setcontent] = useState(accordionData.content);
	var [title, settitle] = useState(accordionData.title);
	var [image, setimage] = useState(accordionData.image);
	// var [accOptions, setaccOptions] = useState(accordionData.accOptions);
	// var [header, setheader] = useState(accordionData.header);
	// var [headerActive, setheaderActive] = useState(accordionData.headerActive);
	// var [headerLabel, setheaderLabel] = useState(accordionData.headerLabel);
	// var [labelCounter, setlabelCounter] = useState(accordionData.labelCounter);
	// var [labelIcon, setlabelIcon] = useState(accordionData.labelIcon);
	// var [icon, seticon] = useState(accordionData.icon);
	// var [iconToggle, seticonToggle] = useState(accordionData.iconToggle);
	// var [expandCollapseAll, setexpandCollapseAll] = useState(
	// 	accordionData.expandCollapseAll
	// );
	// var [topWrap, settopWrap] = useState(accordionData.topWrap);
	// var [navsWrap, setnavsWrap] = useState(accordionData?.navsWrap);
	// var [navItem, setnavItem] = useState(accordionData?.navItem);
	// var [activeNavItem, setactiveNavItem] = useState(
	// 	accordionData?.activeNavItem
	// );
	// var [navLabel, setnavLabel] = useState(accordionData?.navLabel);
	// var [panelWrap, setpanelWrap] = useState(accordionData?.panelWrap);
	// var [panelWrapActive, setpanelWrapActive] = useState(accordionData?.panelWrapActive);

	// var [searchInput, setsearchInput] = useState(accordionData.searchInput);

	var [styleObj, setstyleObj] = useState({}); // Using the hook.
	const [taxonomiesObjects, setTaxonomiesObjects] = useState([]);
	var [customerData, setcustomerData] = useState(props.customerData);

	var [isProFeature, setisProFeature] = useState(true);
	var [editActive, seteditActive] = useState(9999);

	// const gapValue = accOptions?.gap || "0px";
	// const [number, setNumber] = useState(parseInt(gapValue));
	// const [unit, setUnit] = useState(gapValue.replace(number, ""));
	const [AIautoUpdate, setAIautoUpdate] = useState(false);
	var [AIWriter, setAIWriter] = useState(false); // Using the hook.
	var formattedPrompt =
		"Respond only with question answer as json array and no other text. Do not include any explanations, introductions, or concluding remarks.";

	var breakPointList = [{ label: "Select..", icon: "", value: "" }];
	for (var x in breakPoints) {
		var breakPointItem = breakPoints[x];
		breakPointList.push({
			label: breakPointItem.name,
			icon: breakPointItem.icon,
			value: breakPointItem.id,
		});
	}

	var postTypes = [];
	const postTypesData = useSelect(
		(select) => select(coreStore).getPostTypes({ per_page: -1 }),
		[]
	);
	postTypesData !== null &&
		postTypesData.map((x) => {
			postTypes.push({ value: x.slug, label: x.name });
		});

	useEffect(() => {
		apiFetch({
			path: "/accordions/v2/post_type_objects",
			method: "POST",
			data: { postTypes: [] },
		}).then((res) => {
			var taxonomies = [];
			res.map((item) => {
				taxonomies.push({ label: item.label, value: item.id });
			});
			setTaxonomiesObjects(taxonomies);
		});
	}, []);

	useEffect(() => {
		if (customerData.isPro) {
			setisProFeature(false);
		}
	}, [props.customerData]);

	useEffect(() => {
		onChange(accordionData);
	}, [accordionData]);

	useEffect(() => {
		var accordionDataX = { ...accordionData };
		accordionDataX.globalOptions = globalOptions;
		setaccordionData(accordionDataX);
	}, [globalOptions]);

	useEffect(() => {
		var accordionDataX = { ...accordionData };
		accordionDataX.items = items;
		setaccordionData(accordionDataX);
	}, [items]);

	useEffect(() => {
		var accordionDataX = { ...accordionData };
		accordionDataX.wrapper = wrapper;
		setaccordionData(accordionDataX);
	}, [wrapper]);

	useEffect(() => {
		var accordionDataX = { ...accordionData };
		accordionDataX.content = content;
		setaccordionData(accordionDataX);
	}, [content]);
	useEffect(() => {
		var accordionDataX = { ...accordionData };
		accordionDataX.item = item;
		setaccordionData(accordionDataX);
	}, [item]);
	useEffect(() => {
		var accordionDataX = { ...accordionData };
		accordionDataX.overlay = overlay;
		setaccordionData(accordionDataX);
	}, [overlay]);
	useEffect(() => {
		var accordionDataX = { ...accordionData };
		accordionDataX.itemActive = itemActive;
		setaccordionData(accordionDataX);
	}, [itemActive]);



	useEffect(() => {
		var accordionDataX = { ...accordionData };
		accordionDataX.itemsWrap = itemsWrap;
		setaccordionData(accordionDataX);
	}, [itemsWrap]);


	useEffect(() => {
		var accordionDataX = { ...accordionData };
		accordionDataX.title = title;
		setaccordionData(accordionDataX);
	}, [title]);
	useEffect(() => {
		var accordionDataX = { ...accordionData };
		accordionDataX.image = image;
		setaccordionData(accordionDataX);
	}, [image]);

	// useEffect(() => {
	// 	var accordionDataX = { ...accordionData };
	// 	accordionDataX.accOptions = accOptions;
	// 	setaccordionData(accordionDataX);
	// }, [accOptions]);

	// useEffect(() => {
	// 	var accordionDataX = { ...accordionData };
	// 	accordionDataX.navsWrap = navsWrap;
	// 	setaccordionData(accordionDataX);
	// }, [navsWrap]);

	// useEffect(() => {
	// 	var accordionDataX = { ...accordionData };
	// 	accordionDataX.navItem = navItem;
	// 	setaccordionData(accordionDataX);
	// }, [navItem]);

	// useEffect(() => {
	// 	var accordionDataX = { ...accordionData };
	// 	accordionDataX.activeNavItem = activeNavItem;
	// 	setaccordionData(accordionDataX);
	// }, [activeNavItem]);

	// useEffect(() => {
	// 	var accordionDataX = { ...accordionData };
	// 	accordionDataX.navLabel = navLabel;
	// 	setaccordionData(accordionDataX);
	// }, [navLabel]);

	// useEffect(() => {
	// 	var accordionDataX = { ...accordionData };
	// 	accordionDataX.panelWrap = panelWrap;
	// 	setaccordionData(accordionDataX);
	// }, [panelWrap]);

	// useEffect(() => {
	// 	var accordionDataX = { ...accordionData };
	// 	accordionDataX.header = header;
	// 	setaccordionData(accordionDataX);
	// }, [header]);

	// useEffect(() => {
	// 	var accordionDataX = { ...accordionData };
	// 	accordionDataX.headerActive = headerActive;
	// 	setaccordionData(accordionDataX);
	// }, [headerActive]);

	// useEffect(() => {
	// 	var accordionDataX = { ...accordionData };
	// 	accordionDataX.headerLabel = headerLabel;
	// 	setaccordionData(accordionDataX);
	// }, [headerLabel]);

	// useEffect(() => {
	// 	var accordionDataX = { ...accordionData };
	// 	accordionDataX.labelCounter = labelCounter;
	// 	setaccordionData(accordionDataX);
	// }, [labelCounter]);

	// useEffect(() => {
	// 	var accordionDataX = { ...accordionData };
	// 	accordionDataX.labelIcon = labelIcon;
	// 	setaccordionData(accordionDataX);
	// }, [labelIcon]);

	// useEffect(() => {
	// 	var accordionDataX = { ...accordionData };
	// 	accordionDataX.icon = icon;
	// 	setaccordionData(accordionDataX);
	// }, [icon]);

	// useEffect(() => {
	// 	var accordionDataX = { ...accordionData };
	// 	accordionDataX.iconToggle = iconToggle;
	// 	setaccordionData(accordionDataX);
	// }, [iconToggle]);

	// useEffect(() => {
	// 	var accordionDataX = { ...accordionData };
	// 	accordionDataX.expandCollapseAll = expandCollapseAll;
	// 	setaccordionData(accordionDataX);
	// }, [expandCollapseAll]);

	// useEffect(() => {
	// 	var accordionDataX = { ...accordionData };
	// 	accordionDataX.topWrap = topWrap;
	// 	setaccordionData(accordionDataX);
	// }, [topWrap]);

	// useEffect(() => {
	// 	var accordionDataX = { ...accordionData };
	// 	accordionDataX.searchInput = searchInput;
	// 	setaccordionData(accordionDataX);
	// }, [searchInput]);

	// var RemoveSliderArg = function ({ index }) {
	// 	return (
	// 		<span
	// 			className="cursor-pointer hover:bg-red-500 hover:text-white "
	// 			onClick={(ev) => {
	// 				var sliderOptionsX = { ...accOptions };
	// 				delete sliderOptionsX[index];
	// 				setaccOptions(sliderOptionsX);
	// 			}}>
	// 			<Icon icon={close} />
	// 		</span>
	// 	);
	// };

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

	function onBulkAddStyle(sudoSource, cssObj, propertyType, setProperty) {
		let obj = { ...propertyType };
		obj[sudoSource] = cssObj;
		setProperty(obj);
	}

	var accOptionsArgs = {
		autoplay: { label: "Auto play", value: 1 },
	};
	var postQueryArgs = {
		postType: {
			value: ["post"],

			id: "postType",
			label: "Post types",
			description: "Select Post Types to Query",
		},
		s: {
			value: "",

			id: "s",
			label: "Keyword",
			description: "Search keyword, ex: hello",
		},
		postStatus: {
			value: [],

			id: "postStatus",
			label: "Post status",
			description: "Query post by post status",
		},
		order: {
			value: "",

			id: "order",
			label: "Order",
			description: "Post query order",
		},
		orderby: {
			value: [],

			id: "orderby",
			label: "Orderby",
			description: "Post query orderby",
		},
		metaKey: {
			value: "",

			id: "metaKey",
			label: "Meta fields key",
			description: "Post query by meta fields key",
		},
		metaValue: {
			value: "",

			id: "metaValue",
			label: "Meta Value",
			description: "Post query by custom field value",
		},
		metaValueNum: {
			value: "",

			id: "metaValueNum",
			label: "Meta Value Num",
			description: "Post query by custom field value for number types",
		},
		metaCompare: {
			value: "",

			id: "metaCompare",
			label: "Meta Compare",
			description: "Meta query compare",
		},
	};
	const updatePostQueryArgs = (newVal, index) => {
		var itemQueryArgsX = [...itemQueryArgs];
		itemQueryArgsX[index].value = newVal;
		setitemQueryArgs(itemQueryArgsX);
	};
	var termQueryArgs = {
		taxonomy: {
			value: "category",

			id: "taxonomy",
			label: __("Taxonomy", "accordions"),
			description: "Select Taxonomy to Query",
			longDescription:
				"Taxonomy name, or array of taxonomy names, to which results should be limited.",
		},
		orderby: {
			value: "name",

			id: "orderby",
			label: "Order By",
			description: "Search keyword, ex: hello",
		},
		order: {
			value: "ASC",

			id: "order",
			label: "Order",
			description: "Whether to order terms in ascending or descending order.",
		},
		hide_empty: {
			value: true,

			id: "hide_empty",
			label: "Hide Empty",
			description: "Accepts true or false value.",
			longDescription:
				"Whether to hide terms not assigned to any posts. Accepts 1|true or 0|false.",
		},
		number: {
			value: false,

			id: "number",
			label: "Number",
			description: "Accepts 0 (all) or any positive number.",
			longDescription:
				"Maximum number of terms to return. Accepts ''|0 (all) or any positive number. Default ''|0 (all). Note that $number may not return accurate results when coupled with $object_ids.",
		},
		include: {
			value: "category",

			id: "include",
			//isPro: true,
			label: "Include",
			description: "Comma-separated string of term IDs to include.",
			longDescription:
				"Array or comma/space-separated string of term IDs to include. Default empty array.",
			placeholder: "Comma-separated string of term IDs to include.",
		},
		exclude: {
			value: "",

			id: "exclude",
			//isPro: true,
			label: "Exclude",
			description: "Comma-separated string of term IDs to exclude.",
			longDescription:
				"Array or comma/space-separated string of term IDs to exclude. If $include is non-empty, $exclude is ignored. Default empty array.",
			placeholder: "Comma-separated string of term IDs to exclude.",
		},
		child_of: {
			value: "",

			id: "child_of",
			//isPro: true,
			label: "Child of",
			description: "Term ID to retrieve child terms of.",
			longDescription:
				"Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0.",
		},
		parent: {
			value: "",

			id: "parent",
			//isPro: true,
			label: "Parent",
			description:
				"Add {ID} to add Parent term ID to retrieve direct-child terms of.",
			longDescription: "Parent term ID to retrieve direct-child terms of.",
		},
		meta_key: {
			value: "",

			id: "meta_key",
			//isPro: true,
			label: "Meta key",
			description: "Comma-separated keys to return term(s) for.",
			longDescription: "Meta key or keys to filter by.",
		},
		meta_value: {
			value: "",

			id: "meta_value",
			//isPro: true,
			label: "Meta value",
			description: "Comma-separated keys to return term(s) for.",
			longDescription: "Meta value or values to filter by.",
		},
	};

	const updateTermQueryArgs = (newVal, index) => {
		var itemQueryArgsX = [...itemQueryArgs];
		itemQueryArgsX[index].value = newVal;
		setitemQueryArgs(itemQueryArgsX);
	};

	var viewTypeArgs = {
		accordion: { label: "Accordion", value: "accordion" },
		tabs: { label: "Tabs", value: "tabs" },
	};
	var itemSources = {
		manual: { label: "Manual", value: "manual" },
		// easyAccordion: {
		// 	label: "Easy Accordion - FAQ Group",
		// 	value: "easyAccordion",
		// },
		// posts: {
		// 	label: "Posts",
		// 	value: "posts",
		// 	isPro: customerData.isPro ? false : true,
		// },
		// terms: {
		// 	label: "Terms",
		// 	value: "terms",
		// 	isPro: customerData.isPro ? false : true,
		// },
	};

	function generate3Digit() {
		return Math.floor(100 + Math.random() * 900);
	}



	function escapeHTML(str) {
		const map = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#039;'
		};
		return str.replace(/[&<>"']/g, function (match) {
			return map[match];
		});
	}


	function unescapeHTML(str) {
		const map = {
			'&amp;': '&',
			'&lt;': '<',
			'&gt;': '>',
			'&quot;': '"',
			'&#039;': "'"
		};
		return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function (match) {
			return map[match];
		});
	}







	return (
		<div className="">
			<div
				className="hidden"
				onClick={() => {
					var str = `{
				"wrapper":${JSON.stringify(wrapper)}
				"header":${JSON.stringify(header)},
				"navItem":${JSON.stringify(navItem)},
				"activeNavItem":${JSON.stringify(activeNavItem)},
				"labelCounter":${JSON.stringify(labelCounter)},
				"labelIcon":${JSON.stringify(labelIcon)},
				"icon":${JSON.stringify(icon)},
				"iconToggle":${JSON.stringify(iconToggle)},
				"navLabel":${JSON.stringify(navLabel)},
				"panelWrap":${JSON.stringify(panelWrap)},
				"topWrap":${JSON.stringify(topWrap)},
				}`;

					copyData(str);

					addNotifications({
						title: "Copied to clipboard!",
						content:
							"Use the shortcode in page or post conent where you want to display.",
						type: "success",
					});
				}}>
				<div className="p-3">
					<div>{`{`}</div>
					<div>{`"wrapper":${JSON.stringify(wrapper)}`},</div>
					{/* <div>{`"navsWrap":${JSON.stringify(navsWrap)}`},</div> */}
					{/* <div>{`"navItem":${JSON.stringify(navItem)}`},</div> */}
					{/* <div>{`"activeNavItem":${JSON.stringify(activeNavItem)}`},</div> */}
					{/* <div>{`"labelCounter":${JSON.stringify(labelCounter)}`},</div> */}
					{/* <div>{`"labelIcon":${JSON.stringify(labelIcon)}`},</div> */}
					{/* <div>{`"icon":${JSON.stringify(icon)}`},</div> */}
					{/* <div>{`"iconToggle":${JSON.stringify(iconToggle)}`},</div> */}
					{/* <div>{`"navLabel":${JSON.stringify(navLabel)}`},</div> */}
					{/* <div>
						{`"panelWrap":${JSON.stringify(panelWrap)}`},
					</div> */}
					{/* <div>{`"topWrap":${JSON.stringify(topWrap)}`},</div> */}
					<div>{`}`}</div>
				</div>
			</div>

			{props.postData.post_content != null && (
				<>
					{/* <div className="my-4 p-3">
						<PanelRow>
							<label htmlFor="">View Type?</label>
							<PGDropdown
								position="bottom right"
								variant="secondary"
								buttonTitle={viewTypeArgs[globalOptions?.viewType]?.label}
								options={viewTypeArgs}
								onChange={(option, index) => {
									var globalOptionsX = { ...globalOptions };
									globalOptionsX.viewType = option.value;
									setglobalOptions(globalOptionsX);
								}}
								values=""></PGDropdown>
						</PanelRow>
					</div> */}
					<PanelBody
						className="font-medium text-slate-900 "
						title="Items"
						initialOpen={true}>
						<div className="my-4 flex items-center justify-between ">
							<div className=" flex items-center  gap-2">
								<PGDropdown
									position="bottom right"
									variant="secondary"
									buttonTitle={
										globalOptions?.itemSource == undefined
											? "Item Source"
											: itemSources[globalOptions?.itemSource]?.label
									}
									options={itemSources}
									onChange={(option, index) => {
										var globalOptionsX = { ...globalOptions };
										globalOptionsX.itemSource = option.value;
										setglobalOptions(globalOptionsX);
									}}
									values=""></PGDropdown>
							</div>

							<div className="flex items-center  gap-2">
								{globalOptions?.itemSource == "posts" && (
									<>
										<span
											className="cursor-pointer"
											title="Click to know more"
											onClick={() => {
												setHelp({
													id: "addPostQuery",
													enable: true,
												});
											}}>
											<Icon icon={help} />
										</span>
										<PGDropdown
											position="bottom right"
											variant="secondary"
											buttonTitle={"Add Query"}
											options={postQueryArgs}
											onChange={(option, index) => {
												var itemQueryArgsX = { ...itemQueryArgs };
												itemQueryArgsX[option.id] = {
													id: option.id,
													value: option.value,
												};
												setitemQueryArgs(itemQueryArgsX);
											}}
											values=""></PGDropdown>
									</>
								)}
								{globalOptions?.itemSource == "terms" && (
									<>
										<span
											className="cursor-pointer"
											title="Click to know more"
											onClick={() => {
												setHelp({
													id: "addTermQuery",
													enable: true,
												});
											}}>
											<Icon icon={help} />
										</span>
										<PGDropdown
											position="bottom right"
											variant="secondary"
											buttonTitle={"Add Query"}
											options={termQueryArgs}
											onChange={(option, index) => {
												var itemQueryArgsX = { ...itemQueryArgs };
												itemQueryArgsX[option.id] = {
													id: option.id,
													value: option.value,
												};
												setitemQueryArgs(itemQueryArgsX);
											}}
											values=""></PGDropdown>
									</>
								)}
								{globalOptions?.itemSource == "easyAccordion" && (
									<>
										<span
											className="cursor-pointer"
											title="Click to know more"
											onClick={() => {
												setHelp({
													id: "addTermQuery",
													enable: true,
												});
											}}>
											<Icon icon={help} />
										</span>
										<PGDropdown
											position="bottom right"
											variant="secondary"
											buttonTitle={"Add Query"}
											options={easyAccordionQueryArgs}
											onChange={(option, index) => {
												var itemQueryArgsX = { ...itemQueryArgs };
												itemQueryArgsX[option.id] = {
													id: option.id,
													value: option.value,
												};
												setitemQueryArgs(itemQueryArgsX);
											}}
											values=""></PGDropdown>
									</>
								)}

								{globalOptions?.itemSource == "manual" && (
									<>
										<div className="flex items-center gap-1">
											<span>
												<MediaUpload
													className="bg-gray-700 hover:bg-gray-600"
													onSelect={(media) => {
														// console.log(media);

														const newItems = media
															.filter((item) => item.id !== undefined) // Filter out items with undefined id
															.map((item) => ({
																isActive: false,
																image: {
																	id: item.id,
																	url: item.url,
																	altText: item.alt || item.title || "",
																},
																link: item.link,
																title: item.title,
																content: item.description,
															}));

														// console.log(newItems);

														// Update the state by merging existing items with new ones
														setitems((prevItems) => [
															...prevItems,
															...newItems,
														]);
													}}
													onClose={() => { }}
													allowedTypes={["image"]}
													value={items.map((item) => {
														return item.id;
													})}
													multiple="add"
													render={({ open }) => (
														<div
															className="flex items-center gap-2 bg-slate-700 text-white px-2 py-2 rounded-sm cursor-pointer hover:bg-slate-600"
															onClick={open}>
															<Icon
																icon={gallery}
																className="fill-white "
																size={20}
															/>
														</div>
													)}
												/>
											</span>
											<span
												className="flex items-center gap-2 bg-slate-700 text-white px-2 py-2 rounded-sm cursor-pointer hover:bg-slate-600"
												title="Click to paste"
												onClick={async () => {
													try {
														// Read text from clipboard
														const clipboardText =
															await navigator.clipboard.readText();

														// Parse the JSON string back to an object
														const pastedItems = JSON.parse(clipboardText);

														// Here you need to handle the pasted items
														// For example, if you have a state setter:
														setitems(pastedItems);

														addNotifications({
															title: "Items Pasted",
															content: "You just pasted items, Now go to edit.",
															type: "success",
														});
													} catch (error) { }
												}}>
												<Icon icon={page} fill="#fff" size="20" />
											</span>
											<span
												className="flex items-center gap-2 bg-slate-700 text-white px-2 py-2 rounded-sm cursor-pointer hover:bg-slate-600"
												title="Click to copy"
												onClick={() => {
													try {
														const itemsString = JSON.stringify(items, null, 2);

														navigator.clipboard
															.writeText(itemsString)
															.then(() => {
																addNotifications({
																	title: "Items Copied",
																	content:
																		"You just copied items, Now go to edit.",
																	type: "success",
																});
															})
															.catch((err) => { });
													} catch (error) { }
												}}>
												<Icon icon={copy} fill="#fff" size="20" />
											</span>
										</div>
										<div
											className="flex items-center gap-2 bg-slate-700 text-white px-2 py-2 rounded-sm cursor-pointer hover:bg-slate-600"
											onClick={(ev) => {
												var itemsX = [...items];

												itemsX.push({
													image: {
														id: "",
														url: "",
														altText: "",
													},
													link: "",
													title: "",
													content: "",
												});
												setitems(itemsX);

												addNotifications({
													title: "Item Added",
													content: "You just added an item, Now go to edit.",
													type: "success",
												});
											}}>
											<Icon icon={addCard} fill="#fff" size="20" />
										</div>
									</>
								)}
							</div>
						</div>
						{globalOptions?.itemSource == "posts" && (
							<div>
								{Object.entries(itemQueryArgs)?.map((prams) => {
									var index = prams[0];
									var item = prams[1];

									return (
										<div key={index} className="my-4 flex gap-2 items-center">
											<span
												className="cursor-pointer px-1 bg-red-500 hover:bg-red-700 hover:text-white"
												onClick={() => handleDelete(item.id)}>
												<Icon fill={"#fff"} icon={close} size="20" />
											</span>
											{item.id == "postType" && (
												<div className="flex items-center justify-between flex-1">
													<label htmlFor="">Post Type</label>
													<PGinputSelect
														val={item.value}
														className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
														options={postTypes}
														multiple={true}
														onChange={(newVal) => {
															updatePostQueryArgs(newVal, item.id);
														}}
													/>
												</div>
											)}
											{item.id == "postStatus" && (
												<div
													className={
														item.id == "postStatus"
															? "flex items-center justify-between flex-1"
															: "hidden"
													}>
													<label htmlFor="">Post Status</label>
													<PGinputSelect
														val={item.value}
														className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
														options={[
															{ label: "Publish", value: "publish" },
															{ label: "Pending", value: "pending" },
															{ label: "Draft", value: "draft" },
															{ label: "Auto draft", value: "auto-draft" },
															{ label: "Future", value: "future" },
															{ label: "Private", value: "private" },
															{ label: "Inherit", value: "inherit" },
															{ label: "Trash", value: "trash" },
															{ label: "Any", value: "any" },
														]}
														multiple={true}
														onChange={(newVal) => {
															updatePostQueryArgs(newVal, item.id);
														}}
													/>
												</div>
											)}
											{item.id == "order" && (
												<div
													className={
														item.id == "order"
															? "flex items-center justify-between flex-1"
															: "hidden"
													}>
													<label htmlFor="">Order</label>
													<PGinputSelect
														label=""
														className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
														val={item.value}
														options={[
															{ label: "Ascending", value: "ASC" },
															{ label: "Descending", value: "DESC" },
														]}
														multiple={false}
														onChange={(newVal) =>
															updatePostQueryArgs(newVal, index)
														}
													/>
												</div>
											)}
											{item.id == "orderby" && (
												<div
													className={
														item.id == "orderby"
															? "flex items-center justify-between flex-1"
															: "hidden"
													}>
													<label htmlFor="">Order By</label>
													<PGinputSelect
														val={item.value}
														className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
														options={[
															{
																label: __("None", "accordions"),
																value: "none",
															},
															{ label: "ID", value: "ID" },
															{ label: "Author", value: "author" },
															{ label: "Title", value: "title" },
															{ label: "Name", value: "name" },
															{ label: "Type", value: "type" },
															{ label: "Date", value: "date" },
															{ label: "Modified", value: "modified" },
															{ label: "Parent", value: "parent" },
															{ label: "Random", value: "rand" },
															{
																label: "Comment Count",
																value: "comment_count",
															},
															{ label: "Relevance", value: "relevance" },
															{ label: "Menu Order", value: "menu_order" },
															{
																label: "Meta Value(String)",
																value: "meta_value",
															},
															{
																label: "Meta Value(Number)",
																value: "meta_value_num",
															},
															{ label: "post__in", value: "post__in" },
															{
																label: "post_name__in",
																value: "post_name__in",
															},
															{
																label: "post_parent__in",
																value: "post_parent__in",
															},
														]}
														multiple={true}
														onChange={(newVal) => {
															updatePostQueryArgs(newVal, item.id);
														}}
													/>
												</div>
											)}
											{item.id == "metaKey" && (
												<div className="flex items-center justify-between flex-1">
													<label htmlFor="">Meta Key</label>
													<PGinputText
														label=""
														className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
														value={item.value}
														onChange={(newVal) => {
															updatePostQueryArgs(newVal, item.id);
														}}
													/>
												</div>
											)}
											{item.id == "metaValue" && (
												<div className="flex items-center justify-between flex-1">
													<label htmlFor="">Meta Value</label>
													<PGinputText
														label=""
														className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
														value={item.value}
														onChange={(newVal) => {
															updatePostQueryArgs(newVal, item.id);
														}}
													/>
												</div>
											)}
											{item.id == "metaValueNum" && (
												<div className="flex items-center justify-between flex-1">
													<label htmlFor="">Meta Value Number</label>
													<PGinputText
														label=""
														className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
														value={item.value}
														onChange={(newVal) => {
															updatePostQueryArgs(newVal, item.id);
														}}
													/>
												</div>
											)}
											{item.id == "s" && (
												<div className="flex items-center justify-between flex-1">
													<label htmlFor="">Keyword</label>
													<PGinputText
														label=""
														className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
														value={item.value}
														onChange={(newVal) => {
															updatePostQueryArgs(newVal, item.id);
														}}
													/>
												</div>
											)}
											{item.id == "metaCompare" && (
												<div
													className={
														item.id == "metaCompare"
															? "flex items-center justify-between flex-1"
															: "hidden"
													}>
													<label htmlFor="">Meta Compare</label>
													<PGinputSelect
														val={item.value}
														className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
														options={[
															{ label: "=", value: "=" },
															{ label: "!=", value: "!=" },
															{ label: ">", value: ">" },
															{ label: ">=", value: ">=" },
															{ label: "<", value: "<" },
															{ label: "<=", value: "<=" },
															{ label: "LIKE", value: "LIKE" },
															{ label: "NOT LIKE", value: "NOT LIKE" },
															{ label: "IN", value: "IN" },
															{ label: "NOT IN", value: "NOT IN" },
															{ label: "BETWEEN", value: "BETWEEN" },
															{ label: "NOT BETWEEN", value: "NOT BETWEEN" },
															{ label: "NOT EXISTS", value: "NOT EXISTS" },
															{ label: "REGEXP", value: "REGEXP" },
															{ label: "NOT REGEXP", value: "NOT REGEXP" },
															{ label: "RLIKE", value: "RLIKE" },
														]}
														onChange={(newVal) => {
															updatePostQueryArgs(newVal, item.id);
														}}
													/>
												</div>
											)}
										</div>
									);
								})}
							</div>
						)}
						{globalOptions?.itemSource == "terms" && (
							<div>
								{Object.entries(itemQueryArgs)?.map((prams) => {
									var index = prams[0];
									var item = prams[1];

									return (
										<div key={index} className="my-4 flex gap-2 items-center">
											<span
												className="cursor-pointer px-1 bg-red-500 hover:bg-red-700 hover:text-white"
												onClick={() => handleDelete(item.id)}>
												<Icon fill={"#fff"} icon={close} size="20" />
											</span>
											{item.id == "taxonomy" && (
												<div className="flex items-center justify-between flex-1">
													<label htmlFor="">Taxonomy</label>
													<PGinputSelect
														className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
														val={item.value}
														options={taxonomiesObjects}
														multiple={true}
														onChange={(newVal) => {
															var itemQueryArgsX = { ...itemQueryArgs };
															itemQueryArgsX[index].value = newVal;
															setitemQueryArgs(itemQueryArgsX);

															//updatePostQueryArgs(newVal, item.id);
														}}
													/>
												</div>
											)}
											{item.id == "orderby" && (
												<div
													className={
														item.id == "orderby"
															? "flex items-center justify-between flex-1"
															: "hidden"
													}>
													<label htmlFor="">Order By</label>
													<PGinputSelect
														val={item.value}
														className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
														options={[
															{
																label: __("None", "accordions"),
																value: "none",
															},
															{ label: "ID", value: "ID" },
															{ label: "Author", value: "author" },
															{ label: "Title", value: "title" },
															{ label: "Name", value: "name" },
															{ label: "Type", value: "type" },
															{ label: "Date", value: "date" },
															{ label: "Modified", value: "modified" },
															{ label: "Parent", value: "parent" },
															{ label: "Random", value: "rand" },
															{
																label: "Comment Count",
																value: "comment_count",
															},
															{ label: "Relevance", value: "relevance" },
															{ label: "Menu Order", value: "menu_order" },
															{
																label: "Meta Value(String)",
																value: "meta_value",
															},
															{
																label: "Meta Value(Number)",
																value: "meta_value_num",
															},
															{ label: "post__in", value: "post__in" },
															{
																label: "post_name__in",
																value: "post_name__in",
															},
															{
																label: "post_parent__in",
																value: "post_parent__in",
															},
														]}
														multiple={true}
														onChange={(newVal) => {
															updateTermQueryArgs(newVal, item.id);
														}}
													/>
												</div>
											)}
											{item.id == "order" && (
												<div
													className={
														item.id == "order"
															? "flex items-center justify-between flex-1"
															: "hidden"
													}>
													<label htmlFor="">Order</label>
													<PGinputSelect
														label=""
														className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
														val={item.value}
														options={[
															{ label: "Ascending", value: "ASC" },
															{ label: "Descending", value: "DESC" },
														]}
														multiple={false}
														onChange={(newVal) =>
															updatePostQueryArgs(newVal, index)
														}
													/>
												</div>
											)}
											{item.id == "number" && (
												<div
													className={
														item.id == "number"
															? "flex items-center justify-between flex-1"
															: "hidden"
													}>
													<label htmlFor="">Number</label>
													<PGinputNumber
														label=""
														className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
														value={item.value}
														onChange={(newVal) => {
															updateTermQueryArgs(newVal, item.id);
														}}
													/>
												</div>
											)}
											{item.id == "include" && (
												<div
													className={
														item.id == "include"
															? "flex items-center justify-between flex-1"
															: "hidden"
													}>
													<label htmlFor="">Include</label>
													<PGinputText
														label=""
														className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
														value={item.value}
														onChange={(newVal) => {
															updateTermQueryArgs(newVal, item.id);
														}}
													/>
												</div>
											)}
											{item.id == "exclude" && (
												<div
													className={
														item.id == "exclude"
															? "flex items-center justify-between flex-1"
															: "hidden"
													}>
													<label htmlFor="">Exclude</label>
													<PGinputText
														label=""
														className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
														value={item.value}
														onChange={(newVal) => {
															updateTermQueryArgs(newVal, item.id);
														}}
													/>
												</div>
											)}
											{item.id == "child_of" && (
												<div
													className={
														item.id == "child_of"
															? "flex items-center justify-between flex-1"
															: "hidden"
													}>
													<label htmlFor="">Child Of</label>
													<PGinputText
														label=""
														className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
														value={item.value}
														onChange={(newVal) => {
															updateTermQueryArgs(newVal, item.id);
														}}
													/>
												</div>
											)}
											{item.id == "parent" && (
												<div
													className={
														item.id == "parent"
															? "flex items-center justify-between flex-1"
															: "hidden"
													}>
													<label htmlFor="">Parent</label>
													<PGinputText
														label=""
														className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
														value={item.value}
														onChange={(newVal) => {
															updateTermQueryArgs(newVal, item.id);
														}}
													/>
												</div>
											)}
											{item.id == "meta_key" && (
												<div
													className={
														item.id == "meta_key"
															? "flex items-center justify-between flex-1"
															: "hidden"
													}>
													<label htmlFor="">Meta Key</label>
													<PGinputText
														label=""
														className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
														value={item.value}
														onChange={(newVal) => {
															updateTermQueryArgs(newVal, item.id);
														}}
													/>
												</div>
											)}
											{item.id == "meta_value" && (
												<div
													className={
														item.id == "meta_value"
															? "flex items-center justify-between flex-1"
															: "hidden"
													}>
													<label htmlFor="">Meta Value</label>
													<PGinputText
														label=""
														className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[200px]"
														value={item.value}
														onChange={(newVal) => {
															updateTermQueryArgs(newVal, item.id);
														}}
													/>
												</div>
											)}
											{item.id == "hide_empty" && (
												<div
													className={
														item.id == "hide_empty"
															? "flex items-center justify-between flex-1"
															: "hidden"
													}>
													<label htmlFor="">Hide Empty</label>
													<InputToggle
														value={item?.value}
														onChange={() => {
															const newValue = !itemQueryArgs[index].value;
															updateTermQueryArgs(newValue, index);
														}}
													/>
												</div>
											)}
										</div>
									);
								})}
							</div>
						)}

						{globalOptions?.itemSource == "easyAccordion" && (
							<div>
								{Object.entries(itemQueryArgs)?.map((prams) => {
									var index = prams[0];
									var item = prams[1];

									return (
										<div key={index} className="my-4">
											{item.id == "postId" && (
												<div className={`flex items-center justify-between`}>
													<label htmlFor="">FAQ Group ID</label>
													<InputControl
														value={item.value}
														type="number"
														onChange={(newVal) => {
															updateTermQueryArgs(newVal, item.id);
														}}
													/>
												</div>
											)}
										</div>
									);
								})}
							</div>
						)}


						{globalOptions?.itemSource == "manual" && (
							<div>
								<ReactSortable
									list={items}
									handle={".handle"}
									setList={(itemsSorted) => {
										setTimeout(() => {
											setitems(itemsSorted);
										}, 200);

										addNotifications({
											title: "Items Sorted",
											content: "You just sorted items",
											type: "success",
										});
									}}>
									{items?.map((item, index) => {
										return (
											<>
												<div className="" key={index}>
													<div
														className="bg-slate-300 flex justify-between items-center p-3 py-2 my-2 cursor-pointer hover:bg-slate-400"
														onClick={(ev) => {
															seteditActive(index == editActive ? 999 : index);
														}}>
														<div>{item?.title}</div>
														<div className="flex items-center gap-2">
															{item?.image?.url && (
																<div className="w-10 h-9 overflow-hidden">
																	<img
																		src={item?.image?.url}
																		alt=""
																		className="cursor-pointer w-full   "
																		onClick={() => {
																			open();
																		}}
																	/>
																</div>
															)}
															<span className="handle  cursor-pointer bg-gray-700 hover:bg-gray-600 hover:text-white px-1 py-1">
																<Icon size="20" fill={"#fff"} icon={menu} />
															</span>
															<span
																className="cursor-pointer bg-gray-700 hover:bg-gray-600 hover:text-white px-1 py-1"
																onClick={(ev) => {
																	ev.stopPropagation();

																	var itemsX = [...items];
																	var itemToDup = { ...itemsX[index] };
																	itemsX.splice(index + 1, 0, itemToDup);
																	setitems(itemsX);

																	addNotifications({
																		title: "Item Duplicated",
																		content: "You just duplicate an item",
																		type: "success",
																	});
																}}>
																<Icon size="20" fill={"#fff"} icon={copy} />
															</span>
															<span
																className="cursor-pointer bg-red-700 hover:bg-red-600 hover:text-white px-1 py-1"
																onClick={(ev) => {
																	ev.stopPropagation();
																	var itemsX = [...items];
																	itemsX.splice(index, 1);
																	setitems(itemsX);

																	addNotifications({
																		title: "Item Removed",
																		content: "You just removed an item",
																		type: "success",
																	});
																}}>
																<Icon size="20" fill={"#fff"} icon={close} />
															</span>
														</div>
													</div>

													{editActive == index && (
														<div className="py-2 w-full">
															<div className="mb-3">
																<RichText
																	placeholder="Write Header Text..."
																	className="bg-slate-100 p-3 "
																	tagName={"div"}
																	value={item?.title}
																	allowedFormats={[
																		"core/bold",
																		"core/italic",
																		"core/link",
																	]}
																	onChange={(content) => {
																		setitems((prevItems) => {
																			const updatedItems = [...prevItems];
																			updatedItems[index] = {
																				...updatedItems[index],
																				title: content,
																			};
																			return updatedItems;
																		});
																	}}
																/>
															</div>
															<div className="mb-3">


																<WPEditor
																	placeholder="Write Header Text..."
																	editorId={`content-${index}-${generate3Digit()}`}
																	className={`bg-slate-100 p-3 min-h-24 w-full`}
																	value={unescapeHTML(item?.content)}
																	onChange={(content) => {
																		content = content.replace(/[\r\n]+/g, "");
																		content = escapeHTML(content);

																		//var content = JSON.stringify(content);
																		console.log(content);
																		setitems((prevItems) => {
																			const updatedItems = [...prevItems];
																			updatedItems[index] = {
																				...updatedItems[index],
																				content: content,
																			};
																			return updatedItems;
																		});
																	}}
																/>
															</div>


															<div className="flex my-5 justify-between items-center ">
																<label
																	className="w-[400px]"
																	htmlFor="emailVerification">
																	{__("Select Image", "user-verification")}
																</label>
																<MediaUpload
																	onSelect={(media) => {
																		const newItem = {
																			isActive: false,
																			image: {
																				id: media.id,
																				url: media.url,
																				altText: media.alt || media.title || "",
																			},
																			link: media.link,
																			title: media.title,
																			content: media.description,
																		};
																		setitems((prevItems) => {
																			const updatedItems = [...prevItems];
																			updatedItems[index] = newItem;
																			return updatedItems;
																		});
																	}}
																	onClose={() => { }}
																	allowedTypes={["image"]}
																	value={item?.image?.id}
																	render={({ open }) => {
																		return (
																			<div className="flex flex-col items-center gap-2">
																				{item?.image?.url && (
																					<img
																						src={item?.image?.url}
																						alt=""
																						className="cursor-pointer rounded-md max-w-[160px] max-h-[160px] object-contain border border-solid border-gray-300 p-1"
																						onClick={() => {
																							open();
																						}}
																					/>
																				)}
																				<div className="flex items-center gap-2">
																					<button
																						onClick={open}
																						className="no-underline px-4 py-2 rounded-sm bg-gray-700 hover:bg-gray-700 text-white  whitespace-nowrap  hover:text-white">
																						Open Media Library
																					</button>

																				</div>
																			</div>
																		);
																	}}></MediaUpload>
															</div>
															<div className="flex  my-5  justify-between items-center">
																<label className="" htmlFor="emailVerification">
																	{__("Alt Text", "accordions")}
																</label>
																<PGinputText
																	value={item?.image?.altText}
																	className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
																	onChange={(newVal) => {
																		setitems((prevItems) => {
																			const updatedItems = [...prevItems];
																			updatedItems[index] = {
																				...updatedItems[index],
																				image: {
																					...updatedItems[index].image,
																					altText: newVal,
																				},
																			};
																			return updatedItems;
																		});
																	}}
																/>
															</div>
															<div className="flex  my-5  justify-between items-center">
																<label className="" htmlFor="emailVerification">
																	{__("Link", "accordions")}
																</label>
																<PGinputText
																	value={item?.link}
																	className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
																	onChange={(newVal) => {
																		setitems((prevItems) => {
																			const updatedItems = [...prevItems];
																			updatedItems[index] = {
																				...updatedItems[index],
																				link: newVal,
																			};
																			return updatedItems;
																		});
																	}}
																/>
															</div>
															<div className="mb-3">
																<PanelRow>
																	<label htmlFor="">Active</label>

																	<InputToggle
																		value={item?.active ?? 0}
																		onChange={(newVal) => {
																			if (isProFeature) {
																				addNotifications({
																					title: "Opps its pro!",
																					content:
																						"This feature only available in premium version",
																					type: "error",
																				});
																				return;
																			}

																			setitems((prevItems) => {
																				const updatedItems = [...prevItems];
																				updatedItems[index] = {
																					...updatedItems[index],
																					active: newVal,
																				};
																				return updatedItems;
																			});
																		}}
																	/>
																</PanelRow>
															</div>
														</div>
													)}
												</div>
											</>
										);
									})}
								</ReactSortable>
							</div>
						)}
					</PanelBody>
					<PanelBody
						className="font-medium text-slate-900 "
						title="Settings"
						initialOpen={false}>
						<div className="py-3">
							<PanelRow>
								<label htmlFor="" className="flex gap-2 items-center">
									Lazyload{" "}
									<span
										className="cursor-pointer"
										title="Click to know more"
										onClick={() => {
											setHelp({
												id: "lazyloadSetting",
												enable: true,
											});
										}}>
										<Icon icon={help} />
									</span>
								</label>
								{/* <SelectControl
									className="w-[140px]"
									label=""
									value={globalOptions?.lazyLoad}
									options={[
										{ label: __("True", "accordions"), value: 1 },
										{ label: __("False", "accordions"), value: 0 },
									]}
									onChange={(newVal) => {
										// var globalOptionsX = { ...globalOptions };
										// globalOptionsX.lazyLoad = newVal;
										// setglobalOptions(globalOptionsX);

										var globalOptionsX = { ...globalOptions };
										globalOptionsX.lazyLoad = newVal;
										setglobalOptions(globalOptionsX);
									}}
								/> */}
								<InputToggle
									value={globalOptions?.lazyLoad ?? 0}
									onChange={(newVal) => {
										var globalOptionsX = { ...globalOptions };
										globalOptionsX.lazyLoad = newVal;
										setglobalOptions(globalOptionsX);
									}}
								/>
							</PanelRow>
							{/* 
							<PanelRow>
								<label htmlFor="">Active Event</label>

								<SelectControl
									className="w-[140px]"
									label=""
									value={globalOptions?.activeEvent}
									options={[
										{ label: __("Click", "accordions"), value: "click" },
										{
											label: __("Mouseover", "accordions"),
											value: "mouseover",
										},
									]}
									onChange={(newVal) => {
										var globalOptionsX = { ...globalOptions };
										globalOptionsX.activeEvent = newVal;
										setglobalOptions(globalOptionsX);
									}}
								/>
							</PanelRow> */}
							<PanelRow>
								<label htmlFor="">URL Hash</label>
								{/* <SelectControl
									className="w-[140px]"
									label=""
									value={globalOptions?.urlHash}
									options={[
										{ label: __("Click", "accordions"), value: "click" },
										{
											label: __("Mouseover", "accordions"),
											value: "mouseover",
										},
									]}
									onChange={(newVal) => {
										var globalOptionsX = { ...globalOptions };
										globalOptionsX.urlHash = newVal;
										setglobalOptions(globalOptionsX);
									}}
								/> */}
								<InputToggle
									value={globalOptions?.urlHash ?? 0}
									onChange={(newVal) => {

										if (isProFeature) {
											addNotifications({
												title: "Opps its pro!",
												content:
													"This feature only avilable in premium version",
												type: "error",
											});
											return;
										}

										var globalOptionsX = { ...globalOptions };
										globalOptionsX.urlHash = newVal;
										setglobalOptions(globalOptionsX);
									}}
								/>
							</PanelRow>


							<PanelRow>
								<label htmlFor="" className="flex gap-2 items-center">
									Auto Play
									<span
										className="cursor-pointer"
										title="Click to know more"
										onClick={() => {
											setHelp({
												id: "autoPlaySetting",
												enable: true,
											});
										}}>
										<Icon icon={help} />
									</span>
									{isProFeature && (
										<span className="bg-amber-500 px-2 py-0.5 text-[11px]  no-underline rounded-sm  cursor-pointer text-white ">
											{__("Pro", "accordions")}
										</span>
									)}
								</label>
								<InputToggle
									value={globalOptions?.autoPlay}
									onChange={(newVal) => {
										if (isProFeature) {
											addNotifications({
												title: "Opps its pro!",
												content:
													"This feature only avilable in premium version",
												type: "error",
											});
											return;
										}
										var globalOptionsX = { ...globalOptions };
										globalOptionsX.autoPlay = newVal;
										setglobalOptions(globalOptionsX);
									}}
								/>
							</PanelRow>

							{globalOptions?.autoPlay && (
								<>
									{/* <PanelRow>
										<label htmlFor="" className="flex gap-2 items-center">
											Auto Play Control
											<span
												className="cursor-pointer"
												title="Click to know more"
												onClick={() => {
													setHelp({
														id: "statsSetting",
														enable: true,
													});
												}}>
												<Icon icon={help} />
											</span>
										</label>
										<InputToggle
											value={globalOptions?.autoPlayControl}
											onChange={(newVal) => {
												if (isProFeature) {
													addNotifications({
														title: "Opps its pro!",
														content:
															"This feature only avilable in premium version",
														type: "error",
													});
													return;
												}
												var globalOptionsX = { ...globalOptions };
												globalOptionsX.autoPlayControl = newVal;
												setglobalOptions(globalOptionsX);
											}}
										/>
									</PanelRow> */}

									<PanelRow className="w-full">
										<label htmlFor="" className="break-all">
											Auto Play Timeout
										</label>
										<PGinputText
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid max-w-[150px]"
											label=""
											value={globalOptions?.autoPlayTimeout}
											onChange={(newVal) => {
												var globalOptionsX = { ...globalOptions };
												globalOptionsX.autoPlayTimeout = newVal;
												setglobalOptions(globalOptionsX);
											}}
										/>
									</PanelRow>
									<PanelRow className="w-full">
										<label htmlFor="" className="break-all">
											Auto Play Delay
										</label>
										<PGinputText
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid max-w-[150px]"
											label=""
											value={globalOptions?.autoPlayDelay}
											onChange={(newVal) => {
												var globalOptionsX = { ...globalOptions };
												globalOptionsX.autoPlayDelay = newVal;
												setglobalOptions(globalOptionsX);
											}}
										/>
									</PanelRow>

									{/* <PanelRow>
										<label htmlFor="">Auto Play Order</label>

										<PGDropdown
											position="bottom right"
											variant="secondary"
											buttonTitle={
												globalOptions?.autoPlayOrder
													? globalOptions?.autoPlayOrder
													: __("Choose", "accordions")
											}
											options={[
												{
													label: __("Top To Bottom", "accordions"),
													value: "topToBottom",
													isPro: customerData.isPro ? false : true,
												},
												{
													label: __("Bottom To Top", "accordions"),
													value: "bottomToTop",
													isPro: customerData.isPro ? false : true,
												},
												{
													label: __("Random", "accordions"),
													value: "random",
													isPro: customerData.isPro ? false : true,
												},
											]}
											onChange={(newVal) => {
												var globalOptionsX = { ...globalOptions };
												globalOptionsX.autoPlayOrder = newVal.value;
												setglobalOptions(globalOptionsX);
											}}
											values=""></PGDropdown>
									</PanelRow> */}
								</>
							)}
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
							<PGtab name="options">
								<div className="flex  my-5  justify-between items-center">
									<label className="" htmlFor="emailVerification">
										{__("Class", "accordions")}
									</label>
									<PGinputText
										value={wrapper?.options?.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
										onChange={(newVal) => {
											var optionsX = {
												...wrapper,
												options: {
													...wrapper?.options,
													class: newVal,
												},
											};
											setwrapper(optionsX);
										}}
									/>
								</div>
							</PGtab>
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
									onBulkAdd={(sudoSource, cssObj) =>
										onBulkAddStyle(sudoSource, cssObj, wrapper, setwrapper)
									}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>


					<PanelBody
						className="font-medium text-slate-900 "
						title="Items Wrapper"
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
								<div className="flex  my-5  justify-between items-center">
									<label className="" htmlFor="emailVerification">
										{__("Class", "accordions")}
									</label>
									<PGinputText
										value={itemsWrap?.options?.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
										onChange={(newVal) => {
											var optionsX = {
												...itemsWrap,
												options: {
													...itemsWrap?.options,
													class: newVal,
												},
											};
											setitemsWrap(optionsX);
										}}
									/>
								</div>


							</PGtab>
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
									onBulkAdd={(sudoSource, cssObj) =>
										onBulkAddStyle(
											sudoSource,
											cssObj,
											itemsWrap,
											setitemsWrap
										)
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
							<PGtab name="options">
								<div className="flex  my-5  justify-between items-center">
									<label className="" htmlFor="emailVerification">
										{__("Class", "accordions")}
									</label>
									<PGinputText
										value={item?.options?.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
										onChange={(newVal) => {
											var optionsX = {
												...item,
												options: {
													...item?.options,
													class: newVal,
												},
											};
											setitem(optionsX);
										}}
									/>
								</div>
							</PGtab>
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
									onBulkAdd={(sudoSource, cssObj) =>
										onBulkAddStyle(sudoSource, cssObj, item, setitem)
									}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>
					<PanelBody
						className="font-medium text-slate-900 "
						title="Item Active"
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
								<div className="flex  my-5  justify-between items-center">
									<label className="" htmlFor="emailVerification">
										{__("Class", "accordions")}
									</label>
									<PGinputText
										value={itemActive?.options?.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
										onChange={(newVal) => {
											var optionsX = {
												...itemActive,
												options: {
													...itemActive?.options,
													class: newVal,
												},
											};
											setitemActive(optionsX);
										}}
									/>
								</div>
							</PGtab>
							<PGtab name="styles">
								<PGStyles
									obj={itemActive}
									onChange={(sudoScource, newVal, attr) =>
										onChangeStyle(sudoScource, newVal, attr, itemActive, setitemActive)
									}
									onAdd={(sudoScource, key) =>
										onAddStyle(sudoScource, key, itemActive, setitemActive)
									}
									onRemove={(sudoScource, key) =>
										onRemoveStyle(sudoScource, key, itemActive, setitemActive)
									}
									onReset={(sudoSources) =>
										onResetStyle(sudoSources, itemActive, setitemActive)
									}
									onBulkAdd={(sudoSource, cssObj) =>
										onBulkAddStyle(sudoSource, cssObj, itemActive, setitemActive)
									}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>



					<PanelBody
						className="font-medium text-slate-900 "
						title="Overlay"
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
								<div className="flex  my-5  justify-between items-center">
									<label className="" htmlFor="emailVerification">
										{__("Class", "accordions")}
									</label>
									<PGinputText
										value={overlay?.options?.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
										onChange={(newVal) => {
											var optionsX = {
												...overlay,
												options: {
													...overlay?.options,
													class: newVal,
												},
											};
											setoverlay(optionsX);
										}}
									/>
								</div>

								<PanelRow>
									<label htmlFor="" className="flex gap-2 items-center">
										IN Animation
									</label>

									<PGDropdown
										position="bottom right"
										variant="secondary"
										buttonTitle={
											popupEntranceAnimateBasic[
												overlay?.options?.inAnimation
											] == undefined
												? __("Choose", "accordions")
												: popupEntranceAnimateBasic[
													overlay?.options?.inAnimation
												].label
										}
										options={popupEntranceAnimateBasic}
										onChange={(newVal) => {



											if (isProFeature) {
												addNotifications({
													title: "Opps its pro!",
													content:
														"This feature only avilable in premium version",
													type: "error",
												});
												return;
											}





											var optionsX = {
												...overlay,
												options: {
													...overlay?.options,
													inAnimation: newVal.value,
												},
											};
											setoverlay(optionsX);
										}}
										values=""></PGDropdown>
								</PanelRow>
								<PanelRow>
									<label htmlFor="" className="flex gap-2 items-center">
										OUT Animation
									</label>

									<PGDropdown
										position="bottom right"
										variant="secondary"
										buttonTitle={
											popupCloseAnimateBasic[
												overlay?.options?.outAnimation
											] == undefined
												? __("Choose", "accordions")
												: popupCloseAnimateBasic[
													overlay?.options?.outAnimation
												].label
										}
										options={popupCloseAnimateBasic}
										onChange={(newVal) => {

											if (isProFeature) {
												addNotifications({
													title: "Opps its pro!",
													content:
														"This feature only avilable in premium version",
													type: "error",
												});
												return;
											}




											var optionsX = {
												...overlay,
												options: {
													...overlay?.options,
													outAnimation: newVal.value,
												},
											};
											setoverlay(optionsX);
										}}
										values=""></PGDropdown>
								</PanelRow>

								<div className="flex  my-5  justify-between items-center">
									<label className="" htmlFor="emailVerification">
										{__("Animation duration", "accordions")}
									</label>
									<PGinputText
										value={overlay?.options?.animationDuration}
										placeholder={"1000"}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[200px]"
										onChange={(newVal) => {

											if (isProFeature) {
												addNotifications({
													title: "Opps its pro!",
													content:
														"This feature only avilable in premium version",
													type: "error",
												});
												return;
											}





											var optionsX = {
												...overlay,
												options: {
													...overlay?.options,
													animationDuration: newVal,
												},
											};
											setoverlay(optionsX);
										}}
									/>
								</div>

								<PanelBody
									className="font-medium text-slate-900 "
									title="Title"
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
											<div className="flex  my-5  justify-between items-center">
												<label className="" htmlFor="emailVerification">
													{__("Class", "accordions")}
												</label>
												<PGinputText
													value={title?.options?.class}
													className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
													onChange={(newVal) => {
														var optionsX = {
															...title,
															options: {
																...title?.options,
																class: newVal,
															},
														};
														settitle(optionsX);
													}}
												/>
											</div>
										</PGtab>
										<PGtab name="styles">
											<PGStyles
												obj={title}
												onChange={(sudoScource, newVal, attr) =>
													onChangeStyle(sudoScource, newVal, attr, title, settitle)
												}
												onAdd={(sudoScource, key) =>
													onAddStyle(sudoScource, key, title, settitle)
												}
												onRemove={(sudoScource, key) =>
													onRemoveStyle(sudoScource, key, title, settitle)
												}
												onReset={(sudoSources) =>
													onResetStyle(sudoSources, title, settitle)
												}
												onBulkAdd={(sudoSource, cssObj) =>
													onBulkAddStyle(sudoSource, cssObj, title, settitle)
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
										<PGtab name="options">
											<div className="flex  my-5  justify-between items-center">
												<label className="" htmlFor="emailVerification">
													{__("Class", "accordions")}
												</label>
												<PGinputText
													value={content?.options?.class}
													className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
													onChange={(newVal) => {
														var optionsX = {
															...content,
															options: {
																...content?.options,
																class: newVal,
															},
														};
														setcontent(optionsX);
													}}
												/>
											</div>
										</PGtab>
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
												onBulkAdd={(sudoSource, cssObj) =>
													onBulkAddStyle(sudoSource, cssObj, content, setcontent)
												}
											/>
										</PGtab>
									</PGtabs>
								</PanelBody>
							</PGtab>
							<PGtab name="styles">
								<PGStyles
									obj={overlay}
									onChange={(sudoScource, newVal, attr) =>
										onChangeStyle(
											sudoScource,
											newVal,
											attr,
											overlay,
											setoverlay
										)
									}
									onAdd={(sudoScource, key) =>
										onAddStyle(sudoScource, key, overlay, setoverlay)
									}
									onRemove={(sudoScource, key) =>
										onRemoveStyle(sudoScource, key, overlay, setoverlay)
									}
									onReset={(sudoSources) =>
										onResetStyle(sudoSources, overlay, setoverlay)
									}
									onBulkAdd={(sudoSource, cssObj) =>
										onBulkAddStyle(
											sudoSource,
											cssObj,
											overlay,
											setoverlay
										)
									}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>

					<PanelBody
						className="font-medium text-slate-900 "
						title="Image"
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
								<div className="flex  my-5  justify-between items-center">
									<label className="" htmlFor="emailVerification">
										{__("Class", "accordions")}
									</label>
									<PGinputText
										value={image?.options?.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[210px]"
										onChange={(newVal) => {
											var optionsX = {
												...image,
												options: {
													...image?.options,
													class: newVal,
												},
											};
											setimage(optionsX);
										}}
									/>
								</div>
							</PGtab>
							<PGtab name="styles">
								<PGStyles
									obj={image}
									onChange={(sudoScource, newVal, attr) =>
										onChangeStyle(sudoScource, newVal, attr, image, setimage)
									}
									onAdd={(sudoScource, key) =>
										onAddStyle(sudoScource, key, image, setimage)
									}
									onRemove={(sudoScource, key) =>
										onRemoveStyle(sudoScource, key, image, setimage)
									}
									onReset={(sudoSources) =>
										onResetStyle(sudoSources, image, setimage)
									}
									onBulkAdd={(sudoSource, cssObj) =>
										onBulkAddStyle(sudoSource, cssObj, image, setimage)
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

class EditImageAccordion extends Component {
	constructor(props) {
		super(props);
		this.state = { showWarning: true, isLoaded: false };
		this.handleToggleClick = this.handleToggleClick.bind(this);
	}

	handleToggleClick() {
		this.setState((state) => ({
			showWarning: !state.showWarning,
		}));
	}

	render() {
		var { onChange, postData, customerData, addNotifications, setHelp } =
			this.props;

		return (
			<Html
				onChange={onChange}
				addNotifications={addNotifications}
				postData={postData}
				customerData={customerData}
				setHelp={setHelp}
				warn={this.state.showWarning}
				isLoaded={this.state.isLoaded}
			/>
		);
	}
}

export default EditImageAccordion;
