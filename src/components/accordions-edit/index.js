const { Component, RawHTML, useState, useEffect } = wp.element;
import apiFetch from "@wordpress/api-fetch";
import { store as coreStore } from "@wordpress/core-data";
import { useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import { ReactSortable } from "react-sortablejs";

import {
	Icon,
	__experimentalInputControl as InputControl,
	PanelBody,
	PanelRow,
	Popover,
	SelectControl,
	ToggleControl,
} from "@wordpress/components";
import {
	addCard,
	brush,
	close,
	copy,
	help,
	menu,
	page,
	settings,
	update,
} from "@wordpress/icons";

import { RichText } from "@wordpress/block-editor";
import breakPoints from "../../breakpoints";
import PGDropdown from "../dropdown";
import PGIconPicker from "../icon-picker";
import PGinputSelect from "../input-select";
import PGinputText from "../input-text";
import PGinputTextarea from "../input-textarea";
import PGcssOpenaiPrompts from "../openai-prompts";
import PGStyles from "../styles";
import PGtab from "../tab";
import PGtabs from "../tabs";
import { popupEntranceAnimateBasic } from "../../inAnimation";
import { popupCloseAnimateBasic } from "../../outAnimation";
import Toggle from "./toggle";
import InputToggle from "../input-toggle";

import { iconsList } from "./iconsList";
import PGinputNumber from "../input-number";

var myStore = wp.data.select("postgrid-shop");

function Html(props) {
	if (!props.warn) {
		return null;
	}

	var onChange = props.onChange;
	var addNotifications = props.addNotifications;
	var setHelp = props.setHelp;

	var postData = props.postData;



	var breakPointX = "Desktop";

	var [accordionData, setaccordionData] = useState(postData.post_content); // Using the hook.

	var [globalOptions, setglobalOptions] = useState(accordionData.globalOptions); // Using the hook.

	var [itemQueryArgs, setitemQueryArgs] = useState(accordionData.itemQueryArgs); // Using the hook.

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
	var [expandCollapseAll, setexpandCollapseAll] = useState(
		accordionData.expandCollapseAll
	);
	var [topWrap, settopWrap] = useState(accordionData.topWrap);


	var [searchInput, setsearchInput] = useState(accordionData.searchInput);

	var [styleObj, setstyleObj] = useState({}); // Using the hook.
	const [taxonomiesObjects, setTaxonomiesObjects] = useState([]);
	var [customerData, setcustomerData] = useState(props.customerData);
	var [isProFeature, setisProFeature] = useState(true);

	const gapValue = accOptions?.gap || "0px";
	const [number, setNumber] = useState(parseInt(gapValue));
	const [unit, setUnit] = useState(gapValue.replace(number, ""));
	const [itemActive, setitemActive] = useState(99999);
	const [AIautoUpdate, setAIautoUpdate] = useState(false);
	var [AIWriter, setAIWriter] = useState(false); // Using the hook.
	const [copied, setCopied] = useState(false);
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

	useEffect(() => { }, [props.postData]);

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
		accordionDataX.accOptions = accOptions;
		setaccordionData(accordionDataX);
	}, [accOptions]);

	useEffect(() => {
		var accordionDataX = { ...accordionData };
		accordionDataX.items = items;
		setaccordionData(accordionDataX);
	}, [items]);

	useEffect(() => {
		var accordionDataX = { ...accordionData };
		accordionDataX.itemQueryArgs = itemQueryArgs;
		setaccordionData(accordionDataX);
	}, [itemQueryArgs]);




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
		accordionDataX.header = header;
		setaccordionData(accordionDataX);
	}, [header]);

	useEffect(() => {
		var accordionDataX = { ...accordionData };
		accordionDataX.headerActive = headerActive;
		setaccordionData(accordionDataX);
	}, [headerActive]);

	useEffect(() => {
		var accordionDataX = { ...accordionData };
		accordionDataX.headerLabel = headerLabel;
		setaccordionData(accordionDataX);
	}, [headerLabel]);

	useEffect(() => {
		var accordionDataX = { ...accordionData };
		accordionDataX.labelCounter = labelCounter;
		setaccordionData(accordionDataX);
	}, [labelCounter]);

	useEffect(() => {
		var accordionDataX = { ...accordionData };
		accordionDataX.labelIcon = labelIcon;
		setaccordionData(accordionDataX);
	}, [labelIcon]);

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

	useEffect(() => {
		setaccordionData((prevData) => ({
			...prevData,
			icon,
			iconToggle,
		}));
	}, [icon, iconToggle]);

	const updateIconOptions = (icon, itemSrc) => ({
		...icon,
		options: {
			...icon.options,
			iconSrc: itemSrc,
		},
	});

	const handleClick = (item) => {
		seticon((prevIcon) => updateIconOptions(prevIcon, item.icon));
		seticonToggle((prevIconToggle) =>
			updateIconOptions(prevIconToggle, item.toggle)
		);
	};

	useEffect(() => {
		var accordionDataX = { ...accordionData };
		accordionDataX.expandCollapseAll = expandCollapseAll;
		setaccordionData(accordionDataX);
	}, [expandCollapseAll]);

	useEffect(() => {
		var accordionDataX = { ...accordionData };
		accordionDataX.topWrap = topWrap;
		setaccordionData(accordionDataX);
	}, [topWrap]);

	useEffect(() => {
		var accordionDataX = { ...accordionData };
		accordionDataX.searchInput = searchInput;
		setaccordionData(accordionDataX);
	}, [searchInput]);

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

	const copyData = (data) => {
		navigator.clipboard
			.writeText(data)
			.then(() => {
				addNotifications({
					title: "Copied to clipboard!",
					content:
						"Use the shortcode in page or post conent where you want to display.",
					type: "success",
				});
			})
			.catch((err) => { });
	};

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
		var itemQueryArgsX = { ...itemQueryArgs };
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

			label: "Include",
			description: "Comma-separated string of term IDs to include.",
			longDescription:
				"Array or comma/space-separated string of term IDs to include. Default empty array.",
			placeholder: "Comma-separated string of term IDs to include.",
		},
		exclude: {
			value: "",

			id: "exclude",

			label: "Exclude",
			description: "Comma-separated string of term IDs to exclude.",
			longDescription:
				"Array or comma/space-separated string of term IDs to exclude. If $include is non-empty, $exclude is ignored. Default empty array.",
			placeholder: "Comma-separated string of term IDs to exclude.",
		},
		child_of: {
			value: "",

			id: "child_of",

			label: "Child of",
			description: "Term ID to retrieve child terms of.",
			longDescription:
				"Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0.",
		},
		parent: {
			value: "",

			id: "parent",

			label: "Parent",
			description:
				"Add {ID} to add Parent term ID to retrieve direct-child terms of.",
			longDescription: "Parent term ID to retrieve direct-child terms of.",
		},
		meta_key: {
			value: "",

			id: "meta_key",

			label: "Meta key",
			description: "Comma-separated keys to return term(s) for.",
			longDescription: "Meta key or keys to filter by.",
		},
		meta_value: {
			value: "",

			id: "meta_value",

			label: "Meta value",
			description: "Comma-separated keys to return term(s) for.",
			longDescription: "Meta value or values to filter by.",
		},
	};
	var easyAccordionQueryArgs = {
		postId: {
			value: "",
			id: "postId",
			label: __("Post Id", "accordions"),
			description: "",
			longDescription: "",
		},

	};




	const updateTermQueryArgs = (newVal, index) => {
		var itemQueryArgsX = { ...itemQueryArgs };
		itemQueryArgsX[index].value = newVal;
		setitemQueryArgs(itemQueryArgsX);
	};

	const handleDelete = (id) => {
		// Filter out the item with the specified id
		const updatedItems = Object.fromEntries(
			Object.entries(itemQueryArgs).filter(([key, item]) => item.id !== id)
		);
		setitemQueryArgs(updatedItems);
	};



	var itemSources = {
		manual: { label: "Manual", value: "manual" },
		easyAccordion: { label: "Easy Accordion - FAQ Group", value: "easyAccordion" },
		posts: {
			label: "Posts",
			value: "posts",
			coming: true,
			isPro: customerData.isPro ? false : true,
		},
		terms: {
			label: "Terms",
			value: "terms",
			coming: true,

			isPro: customerData.isPro ? false : true,
		},
	};

	var iconSets = [
		{
			idle: "",
			toggle: "",
		},
	];

	function generate3Digit() {
		return Math.floor(100 + Math.random() * 900);
	}

	return (
		<div className="">




			<div
				className="hidden"
				onClick={() => {
					var str = `
{
"wrapper":${JSON.stringify(wrapper)}
"content":${JSON.stringify(content)},
				"header":${JSON.stringify(header)},
				"headerActive":${JSON.stringify(headerActive)},
				"headerLabel":${JSON.stringify(headerLabel)},
				"labelCounter":${JSON.stringify(labelCounter)},
				"labelIcon":${JSON.stringify(labelIcon)},
				"icon":${JSON.stringify(icon)},
				"iconToggle":${JSON.stringify(iconToggle)},
				"searchInput":${JSON.stringify(searchInput)},
				"expandCollapseAll":${JSON.stringify(expandCollapseAll)},
				"topWrap":${JSON.stringify(topWrap)},
				}

`;

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
					<div>{`"content":${JSON.stringify(content)}`},</div>
					<div>{`"header":${JSON.stringify(header)}`},</div>
					<div>{`"headerActive":${JSON.stringify(headerActive)}`},</div>
					<div>{`"headerLabel":${JSON.stringify(headerLabel)}`},</div>
					<div>{`"labelCounter":${JSON.stringify(labelCounter)}`},</div>
					<div>{`"labelIcon":${JSON.stringify(labelIcon)}`},</div>
					<div>{`"icon":${JSON.stringify(icon)}`},</div>
					<div>{`"iconToggle":${JSON.stringify(iconToggle)}`},</div>
					<div>{`"searchInput":${JSON.stringify(searchInput)}`},</div>
					<div>
						{`"expandCollapseAll":${JSON.stringify(expandCollapseAll)}`},
					</div>
					<div>{`"topWrap":${JSON.stringify(topWrap)}`},</div>
					<div>{`}`}</div>
				</div>
			</div>

			{props.postData.post_content != null && (
				<>

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
										<div className="flex items-center gap-2">
											<span
												className="flex items-center gap-2 bg-slate-700 text-white px-3 py-2 rounded-sm cursor-pointer hover:bg-slate-600"
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
													} catch (error) {
													}
												}}>
												<Icon icon={page} fill="#fff" size="20" />
											</span>
											<span
												className="flex items-center gap-2 bg-slate-700 text-white px-3 py-2 rounded-sm cursor-pointer hover:bg-slate-600"
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
															.catch((err) => {
															});
													} catch (error) {
													}
												}}>
												<Icon icon={copy} fill="#fff" size="20" />
											</span>
										</div>
										<div
											className="flex items-center gap-2 bg-slate-700 text-white px-3 py-2 rounded-sm cursor-pointer hover:bg-slate-600"
											onClick={(ev) => {
												var itemsX = [...items];

												itemsX.push({
													active: 0,
													hideOnSchema: 0,
													headerLabelText: "",
													headerLabelSlug: "",
													headerLabelToggledText: "",
													contentText: "",

													labelIcon: {
														options: {
															library: "fontAwesome",
															srcType: "class",
															iconSrc: "",
														},
														styles: {},
													},
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
										<div className=" tracking-wide ">
											<div
												className="py-2 px-4 cursor-pointer  capitalize bg-gray-700 text-white font-medium rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
												onClick={(ev) => {
													ev.preventDefault();
													ev.stopPropagation();

													if (isProFeature) {
														addNotifications({
															title: "Opps its pro!",
															content:
																"This feature only avilable in premium version",
															type: "error",
														});
														return;
													}

													setAIWriter(!AIWriter);
												}}>
												AI
											</div>
											{AIWriter && (
												<Popover position="bottom right">
													<div className="w-[800px] p-3 relative">
														<span
															className="cursor-pointer px-1 bg-red-500 hover:bg-red-700 hover:text-white absolute top-0 right-0"
															onClick={(ev) => {
																ev.preventDefault();
																ev.stopPropagation();
																setAIWriter(!AIWriter);
															}}>
															<Icon fill={"#fff"} icon={close} />
														</span>

														<PGcssOpenaiPrompts
															value={""}
															formattedPrompt={formattedPrompt}
															promptsAgs={{
																action: "write",
																aiModel: "gpt-4-turbo",
																objective: "generateFAQ",
															}}
															autoUpdate={AIautoUpdate}
															onResponseLoaded={(value, autoUpdate) => {
																// if (autoUpdate) {
																// 	var options = { ...text.options, content: value };
																// 	setAttributes({ text: { ...text, options: options } });
																// }
															}}
															clickHandle={(value, action) => {
																var valueObj = JSON.parse(value);

																if (action == "prepend") {
																	var itemsX = [...items];

																	var faqX = [];

																	valueObj.map((item) => {
																		var answer = item.answer;
																		var question = item.question;

																		faqX.push({
																			active: 0,
																			hideOnSchema: 0,
																			headerLabelText: question,
																			headerLabelSlug: "",

																			headerLabelToggledText: "",
																			contentText: answer,
																			labelIcon: {
																				options: {
																					library: "fontAwesome",
																					srcType: "class",
																					iconSrc: "",
																				},
																				styles: {},
																			},
																		});
																	});

																	setitems([...faqX, ...itemsX]);

																	addNotifications({
																		title: "Items append",
																		content:
																			"Items append, You can customize now.",
																		type: "success",
																	});
																}
																if (action == "append") {
																	var itemsX = [...items];

																	var faqX = [];

																	valueObj.map((item) => {
																		var answer = item.answer;
																		var question = item.question;

																		faqX.push({
																			active: 0,
																			hideOnSchema: 0,
																			headerLabelText: question,
																			headerLabelSlug: "",

																			headerLabelToggledText: "",
																			contentText: answer,
																			labelIcon: {
																				options: {
																					library: "fontAwesome",
																					srcType: "class",
																					iconSrc: "",
																				},
																				styles: {},
																			},
																		});
																	});

																	setitems([...itemsX, ...faqX]);

																	addNotifications({
																		title: "Items Append",
																		content:
																			"Items append, You can customize now.",
																		type: "success",
																	});
																}
																if (action == "replace") {
																	var itemsX = [...items];

																	var faqX = [];

																	valueObj.map((item) => {
																		var answer = item.answer;
																		var question = item.question;

																		faqX.push({
																			active: 0,
																			hideOnSchema: 0,
																			headerLabelText: question,
																			headerLabelSlug: "",
																			headerLabelToggledText: "",
																			contentText: answer,
																			labelIcon: {
																				options: {
																					library: "fontAwesome",
																					srcType: "class",
																					iconSrc: "",
																				},
																				styles: {},
																			},
																		});
																	});

																	setitems(faqX);

																	addNotifications({
																		title: "Items Added",
																		content:
																			"You just added an item, Now go to edit.",
																		type: "success",
																	});
																}

																//setAttributes({ itemsX: { ...itemsX, items: itemx } });
															}}
														/>
													</div>
												</Popover>
											)}
										</div>
									</>
								)}
							</div>
						</div>
						{globalOptions?.itemSource == "posts" && (
							<div>
								{Object.entries(itemQueryArgs)?.map((prams) => {

									var index = prams[0]
									var item = prams[1]


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

									var index = prams[0]
									var item = prams[1]

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

									var index = prams[0]
									var item = prams[1]


									return (
										<div key={index} className="my-4">


											{item.id == "postId" && (
												<div
													className={`flex items-center justify-between`}>
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
										}, 200)

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
															setitemActive(index == itemActive ? 999 : index);
														}}>
														<div>{item?.headerLabelText}</div>
														<div className="flex items-center gap-2">
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

													{itemActive == index && (
														<div className="py-2 w-full">
															<div className="mb-3">
																<RichText
																	placeholder="Write Header Text..."
																	className="bg-slate-100 p-3 "
																	tagName={"div"}
																	value={item?.headerLabelText}
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
																				headerLabelText: content,
																			};
																			return updatedItems;
																		});
																	}}
																/>
															</div>
															<div className="mb-3">
																<PGinputTextarea
																	placeholder="Write Header Text..."
																	id={`content-${index}-${generate3Digit()}`}
																	className={`bg-slate-100 p-3 min-h-24 w-full`}
																	value={item?.contentText}
																	onChange={(content) => {
																		setitems((prevItems) => {
																			const updatedItems = [...prevItems];
																			updatedItems[index] = {
																				...updatedItems[index],
																				contentText: content,
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
															<div className="mb-3">
																<PanelRow>
																	<label htmlFor="">Hide On Schema</label>

																	<InputToggle
																		value={item?.hideOnSchema ?? 0}
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

																			setitems((prevItems) => {
																				const updatedItems = [...prevItems];
																				updatedItems[index] = {
																					...updatedItems[index],
																					hideOnSchema: newVal,
																				};
																				return updatedItems;
																			});
																		}}
																	/>
																</PanelRow>

																{/* <PanelRow>
																	<label htmlFor="" className="font-medium text-slate-900 ">
																		{__("Icon Idle", "accordions")}
																	</label>
																	<PGIconPicker
																		library={item?.icon?.options?.library}
																		srcType={item?.icon?.options?.srcType}
																		iconSrc={item?.icon?.options?.iconSrc}
																		onChange={(arg) => {

																			if (isProFeature) {

																				addNotifications({
																					title: "Opps its pro!",
																					content: "This feature only avilable in premium version",
																					type: "error",
																				});
																				return;
																			}

																			setitems((prevItems) => {
																				const updatedItems = [...prevItems];
																				updatedItems[index] = {
																					...updatedItems[index],
																					icon: {
																						...updatedItems[index].icon,
																						options: {
																							...updatedItems[index]?.icon?.options,
																							srcType: arg.srcType,
																							library: arg.library,
																							iconSrc: arg.iconSrc,
																						}

																					},
																				};
																				return updatedItems;
																			});


																		}}
																	/>
																</PanelRow>
																<PanelRow>
																	<label htmlFor="" className="font-medium text-slate-900 ">
																		{__("Icon Toggled", "accordions")}
																	</label>
																	<PGIconPicker
																		library={item?.iconToggle?.options?.library}
																		srcType={item?.iconToggle?.options?.srcType}
																		iconSrc={item?.iconToggle?.options?.iconSrc}
																		onChange={(arg) => {

																			if (isProFeature) {

																				addNotifications({
																					title: "Opps its pro!",
																					content: "This feature only avilable in premium version",
																					type: "error",
																				});
																				return;
																			}

																			setitems((prevItems) => {
																				const updatedItems = [...prevItems];
																				updatedItems[index] = {
																					...updatedItems[index],
																					iconToggle: {
																						...updatedItems[index].iconToggle,
																						options: {
																							...updatedItems[index]?.iconToggle?.options,
																							srcType: arg.srcType,
																							library: arg.library,
																							iconSrc: arg.iconSrc,
																						}

																					},
																				};
																				return updatedItems;
																			});


																		}}
																	/>
																</PanelRow> */}
																<PanelRow>
																	<label
																		htmlFor=""
																		className="font-medium text-slate-900 ">
																		{__("Label Icon", "accordions")}
																	</label>
																	<PGIconPicker
																		library={item?.labelIcon?.options?.library}
																		srcType={item?.labelIcon?.options?.srcType}
																		iconSrc={item?.labelIcon?.options?.iconSrc}
																		onChange={(arg) => {
																			if (isProFeature) {
																				addNotifications({
																					title: "Opps its pro!",
																					content:
																						"This feature only avilable in premium version",
																					type: "error",
																				});
																				return;
																			}

																			setitems((prevItems) => {
																				const updatedItems = [...prevItems];
																				updatedItems[index] = {
																					...updatedItems[index],
																					labelIcon: {
																						...updatedItems[index].labelIcon,
																						options: {
																							...updatedItems[index]?.labelIcon
																								?.options,
																							srcType: arg.srcType,
																							library: arg.library,
																							iconSrc: arg.iconSrc,
																						},
																					},
																				};
																				return updatedItems;
																			});
																		}}
																	/>
																</PanelRow>

																<div className="w-full">
																	<div className="mb-2">Slug</div>
																	<div className="flex items-center gap-2">
																		<PGinputText
																			className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full "
																			label=""
																			value={item?.headerLabelSlug}
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

																				setitems((prevItems) => {
																					const updatedItems = [...prevItems];
																					updatedItems[index] = {
																						...updatedItems[index],
																						headerLabelSlug: newVal,
																					};
																					return updatedItems;
																				});
																			}}
																		/>

																		<div
																			title="Generate from Label"
																			className="cursor-pointer rounded-sm bg-gray-700 hover:bg-gray-600 hover:text-white px-1 py-1"
																			onClick={(ev) => {
																				var slug = item?.headerLabelText
																					.toLowerCase()
																					.replaceAll(" ", "-");

																				setitems((prevItems) => {
																					const updatedItems = [...prevItems];
																					updatedItems[index] = {
																						...updatedItems[index],
																						headerLabelSlug: slug,
																					};
																					return updatedItems;
																				});
																			}}>
																			<Icon fill={"#fff"} icon={update} />
																		</div>
																	</div>
																</div>
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
						title="Accordion Settings"
						initialOpen={false}>
						<div className="py-3">
							<PanelRow>
								<label htmlFor="" className="flex gap-2 items-center">
									Lazyload
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
								<InputToggle
									value={globalOptions?.lazyLoad}
									onChange={(newVal) => {
										var globalOptionsX = { ...globalOptions };
										globalOptionsX.lazyLoad = newVal;
										setglobalOptions(globalOptionsX);
									}}
								/>
							</PanelRow>

							<PanelRow>
								<label htmlFor="" className="flex gap-2 items-center">
									Schema
									<span
										className="cursor-pointer"
										title="Click to know more"
										onClick={() => {
											setHelp({
												id: "schemaSetting",
												enable: true,
											});
										}}>
										<Icon icon={help} />
									</span>
								</label>

								<InputToggle
									value={globalOptions?.schema}
									onChange={(newVal) => {
										var globalOptionsX = { ...globalOptions };
										globalOptionsX.schema = newVal;
										setglobalOptions(globalOptionsX);
									}}
								/>
							</PanelRow>
							<PanelRow>
								<label htmlFor="" className="flex gap-2 items-center">
									Keep Expand Other

								</label>

								<InputToggle
									value={globalOptions?.keepExpandOther}
									onChange={(newVal) => {
										var globalOptionsX = { ...globalOptions };
										globalOptionsX.keepExpandOther = newVal;
										setglobalOptions(globalOptionsX);
									}}
								/>
							</PanelRow>

							<PanelRow>
								<label htmlFor="" className="flex gap-2 items-center">
									Stats
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
									{isProFeature && (
										<span className="bg-amber-500 px-2 py-0.5 text-[11px]  no-underline rounded-sm  cursor-pointer text-white ">
											{__("Pro", "accordions")}
										</span>
									)}
								</label>
								<InputToggle
									value={globalOptions?.stats}
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
										globalOptionsX.stats = newVal;
										setglobalOptions(globalOptionsX);
									}}
								/>
							</PanelRow>

							<PanelRow>
								<label htmlFor="">Active Event</label>

								<PGDropdown
									position="bottom right"
									variant="secondary"
									buttonTitle={
										globalOptions?.activeEvent
											? globalOptions?.activeEvent
											: __("Choose", "accordions")
									}
									options={[
										{
											label: __("Click", "accordions"),
											value: "click",
										},
										// {
										// 	label: __("Mouseover", "accordions"),
										// 	value: "mouseover",
										// 	isPro: customerData.isPro ? false : true,
										// },
										// {
										// 	label: __("Focus", "accordions"),
										// 	value: "focus",
										// 	isPro: customerData.isPro ? false : true,
										// },
									]}
									onChange={(option) => {
										var globalOptionsX = { ...globalOptions };
										globalOptionsX.activeEvent = option.value;
										setglobalOptions(globalOptionsX);
									}}
									values=""></PGDropdown>
							</PanelRow>

							<PanelRow>
								<label htmlFor="" className="flex gap-2 items-center">
									URL Hash
									<span
										className="cursor-pointer"
										title="Click to know more"
										onClick={() => {
											setHelp({
												id: "urlHash",
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
									value={globalOptions?.urlHash}
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
									Click To Scroll Top
									<span
										className="cursor-pointer"
										title="Click to know more"
										onClick={() => {
											setHelp({
												id: "scrollToTopSetting",
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
									value={globalOptions?.clickToScrollTop}
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
										globalOptionsX.clickToScrollTop = newVal;
										setglobalOptions(globalOptionsX);
									}}
								/>
							</PanelRow>
							{globalOptions?.clickToScrollTop && (
								<PanelRow className="w-full">
									<label htmlFor="" className="break-all">
										Click To Scroll Top Offset
									</label>
									<PGinputText
										className="max-w-[140px]"
										label=""
										value={globalOptions?.clickToScrollTopOffset}
										onChange={(newVal) => {
											var globalOptionsX = { ...globalOptions };
											globalOptionsX.clickToScrollTopOffset = newVal;
											setglobalOptions(globalOptionsX);
										}}
									/>
								</PanelRow>
							)}

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

									<PanelRow>
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
									</PanelRow>
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
									<label className="" htmlFor="">
										{__("Class", "accordions")}
									</label>
									<PGinputText
										value={wrapper?.options?.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid max-w-[400px]"
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
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid max-w-[400px]"
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
								<PanelRow>
									<label htmlFor="" className="flex gap-2 items-center">
										Autoembed
										<span
											className="cursor-pointer"
											title="Click to know more"
											onClick={() => {
												setHelp({
													id: "autoembedSetting",
													enable: true,
												});
											}}>
											<Icon icon={help} />
										</span>
									</label>
									<InputToggle
										value={content?.options?.autoembed}
										onChange={(newVal) => {
											var optionsX = {
												...content,
												options: {
													...content?.options,
													autoembed: newVal,
												},
											};
											setcontent(optionsX);
										}}
									/>
								</PanelRow>

								<PanelRow>
									<label htmlFor="" className="flex gap-2 items-center">
										Shortcodes
										<span
											className="cursor-pointer"
											title="Click to know more"
											onClick={() => {
												setHelp({
													id: "shortcodesSetting",
													enable: true,
												});
											}}>
											<Icon icon={help} />
										</span>
									</label>

									<InputToggle
										value={content?.options?.shortcodes}
										onChange={(newVal) => {
											var optionsX = {
												...content,
												options: {
													...content?.options,
													shortcodes: newVal,
												},
											};
											setcontent(optionsX);
										}}
									/>
								</PanelRow>
								<PanelRow>
									<label htmlFor="" className="flex gap-2 items-center">
										wpautop
										<span
											className="cursor-pointer"
											title="Click to know more"
											onClick={() => {
												setHelp({
													id: "wpautopSetting",
													enable: true,
												});
											}}>
											<Icon icon={help} />
										</span>
									</label>

									<InputToggle
										value={content?.options?.wpautop}
										onChange={(newVal) => {
											var optionsX = {
												...content,
												options: {
													...content?.options,
													wpautop: newVal,
												},
											};
											setcontent(optionsX);
										}}
									/>
								</PanelRow>
								<PanelRow>
									<label htmlFor="" className="flex gap-2 items-center">
										In Animation
									</label>

									<PGDropdown
										position="bottom right"
										variant="secondary"
										buttonTitle={
											popupEntranceAnimateBasic[content?.options?.inAnimation] ==
												undefined
												? __("Choose", "accordions")
												: popupEntranceAnimateBasic[content?.options?.inAnimation]
													.label
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
												...content,
												options: {
													...content?.options,
													inAnimation: newVal.value,
												},
											};
											setcontent(optionsX);
										}}
										values=""></PGDropdown>
								</PanelRow>
								<PanelRow>
									<label htmlFor="" className="flex gap-2 items-center">
										Out Animation
									</label>

									<PGDropdown
										position="bottom right"
										variant="secondary"
										buttonTitle={
											popupCloseAnimateBasic[content?.options?.outAnimation] ==
												undefined
												? __("Choose", "accordions")
												: popupCloseAnimateBasic[content?.options?.outAnimation]
													.label
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
												...content,
												options: {
													...content?.options,
													outAnimation: newVal.value,
												},
											};
											setcontent(optionsX);
										}}
										values=""></PGDropdown>
								</PanelRow>

								<div className="flex  my-5  justify-between items-center">
									<label className="" htmlFor="emailVerification">
										{__("Animation duration", "accordions")}
									</label>
									<PGinputText
										value={content?.options?.animationDuration}
										placeholder={"1000"}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid max-w-[400px]"
										onChange={(newVal) => {
											var optionsX = {
												...content,
												options: {
													...content?.options,
													animationDuration: newVal,
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
					<PanelBody title="Header & Labels" initialOpen={false}>
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
								<PGtab name="options">
									<div className="flex  my-5  justify-between items-center">
										<label className="" htmlFor="emailVerification">
											{__("Class", "accordions")}
										</label>
										<PGinputText
											value={header?.options?.class}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...header,
													options: {
														...header?.options,
														class: newVal,
													},
												};
												setheader(optionsX);
											}}
										/>
									</div>

									<PanelRow>
										<label htmlFor="" className="flex gap-2 items-center">
											Toggle Text
											<span
												className="cursor-pointer"
												title="Click to know more"
												onClick={() => {
													setHelp({
														id: "toggleTextSetting",
														enable: true,
													});
												}}>
												<Icon icon={help} />
											</span>
										</label>

										<InputToggle
											value={header?.options?.toggleText}
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
													...header,
													options: {
														...header?.options,
														toggleText: newVal,
													},
												};
												setheader(optionsX);
											}}
										/>
									</PanelRow>
								</PGtab>
								<PGtab name="styles">
									<PGStyles
										obj={header}
										onChange={(sudoScource, newVal, attr) =>
											onChangeStyle(
												sudoScource,
												newVal,
												attr,
												header,
												setheader
											)
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
										onBulkAdd={(sudoSource, cssObj) =>
											onBulkAddStyle(sudoSource, cssObj, header, setheader)
										}
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
											value={headerActive?.options?.class}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...headerActive,
													options: {
														...headerActive?.options,
														class: newVal,
													},
												};
												setheaderActive(optionsX);
											}}
										/>
									</div>
								</PGtab>
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
											onAddStyle(
												sudoScource,
												key,
												headerActive,
												setheaderActive
											)
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
										onBulkAdd={(sudoSource, cssObj) =>
											onBulkAddStyle(
												sudoSource,
												cssObj,
												headerActive,
												setheaderActive
											)
										}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>
						<PanelBody
							className="font-medium text-slate-900 "
							opened={isProFeature ? false : null}
							title={
								<span className="flex justify-between w-full gap-2">
									<span>{__("Header Label", "accordions")}</span>
									{isProFeature && (
										<span className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white ">
											{__("Pro", "accordions")}
										</span>
									)}
								</span>
							}
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
										isPro: customerData.isPro ? false : true,
										className: "tab-style",
									},
								]}>
								<PGtab name="options">
									<div className="flex  my-5  justify-between items-center">
										<label className="" htmlFor="emailVerification">
											{__("Class", "accordions")}
										</label>
										<PGinputText
											value={headerLabel?.options?.class}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...headerLabel,
													options: {
														...headerLabel?.options,
														class: newVal,
													},
												};
												setheaderLabel(optionsX);
											}}
										/>
									</div>
								</PGtab>
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
											onRemoveStyle(
												sudoScource,
												key,
												headerLabel,
												setheaderLabel
											)
										}
										onReset={(sudoSources) =>
											onResetStyle(sudoSources, headerLabel, setheaderLabel)
										}
										onBulkAdd={(sudoSource, cssObj) =>
											onBulkAddStyle(
												sudoSource,
												cssObj,
												headerLabel,
												setheaderLabel
											)
										}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>
						<PanelBody
							className="font-medium text-slate-900 "
							// title="Label Counter"
							opened={isProFeature ? false : null}
							title={
								<span className="flex justify-between w-full gap-2">
									<span>{__("Label Counter", "accordions")}</span>
									{isProFeature && (
										<span className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white ">
											{__("Pro", "accordions")}
										</span>
									)}
								</span>
							}
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
											{__("Counter position", "accordions")}
										</label>
										<SelectControl
											label=""
											value={labelCounter?.options?.position}
											options={[
												{
													label: __("Choose Position", "accordions"),
													value: "",
												},
												{ label: __("Left", "accordions"), value: "left" },
												{ label: __("Right", "accordions"), value: "right" },
												{
													label: __("Before Label Text", "accordions"),
													value: "beforeLabelText",
												},
												{
													label: __("After Label Text", "accordions"),
													value: "afterLabelText",
												},
											]}
											onChange={(newVal) => {
												var labelCounterX = { ...labelCounter };

												var optionsX = {
													...labelCounterX.options,
													position: newVal,
												};

												labelCounterX.options = optionsX;
												setlabelCounter(labelCounterX);
											}}
										/>
									</PanelRow>
									<div className="flex  my-5  justify-between items-center">
										<label className="" htmlFor="emailVerification">
											{__("Class", "accordions")}
										</label>
										<PGinputText
											value={labelCounter?.options?.class}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...labelCounter,
													options: {
														...labelCounter?.options,
														class: newVal,
													},
												};
												setlabelCounter(optionsX);
											}}
										/>
									</div>
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
											onAddStyle(
												sudoScource,
												key,
												labelCounter,
												setlabelCounter
											)
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
										onBulkAdd={(sudoSource, cssObj) =>
											onBulkAddStyle(
												sudoSource,
												cssObj,
												labelCounter,
												setlabelCounter
											)
										}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>
						<PanelBody
							className="font-medium text-slate-900 "
							// title="Label Icon"
							opened={isProFeature ? false : null}
							title={
								<span className="flex justify-between w-full gap-2">
									<span>{__("Label Icon", "accordions")}</span>
									{isProFeature ? (
										<span
											className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white "
											onClick={(ev) => {
												window.open(
													"https://comboblocks.com/pricing/",
													"_blank"
												);
											}}>
											{__("Pro", "accordions")}
										</span>
									) : (
										""
									)}
								</span>
							}
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
											{__("Choose Label Icon", "accordions")}
										</label>
										<PGIconPicker
											library={labelIcon?.options?.library}
											srcType={labelIcon?.options?.srcType}
											iconSrc={labelIcon?.options?.iconSrc}
											onChange={(arg) => {
												var labelIconX = { ...labelIcon };

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
											{__("Icon position", "accordions")}
										</label>
										<SelectControl
											label=""
											value={labelIcon?.options?.position}
											options={[
												{
													label: __("Choose Position", "accordions"),
													value: "",
												},
												{
													label: __("Before Label", "accordions"),
													value: "beforeLabel",
												},
												{
													label: __("After Label", "accordions"),
													value: "afterLabel",
												},
												{
													label: __("Before Label Text", "accordions"),
													value: "beforeLabelText",
												},
												{
													label: __("After Label Text", "accordions"),
													value: "afterLabelText",
												},
											]}
											onChange={(newVal) => {
												var labelIconX = { ...labelIcon };

												var optionsX = {
													...labelIconX.options,
													position: newVal,
												};

												labelIconX.options = optionsX;
												setlabelIcon(labelIconX);
											}}
										/>
									</PanelRow>
									<div className="flex  my-5  justify-between items-center">
										<label className="" htmlFor="emailVerification">
											{__("Class", "accordions")}
										</label>
										<PGinputText
											value={labelIcon?.options?.class}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...labelIcon,
													options: {
														...labelIcon?.options,
														class: newVal,
													},
												};
												setlabelIcon(optionsX);
											}}
										/>
									</div>
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
										onBulkAdd={(sudoSource, cssObj) =>
											onBulkAddStyle(
												sudoSource,
												cssObj,
												labelIcon,
												setlabelIcon
											)
										}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>
					</PanelBody>

					<PanelBody title="Icons" initialOpen={false}>
						<div className="flex flex-wrap gap-2  my-4">
							{iconsList.map((item, index) => {
								return (
									<div
										className="flex flex-col  border border-solid border-slate-300"
										key={index}
										onClick={() => handleClick(item)}>
										<span
											className={` flex items-center text-base justify-center p-2  ${item.icon}`}></span>
										<span
											className={` flex items-center text-base justify-center p-2  ${item.toggle}`}></span>
									</div>
								);
							})}
						</div>
						<PanelBody
							className="font-medium text-slate-900 "
							title={
								<span className="flex justify-between w-full gap-2">
									<span>{__("Icon Idle", "accordions")}</span>
									{isProFeature && (
										<span className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white ">
											{__("Pro", "accordions")}
										</span>
									)}
								</span>
							}
							opened={isProFeature ? false : null}
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
											{__("Choose Icon", "accordions")}
										</label>
										<PGIconPicker
											library={icon?.options?.library}
											srcType={icon?.options?.srcType}
											iconSrc={icon?.options?.iconSrc}
											onChange={(arg) => {
												var iconX = { ...icon };

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
											{__("Choose Toggle Icon", "accordions")}
										</label>
										<PGIconPicker
											library={iconToggle?.options?.library}
											srcType={iconToggle?.options?.srcType}
											iconSrc={iconToggle?.options?.iconSrc}
											onChange={(arg) => {
												var iconToggleX = { ...iconToggle };

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
											{__("Icon position", "accordions")}
										</label>
										<PGDropdown
											position="bottom right"
											variant="secondary"
											buttonTitle={__("Choose", "accordions")}
											options={[
												{
													label: __("Choose Position", "accordions"),
													value: "",
												},
												{ label: __("Left", "accordions"), value: "left" },
												{ label: __("Right", "accordions"), value: "right" },
											]}
											onChange={(newVal) => {
												var iconX = { ...icon };

												var optionsX = {
													...iconX.options,
													position: newVal.value,
												};

												iconX.options = optionsX;
												seticon(iconX);
											}}
											values=""></PGDropdown>
										{/* <SelectControl
											label=""
											value={icon?.options?.position}
											options={[
												{
													label: __("Choose Position", "accordions"),
													value: "",
												},
												{ label: __("Left", "accordions"), value: "left" },
												{ label: __("Right", "accordions"), value: "right" },
											]}
											onChange={(newVal) => {
												var iconX = { ...icon };

												var optionsX = {
													...iconX.options,
													position: newVal,
												};

												iconX.options = optionsX;
												seticon(iconX);
											}}
										/> */}
									</PanelRow>
									<div className="flex  my-5  justify-between items-center">
										<label className="" htmlFor="">
											{__("Class", "accordions")}
										</label>
										<PGinputText
											value={icon?.options?.class}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...icon,
													options: {
														...icon?.options,
														class: newVal,
													},
												};
												seticon(optionsX);
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
												popupEntranceAnimateBasic[icon?.options?.inAnimation] ==
													undefined
													? __("Choose", "accordions")
													: popupEntranceAnimateBasic[icon?.options?.inAnimation]
														.label
											}
											options={popupEntranceAnimateBasic}
											onChange={(newVal) => {
												var optionsX = {
													...icon,
													options: {
														...icon?.options,
														inAnimation: newVal.value,
													},
												};
												seticon(optionsX);
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
												popupCloseAnimateBasic[icon?.options?.outAnimation] ==
													undefined
													? __("Choose", "accordions")
													: popupCloseAnimateBasic[icon?.options?.outAnimation]
														.label
											}
											options={popupCloseAnimateBasic}
											onChange={(newVal) => {
												var optionsX = {
													...icon,
													options: {
														...icon?.options,
														outAnimation: newVal.value,
													},
												};
												seticon(optionsX);
											}}
											values=""></PGDropdown>
									</PanelRow>

									<div className="flex  my-5  justify-between items-center">
										<label className="" htmlFor="emailVerification">
											{__("Animation duration", "accordions")}
										</label>
										<PGinputText
											value={icon?.options?.animationDuration}
											placeholder={"1000"}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[200px]"
											onChange={(newVal) => {
												var optionsX = {
													...icon,
													options: {
														...icon?.options,
														animationDuration: newVal,
													},
												};
												setcontent(optionsX);
											}}
										/>
									</div>
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
										onBulkAdd={(sudoSource, cssObj) =>
											onBulkAddStyle(sudoSource, cssObj, icon, seticon)
										}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>
						<PanelBody
							className="font-medium text-slate-900 "
							title={
								<span className="flex justify-between w-full gap-2">
									<span>{__("Icon Toggle", "accordions")}</span>
									{isProFeature && (
										<span className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white ">
											{__("Pro", "accordions")}
										</span>
									)}
								</span>
							}
							opened={isProFeature ? false : null}
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
											value={iconToggle?.options?.class}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid max-w-[400px]"
											onChange={(newVal) => {
												var optionsX = {
													...iconToggle,
													options: {
														...iconToggle?.options,
														class: newVal,
													},
												};
												seticonToggle(optionsX);
											}}
										/>
									</div>
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
										onBulkAdd={(sudoSource, cssObj) =>
											onBulkAddStyle(
												sudoSource,
												cssObj,
												iconToggle,
												seticonToggle
											)
										}
									/>
								</PGtab>
							</PGtabs>
						</PanelBody>
					</PanelBody>

					<PanelBody
						className="font-medium text-slate-900 "
						opened={isProFeature ? false : null}
						title={
							<span className="flex justify-between w-full gap-2">
								<span>{__("Expand/Collapse All", "accordions")}</span>
								{isProFeature && (
									<span className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white ">
										{__("Pro", "accordions")}
									</span>
								)}
							</span>
						}
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
										value={expandCollapseAll?.options?.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid max-w-[400px]"
										onChange={(newVal) => {
											var optionsX = {
												...expandCollapseAll,
												options: {
													...expandCollapseAll?.options,
													class: newVal,
												},
											};
											setexpandCollapseAll(optionsX);
										}}
									/>
								</div>

								<PanelRow>
									<label htmlFor="" className="flex gap-2 items-center">
										Expand/collapse all
										<span
											className="cursor-pointer"
											title="Click to know more"
											onClick={() => {
												setHelp({
													id: "expandCollapseSetting",
													enable: true,
												});
											}}>
											<Icon icon={help} />
										</span>
									</label>

									<InputToggle
										value={expandCollapseAll?.options?.enable}
										onChange={(newVal) => {
											var expandCollapseAllX = {
												...expandCollapseAll,
												options: {
													...expandCollapseAll?.options,
													enable: newVal,
												},
											};
											setexpandCollapseAll(expandCollapseAllX);
										}}
									/>
								</PanelRow>
								{expandCollapseAll?.options?.enable == 1 && (
									<>
										<PanelRow>
											<label htmlFor="">Expand All Text</label>

											<PGinputText
												className="max-w-[140px]"
												label=""
												value={expandCollapseAll?.options?.expandAllText}
												onChange={(newVal) => {
													var expandCollapseAllX = {
														...expandCollapseAll,
														options: {
															...expandCollapseAll?.options,
															expandAllText: newVal,
														},
													};
													setexpandCollapseAll(expandCollapseAllX);
												}}
											/>
										</PanelRow>
										<PanelRow>
											<label htmlFor="">Collapse All Text</label>

											<PGinputText
												className="max-w-[140px]"
												label=""
												value={expandCollapseAll?.options?.collapseAllText}
												onChange={(newVal) => {
													var expandCollapseAllX = {
														...expandCollapseAll,
														options: {
															...expandCollapseAll?.options,
															collapseAllText: newVal,
														},
													};
													setexpandCollapseAll(expandCollapseAllX);
												}}
											/>
										</PanelRow>
										<PanelRow>
											<label htmlFor="">Expand/Collapse All Delay</label>

											<PGinputText
												className="max-w-[140px]"
												label=""
												value={expandCollapseAll?.options?.delay}
												onChange={(newVal) => {
													var expandCollapseAllX = {
														...expandCollapseAll,
														options: {
															...expandCollapseAll?.options,
															delay: newVal,
														},
													};
													setexpandCollapseAll(expandCollapseAllX);
												}}
											/>
										</PanelRow>

										<PanelRow>
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Expand All Icon", "accordions")}
											</label>
											<PGIconPicker
												library={
													expandCollapseAll?.options?.expandAllIcon?.library ??
													"fontAwesome"
												}
												srcType={
													expandCollapseAll?.options?.expandAllIcon?.srcType ??
													"class"
												}
												iconSrc={
													expandCollapseAll?.options?.expandAllIcon?.iconSrc ??
													"fas fa-plus"
												}
												onChange={(arg) => {
													var expandCollapseAllX = {
														...expandCollapseAll,
														options: {
															...expandCollapseAll?.options,
															expandAllIcon: arg,
														},
													};
													setexpandCollapseAll(expandCollapseAllX);
												}}
											/>
										</PanelRow>
										<PanelRow>
											<label htmlFor="" className="font-medium text-slate-900 ">
												{__("Collapse All Icon", "accordions")}
											</label>
											<PGIconPicker
												library={
													expandCollapseAll?.options?.collapseAllIcon?.library ??
													"fontAwesome"
												}
												srcType={
													expandCollapseAll?.options?.collapseAllIcon?.srcType ??
													"class"
												}
												iconSrc={
													expandCollapseAll?.options?.collapseAllIcon?.iconSrc ??
													"fas fa-minus"
												}
												onChange={(arg) => {
													var expandCollapseAllX = {
														...expandCollapseAll,
														options: {
															...expandCollapseAll?.options,
															collapseAllIcon: arg,
														},
													};
													setexpandCollapseAll(expandCollapseAllX);
												}}
											/>
										</PanelRow>
									</>
								)}
							</PGtab>
							<PGtab name="styles">
								<PGStyles
									obj={expandCollapseAll}
									onChange={(sudoScource, newVal, attr) =>
										onChangeStyle(
											sudoScource,
											newVal,
											attr,
											expandCollapseAll,
											setexpandCollapseAll
										)
									}
									onAdd={(sudoScource, key) =>
										onAddStyle(
											sudoScource,
											key,
											expandCollapseAll,
											setexpandCollapseAll
										)
									}
									onRemove={(sudoScource, key) =>
										onRemoveStyle(
											sudoScource,
											key,
											expandCollapseAll,
											setexpandCollapseAll
										)
									}
									onReset={(sudoSources) =>
										onResetStyle(
											sudoSources,
											expandCollapseAll,
											setexpandCollapseAll
										)
									}
									onBulkAdd={(sudoSource, cssObj) =>
										onBulkAddStyle(
											sudoSource,
											cssObj,
											expandCollapseAll,
											setexpandCollapseAll
										)
									}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>
					<PanelBody
						className="font-medium text-slate-900 "
						title={
							<span className="flex justify-between w-full gap-2">
								<span>{__("Top Wrap", "accordions")}</span>
								{isProFeature && (
									<span className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white ">
										{__("Pro", "accordions")}
									</span>
								)}
							</span>
						}
						opened={isProFeature ? false : null}
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
										value={topWrap?.options?.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid max-w-[400px]"
										onChange={(newVal) => {
											var optionsX = {
												...topWrap,
												options: {
													...topWrap?.options,
													class: newVal,
												},
											};
											settopWrap(optionsX);
										}}
									/>
								</div>
							</PGtab>
							<PGtab name="styles">
								<PGStyles
									obj={topWrap}
									onChange={(sudoScource, newVal, attr) =>
										onChangeStyle(
											sudoScource,
											newVal,
											attr,
											topWrap,
											settopWrap
										)
									}
									onAdd={(sudoScource, key) =>
										onAddStyle(sudoScource, key, topWrap, settopWrap)
									}
									onRemove={(sudoScource, key) =>
										onRemoveStyle(sudoScource, key, topWrap, settopWrap)
									}
									onReset={(sudoSources) =>
										onResetStyle(sudoSources, topWrap, settopWrap)
									}
									onBulkAdd={(sudoSource, cssObj) =>
										onBulkAddStyle(sudoSource, cssObj, topWrap, settopWrap)
									}
								/>
							</PGtab>
						</PGtabs>
					</PanelBody>

					<PanelBody
						initialOpen={false}
						title={
							<span className="flex justify-between w-full gap-2">
								<span>{__("Search", "accordions")}</span>
								{isProFeature && (
									<span className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white ">
										{__("Pro", "accordions")}
									</span>
								)}
							</span>
						}
						opened={isProFeature ? false : null}>
						<PanelRow className="my-5">
							<label htmlFor="" className="flex gap-2 items-center">
								Enable Search?
								<span
									className="cursor-pointer"
									title="Click to know more"
									onClick={() => {
										setHelp({
											id: "enableSearchSetting",
											enable: true,
										});
									}}>
									<Icon icon={help} />
								</span>
							</label>

							<InputToggle
								className="w-[140px]"
								label=""
								value={searchInput?.options?.enable}
								onChange={(newVal) => {
									var searchInputX = {
										...searchInput,
										options: { ...searchInput?.options, enable: newVal },
									};
									setsearchInput(searchInputX);
								}}
							/>
						</PanelRow>

						{searchInput?.options?.enable && (
							<PanelBody
								className="font-medium text-slate-900 "
								// title="Search Input"
								opened={isProFeature ? false : null}
								title={
									<span className="flex justify-between w-full gap-2">
										<span>{__("Search Input", "accordions")}</span>
										{isProFeature ? (
											<span
												className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white "
												onClick={(ev) => {
													window.open(
														"https://comboblocks.com/pricing/",
														"_blank"
													);
												}}>
												{__("Pro", "accordions")}
											</span>
										) : (
											""
										)}
									</span>
								}
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
												value={searchInput?.options?.class}
												className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid max-w-[400px]"
												onChange={(newVal) => {
													var optionsX = {
														...searchInput,
														options: {
															...searchInput?.options,
															class: newVal,
														},
													};
													setsearchInput(optionsX);
												}}
											/>
										</div>
										<div className="flex  my-5  justify-between items-center">
											<label className="" htmlFor="emailVerification">
												{__("Placeholder", "accordions")}
											</label>
											<PGinputText
												value={searchInput?.options?.placeholder}
												className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid max-w-[400px]"
												onChange={(newVal) => {
													var optionsX = {
														...searchInput,
														options: {
															...searchInput?.options,
															placeholder: newVal,
														},
													};
													setsearchInput(optionsX);
												}}
											/>
										</div>
									</PGtab>
									<PGtab name="styles">
										<PGStyles
											obj={searchInput}
											onChange={(sudoScource, newVal, attr) =>
												onChangeStyle(
													sudoScource,
													newVal,
													attr,
													searchInput,
													setsearchInput
												)
											}
											onAdd={(sudoScource, key) =>
												onAddStyle(
													sudoScource,
													key,
													searchInput,
													setsearchInput
												)
											}
											onRemove={(sudoScource, key) =>
												onRemoveStyle(
													sudoScource,
													key,
													searchInput,
													setsearchInput
												)
											}
											onReset={(sudoSources) =>
												onResetStyle(sudoSources, searchInput, setsearchInput)
											}
											onBulkAdd={(sudoSource, cssObj) =>
												onBulkAddStyle(
													sudoSource,
													cssObj,
													searchInput,
													setsearchInput
												)
											}
										/>
									</PGtab>
								</PGtabs>
							</PanelBody>
						)}
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

export default AccordionsEdit;
