const { Component, RawHTML, useState, useEffect } = wp.element;
import { __ } from "@wordpress/i18n";
import { useSelect, select, useDispatch, dispatch } from "@wordpress/data";
import { store as coreStore } from "@wordpress/core-data";
import apiFetch from "@wordpress/api-fetch";

import {
	__experimentalInputControl as InputControl,
	Icon,
	PanelBody,
	PanelRow,
	SelectControl,
	ToggleControl,
	Popover,
} from "@wordpress/components";
import { brush, close, settings } from "@wordpress/icons";

import breakPoints from "../../breakpoints";
import PGDropdown from "../dropdown";
import PGStyles from "../styles";
import PGtab from "../tab";
import PGtabs from "../tabs";
import PGIconPicker from "../icon-picker";
import PGinputText from "../input-text";
import PGinputSelect from "../input-select";
import PGcssOpenaiPrompts from "../openai-prompts";

var myStore = wp.data.select("postgrid-shop");
import { RichText } from "@wordpress/block-editor";

function Html(props) {
	if (!props.warn) {
		return null;
	}

	var onChange = props.onChange;
	var getNotifications = props.getNotifications;

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
	var [content, setcontent] = useState(accordionData.content);
	var [accOptions, setaccOptions] = useState(accordionData.accOptions);
	var [header, setheader] = useState(accordionData.header);
	var [headerActive, setheaderActive] = useState(accordionData.headerActive);
	var [headerLabel, setheaderLabel] = useState(accordionData.headerLabel);
	var [labelCounter, setlabelCounter] = useState(accordionData.labelCounter);
	var [labelIcon, setlabelIcon] = useState(accordionData.labelIcon);
	var [icon, seticon] = useState(accordionData.icon);
	var [iconToggle, seticonToggle] = useState(accordionData.iconToggle);

	var [styleObj, setstyleObj] = useState({}); // Using the hook.
	const [taxonomiesObjects, setTaxonomiesObjects] = useState([]);

	const gapValue = accOptions?.gap || "0px";
	const [number, setNumber] = useState(parseInt(gapValue));
	const [unit, setUnit] = useState(gapValue.replace(number, ""));
	const [itemActive, setitemActive] = useState(99999);
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
			path: "/post-grid/v2/post_type_objects",
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

	useEffect(() => {
		var accordionDataX = { ...accordionData };
		accordionDataX.icon = icon;
		setaccordionData(accordionDataX);
	}, [icon]);

	useEffect(() => {
		var accordionDataX = { ...accordionData };
		accordionDataX.iconToggle = iconToggle;
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
			label: __("Taxonomy", "post-grid"),
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
		tabsVertical: { label: "Tabs Vertical", value: "tabsVertical" },
	};
	var itemSources = {
		manual: { label: "Manual", value: "manual" },
		posts: { label: "Posts", value: "posts", isPro: 0 },
		terms: { label: "Terms", value: "terms", isPro: 0 },
	};

	return (
		<div className="">
			{/* <div>{`{`}</div>
			<div>{`"wrapper":${JSON.stringify(wrapper)}`},</div>
			<div>{`"content":${JSON.stringify(content)}`},</div>
			<div>{`"header":${JSON.stringify(header)}`},</div>
			<div>{`"headerActive":${JSON.stringify(headerActive)}`},</div>
			<div>{`"headerLabel":${JSON.stringify(headerLabel)}`},</div>
			<div>{`"labelCounter":${JSON.stringify(labelCounter)}`},</div>
			<div>{`"labelIcon":${JSON.stringify(labelIcon)}`},</div>
			<div>{`"icon":${JSON.stringify(icon)}`},</div>
			<div>{`"iconToggle":${JSON.stringify(iconToggle)}`},</div>
			<div>{`}`}</div> */}

			{props.postData.post_content != null && (
				<>
					<div className="my-4 p-3">
						<PanelRow>
							<label htmlFor="">View Type?</label>
							<PGDropdown
								position="bottom right"
								variant="secondary"
								buttonTitle={viewTypeArgs[globalOptions.viewType]?.label}
								options={viewTypeArgs}
								onChange={(option, index) => {
									var globalOptionsX = { ...globalOptions };
									globalOptionsX.viewType = option.value;
									setglobalOptions(globalOptionsX);
								}}
								values=""></PGDropdown>
						</PanelRow>
					</div>

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
										globalOptions.itemSource == undefined
											? "Item Source"
											: itemSources[globalOptions.itemSource]?.label
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
										<PGDropdown
											position="bottom right"
											variant="secondary"
											buttonTitle={"Add Query"}
											options={postQueryArgs}
											onChange={(option, index) => {
												console.log(option);

												var itemQueryArgsX = [...itemQueryArgs];
												itemQueryArgsX.push({
													id: option.id,
													value: option.value,
												});
												setitemQueryArgs(itemQueryArgsX);
											}}
											values=""></PGDropdown>
									</>
								)}
								{globalOptions?.itemSource == "terms" && (
									<>
										<PGDropdown
											position="bottom right"
											variant="secondary"
											buttonTitle={"Add Query"}
											options={termQueryArgs}
											onChange={(option, index) => {
												console.log(option);

												var itemQueryArgsX = [...itemQueryArgs];
												itemQueryArgsX.push({
													id: option.id,
													value: option.value,
												});
												setitemQueryArgs(itemQueryArgsX);
											}}
											values=""></PGDropdown>
									</>
								)}

								{globalOptions?.itemSource == "manual" && (
									<>
										<div
											className="bg-slate-700 text-white px-5 py-2 rounded-sm cursor-pointer hover:bg-slate-600"
											onClick={(ev) => {
												var itemsX = [...items];

												itemsX.push({
													active: 0,
													hideOnSchema: 0,
													headerLabel: {
														options: {
															text: "Accordion Header",
															toggledText: "Accordion Header Toggled",
															slug: "",
															tag: "",
															class: "accordion-header-label",
														},
													},
													content: {
														options: {
															tag: "",
															class: "accordion-content",
															text: "Accordion content",
														},
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
												});
												setitems(itemsX);

												getNotifications({
													content: "Item Added",
													type: "success",
												});
											}}>
											Add New
										</div>
										<div
											className="cursor-pointer py-2 px-4 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
											onClick={(ev) => {
												ev.preventDefault();
												ev.stopPropagation();
												setAIWriter(!AIWriter);
											}}>
											AI
											{AIWriter && (
												<Popover position="bottom right">
													<div className="w-[800px] p-3">
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
																}
																if (action == "append") {
																	valueObj.map((item) => {
																		var answer = item.answer;
																		var question = item.question;
																	});
																}
																if (action == "replace") {
																	var blocksX = [];

																	valueObj.map((item) => {
																		var answer = item.answer;
																		var question = item.question;
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
								{JSON.stringify(itemQueryArgs)}

								{itemQueryArgs?.map((item, index) => {
									return (
										<div key={index} className="my-4">
											{item.id == "postType" && (
												<div>
													<label htmlFor="">Post Type</label>
													<PGinputSelect
														val={item.value}
														options={postTypes}
														multiple={true}
														onChange={(newVal) => {
															updatePostQueryArgs(newVal, index);
														}}
													/>
												</div>
											)}
											{item.id == "postStatus" && (
												<div
													className={item.id == "postStatus" ? "" : "hidden"}>
													<label htmlFor="">Post Status</label>
													<PGinputSelect
														val={item.value}
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
															updatePostQueryArgs(newVal, index);
														}}
													/>
												</div>
											)}
											{item.id == "order" && (
												<div className={item.id == "order" ? "" : "hidden"}>
													<label htmlFor="">Order</label>
													<SelectControl
														style={{ margin: 0 }}
														label=""
														value={item.value}
														options={[
															{ label: "Ascending", value: "ASC" },
															{ label: "Descending", value: "DESC" },
														]}
														onChange={(newVal) =>
															updatePostQueryArgs(newVal, index)
														}
													/>
												</div>
											)}
											{item.id == "orderby" && (
												<div className={item.id == "orderby" ? "" : "hidden"}>
													<label htmlFor="">Order By</label>
													<PGinputSelect
														val={item.value}
														options={[
															{ label: __("None", "post-grid"), value: "none" },
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
															updatePostQueryArgs(newVal, index);
														}}
													/>
												</div>
											)}
											{item.id == "metaKey" && (
												<div>
													<label htmlFor="">Meta Key</label>
													<InputControl
														value={item.value}
														onChange={(newVal) => {
															updatePostQueryArgs(newVal, index);
														}}
													/>
												</div>
											)}
											{item.id == "metaValue" && (
												<div>
													<label htmlFor="">Meta Value</label>
													<InputControl
														value={item.value}
														onChange={(newVal) => {
															updatePostQueryArgs(newVal, index);
														}}
													/>
												</div>
											)}
											{item.id == "metaValueNum" && (
												<div>
													<label htmlFor="">Meta Value Number</label>
													<InputControl
														value={item.value}
														onChange={(newVal) => {
															updatePostQueryArgs(newVal, index);
														}}
													/>
												</div>
											)}
											{item.id == "s" && (
												<div>
													<label htmlFor="">Keyword</label>
													<InputControl
														value={item.value}
														onChange={(newVal) => {
															updatePostQueryArgs(newVal, index);
														}}
													/>
												</div>
											)}
											{item.id == "metaCompare" && (
												<div>
													<label htmlFor="">Meta Compare</label>
													<SelectControl
														style={{ margin: 0 }}
														label=""
														value={item.value}
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
															updatePostQueryArgs(newVal, index);
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
								{JSON.stringify(itemQueryArgs)}

								{itemQueryArgs?.map((item, index) => {
									return (
										<div key={index} className="my-4">
											{item.id == "taxonomy" && (
												<div>
													<label htmlFor="">Taxonomy</label>
													<PGinputSelect
														val={item.value}
														options={taxonomiesObjects}
														multiple={true}
														onChange={(newVal) => {
															var itemQueryArgsX = [...itemQueryArgs];
															itemQueryArgsX[index].value = newVal;
															setitemQueryArgs(itemQueryArgsX);

															//updatePostQueryArgs(newVal, index);
														}}
													/>
												</div>
											)}
											{item.id == "orderby" && (
												<div className={item.id == "orderby" ? "" : "hidden"}>
													<label htmlFor="">Order By</label>
													<SelectControl
														value={item.value}
														options={[
															{ label: __("None", "post-grid"), value: "none" },
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
															updateTermQueryArgs(newVal, index);
														}}
													/>
												</div>
											)}
											{item.id == "order" && (
												<div className={item.id == "order" ? "" : "hidden"}>
													<label htmlFor="">Order</label>
													<SelectControl
														style={{ margin: 0 }}
														label=""
														value={item.value}
														options={[
															{ label: "Ascending", value: "ASC" },
															{ label: "Descending", value: "DESC" },
														]}
														onChange={(newVal) =>
															updateTermQueryArgs(newVal, index)
														}
													/>
												</div>
											)}
											{item.id == "number" && (
												<div className={item.id == "number" ? "" : "hidden"}>
													<label htmlFor="">Number</label>
													<InputControl
														value={item.value}
														type="number"
														onChange={(newVal) => {
															updateTermQueryArgs(newVal, index);
														}}
													/>
												</div>
											)}
											{item.id == "include" && (
												<div className={item.id == "include" ? "" : "hidden"}>
													<label htmlFor="">Include</label>
													<InputControl
														value={item.value}
														type="text"
														onChange={(newVal) => {
															updateTermQueryArgs(newVal, index);
														}}
													/>
												</div>
											)}
											{item.id == "exclude" && (
												<div className={item.id == "exclude" ? "" : "hidden"}>
													<label htmlFor="">Exclude</label>
													<InputControl
														value={item.value}
														type="text"
														onChange={(newVal) => {
															updateTermQueryArgs(newVal, index);
														}}
													/>
												</div>
											)}
											{item.id == "child_of" && (
												<div className={item.id == "child_of" ? "" : "hidden"}>
													<label htmlFor="">Child Of</label>
													<InputControl
														value={item.value}
														type="text"
														onChange={(newVal) => {
															updateTermQueryArgs(newVal, index);
														}}
													/>
												</div>
											)}
											{item.id == "parent" && (
												<div className={item.id == "parent" ? "" : "hidden"}>
													<label htmlFor="">Parent</label>
													<InputControl
														value={item.value}
														type="text"
														onChange={(newVal) => {
															updateTermQueryArgs(newVal, index);
														}}
													/>
												</div>
											)}
											{item.id == "meta_key" && (
												<div className={item.id == "meta_key" ? "" : "hidden"}>
													<label htmlFor="">Meta Key</label>
													<InputControl
														value={item.value}
														type="text"
														onChange={(newVal) => {
															updateTermQueryArgs(newVal, index);
														}}
													/>
												</div>
											)}
											{item.id == "meta_value" && (
												<div
													className={item.id == "meta_value" ? "" : "hidden"}>
													<label htmlFor="">Meta Value</label>
													<InputControl
														value={item.value}
														type="text"
														onChange={(newVal) => {
															updateTermQueryArgs(newVal, index);
														}}
													/>
												</div>
											)}
											{item.id == "hide_empty" && (
												<div>
													<ToggleControl
														label={termQueryArgs[item.id].label}
														help={
															item.value
																? "Hide Empty Enabled"
																: "Hide Empty Disabled"
														}
														checked={item.value ? true : false}
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

						{globalOptions?.itemSource == "manual" && (
							<div>
								{items?.map((item, index) => {
									return (
										<>
											<div className="">
												<div
													className="bg-slate-300 flex justify-between items-center p-3 py-2 my-2 cursor-pointer hover:bg-slate-400"
													onClick={(ev) => {
														setitemActive(index == itemActive ? 999 : index);
													}}>
													<div>{item?.headerLabel.options.text}</div>

													<span
														className="cursor-pointer hover:bg-red-500 hover:text-white "
														onClick={(ev) => {
															ev.stopPropagation();
															var itemsX = [...items];

															itemsX.splice(index, 1);
															setitems(itemsX);
														}}>
														<Icon icon={close} />
													</span>
												</div>

												{itemActive == index && (
													<div className="py-2 w-full">
														<div className="mb-3">
															<RichText
																className="bg-slate-100 p-3 "
																tagName={"div"}
																value={item?.headerLabel.options.text}
																allowedFormats={[
																	"core/bold",
																	"core/italic",
																	"core/link",
																]}
																onChange={(content) => {
																	var itemsX = [...items];

																	itemsX[index].headerLabel.options.text =
																		content;
																	setitems(itemsX);
																}}
																placeholder={""}
															/>
														</div>
														<div className="mb-3">
															<RichText
																className={`bg-slate-100 p-3 min-h-24`}
																tagName={"div"}
																value={item?.content.options.text}
																allowedFormats={[
																	"core/bold",
																	"core/italic",
																	"core/link",
																]}
																onChange={(content) => {
																	var itemsX = [...items];

																	itemsX[index].content.options.text = content;
																	setitems(itemsX);
																	//setsearchPrams({ ...searchPrams, content: content });
																}}
																placeholder={"Write details"}
															/>
														</div>
														<div className="mb-3">
															<PanelRow>
																<label htmlFor="">Active</label>
																<SelectControl
																	label=""
																	value={globalOptions?.active}
																	options={[
																		{
																			label: __("True", "post-grid"),
																			value: 1,
																		},
																		{
																			label: __("False", "post-grid"),
																			value: 0,
																		},
																	]}
																	onChange={(newVal) => {
																		var itemsX = [...items];

																		itemsX[index].active = newVal;
																		setitems(itemsX);
																	}}
																/>
															</PanelRow>
														</div>
														<div className="mb-3">
															<PanelRow>
																<label htmlFor="">Enable lazyLoad</label>
																<SelectControl
																	label=""
																	value={globalOptions?.hideOnSchema}
																	options={[
																		{
																			label: __("True", "post-grid"),
																			value: 1,
																		},
																		{
																			label: __("False", "post-grid"),
																			value: 0,
																		},
																	]}
																	onChange={(newVal) => {
																		var itemsX = [...items];

																		itemsX[index].hideOnSchema = newVal;
																		setitems(itemsX);
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
							</div>
						)}
					</PanelBody>

					<PanelBody
						className="font-medium text-slate-900 "
						title="Accordion Settings"
						initialOpen={false}>
						<PGtab name="normal">
							<PanelRow>
								<label htmlFor="">Enable lazyLoad</label>
								<SelectControl
									label=""
									value={globalOptions?.lazyLoad}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => {
										var globalOptionsX = { ...globalOptions };
										globalOptionsX.lazyLoad = newVal;
										setglobalOptions(globalOptionsX);
									}}
								/>
							</PanelRow>
							<PanelRow>
								<label htmlFor="">Enable Autoembed</label>
								<SelectControl
									label=""
									value={globalOptions?.autoembed}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => {
										var globalOptionsX = { ...globalOptions };
										globalOptionsX.autoembed = newVal;
										setglobalOptions(globalOptionsX);
									}}
								/>
							</PanelRow>

							<PanelRow>
								<label htmlFor="">Enable Shortcodes</label>

								<SelectControl
									label=""
									value={globalOptions?.shortcodes}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => {
										var globalOptionsX = { ...globalOptions };
										globalOptionsX.shortcodes = newVal;
										setglobalOptions(globalOptionsX);
									}}
								/>
							</PanelRow>
							<PanelRow>
								<label htmlFor="">Enable wpautop</label>

								<SelectControl
									label=""
									value={globalOptions?.wpautop}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => {
										var globalOptionsX = { ...globalOptions };
										globalOptionsX.wpautop = newVal;
										setglobalOptions(globalOptionsX);
									}}
								/>
							</PanelRow>
							<PanelRow>
								<label htmlFor="">Enable Schema</label>

								<SelectControl
									label=""
									value={globalOptions?.schema}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => {
										var globalOptionsX = { ...globalOptions };
										globalOptionsX.schema = newVal;
										setglobalOptions(globalOptionsX);
									}}
								/>
							</PanelRow>
							<PanelRow>
								<label htmlFor="">Enable Toggle Text</label>

								<SelectControl
									label=""
									value={globalOptions?.toggleText}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => {
										var globalOptionsX = { ...globalOptions };
										globalOptionsX.toggleText = newVal;
										setglobalOptions(globalOptionsX);
									}}
								/>
							</PanelRow>
							<PanelRow>
								<label htmlFor="">Enable expand/collapse all</label>

								<SelectControl
									label=""
									value={globalOptions?.expandCollapseAll}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => {
										var globalOptionsX = { ...globalOptions };
										globalOptionsX.expandCollapseAll = newVal;
										setglobalOptions(globalOptionsX);
									}}
								/>
							</PanelRow>
							<PanelRow>
								<label htmlFor="">Expand All Text</label>

								<PGinputText
									label=""
									value={globalOptions?.expandAllText}
									onChange={(newVal) => {
										var globalOptionsX = { ...globalOptions };
										globalOptionsX.expandAllText = "";
										setglobalOptions(globalOptionsX);
									}}
								/>
							</PanelRow>
							<PanelRow>
								<label htmlFor="">Collapse All Text</label>

								<PGinputText
									label=""
									value={globalOptions?.collapseAllText}
									onChange={(newVal) => {
										var globalOptionsX = { ...globalOptions };
										globalOptionsX.collapseAllText = newVal;
										setglobalOptions(globalOptionsX);
									}}
								/>
							</PanelRow>
							<PanelRow>
								<label htmlFor="">Enable Stats</label>

								<SelectControl
									label=""
									value={globalOptions?.stats}
									options={[
										{ label: __("True", "post-grid"), value: 1 },
										{ label: __("False", "post-grid"), value: 0 },
									]}
									onChange={(newVal) => {
										var globalOptionsX = { ...globalOptions };
										globalOptionsX.stats = newVal;
										setglobalOptions(globalOptionsX);
									}}
								/>
							</PanelRow>

							<PanelRow>
								<label htmlFor="">Active Event</label>

								<SelectControl
									label=""
									value={globalOptions?.activeEvent}
									options={[
										{ label: __("Click", "post-grid"), value: "click" },
										{ label: __("Mouseover", "post-grid"), value: "mouseover" },
										{ label: __("Focus", "post-grid"), value: "focus" },
									]}
									onChange={(newVal) => {
										var globalOptionsX = { ...globalOptions };
										globalOptionsX.activeEvent = newVal;
										setglobalOptions(globalOptionsX);
									}}
								/>
							</PanelRow>
							<PanelRow>
								<label htmlFor="">Enable URL Hash</label>
								<SelectControl
									label=""
									value={globalOptions?.urlHash}
									options={[
										{ label: __("Click", "post-grid"), value: "click" },
										{ label: __("Mouseover", "post-grid"), value: "mouseover" },
										{ label: __("Focus", "post-grid"), value: "focus" },
									]}
									onChange={(newVal) => {
										var globalOptionsX = { ...globalOptions };
										globalOptionsX.urlHash = newVal;
										setglobalOptions(globalOptionsX);
									}}
								/>
							</PanelRow>
							<PanelRow>
								<label htmlFor="">Click To Scroll Top</label>
								<SelectControl
									label=""
									value={globalOptions?.clickToScrollTop}
									options={[
										{ label: __("Click", "post-grid"), value: "click" },
										{ label: __("Mouseover", "post-grid"), value: "mouseover" },
										{ label: __("Focus", "post-grid"), value: "focus" },
									]}
									onChange={(newVal) => {
										var globalOptionsX = { ...globalOptions };
										globalOptionsX.clickToScrollTop = newVal;
										setglobalOptions(globalOptionsX);
									}}
								/>
							</PanelRow>
							<PanelRow>
								<label htmlFor="">Click To Scroll Top Offset</label>
								<PGinputText
									label=""
									value={globalOptions?.clickToScrollTopOffset}
									onChange={(newVal) => {
										var globalOptionsX = { ...globalOptions };
										globalOptionsX.clickToScrollTopOffset = newVal;
										setglobalOptions(globalOptionsX);
									}}
								/>
							</PanelRow>
							<PanelRow>
								<label htmlFor="">Animation Name</label>
								<SelectControl
									label=""
									value={globalOptions?.animationName}
									options={[
										{ label: __("Click", "post-grid"), value: "click" },
										{ label: __("Mouseover", "post-grid"), value: "mouseover" },
										{ label: __("Focus", "post-grid"), value: "focus" },
									]}
									onChange={(newVal) => {
										var globalOptionsX = { ...globalOptions };
										globalOptionsX.animationName = newVal;
										setglobalOptions(globalOptionsX);
									}}
								/>
							</PanelRow>
							<PanelRow>
								<label htmlFor="">Animation delay</label>
								<PGinputText
									label=""
									value={globalOptions?.animationDelay}
									onChange={(newVal) => {
										var globalOptionsX = { ...globalOptions };
										globalOptionsX.animationDelay = newVal;
										setglobalOptions(globalOptionsX);
									}}
								/>
							</PanelRow>
						</PGtab>
						<div></div>
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
										value={wrapper.options.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
										onChange={(newVal) => {
											var optionsX = {
												...wrapper,
												options: {
													...wrapper.options,
													class: newVal.target.value,
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
										value={content.options.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
										onChange={(newVal) => {
											var optionsX = {
												...content,
												options: {
													...content.options,
													class: newVal.target.value,
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
							<PGtab name="options">
								{JSON.stringify(header.options.class)}

								<div className="flex  my-5  justify-between items-center">
									<label className="" htmlFor="emailVerification">
										{__("Class", "accordions")}
									</label>
									<PGinputText
										value={header.options.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
										onChange={(newVal) => {
											var optionsX = {
												...header,
												options: {
													...header.options,
													class: newVal.target.value,
												},
											};
											setheader(optionsX);
										}}
									/>
								</div>
							</PGtab>
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
									onBulkAdd={(sudoSource, cssObj) =>
										onBulkAddStyle(sudoSource, cssObj, header, setheader)
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
							<PGtab name="options">
								<div className="flex  my-5  justify-between items-center">
									<label className="" htmlFor="emailVerification">
										{__("Class", "accordions")}
									</label>
									<PGinputText
										value={headerActive.options.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
										onChange={(newVal) => {
											var optionsX = {
												...headerActive,
												options: {
													...headerActive.options,
													class: newVal.target.value,
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
							<PGtab name="options">
								<div className="flex  my-5  justify-between items-center">
									<label className="" htmlFor="emailVerification">
										{__("Class", "accordions")}
									</label>
									<PGinputText
										value={headerLabel.options.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
										onChange={(newVal) => {
											var optionsX = {
												...headerLabel,
												options: {
													...headerLabel.options,
													class: newVal.target.value,
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
										onRemoveStyle(sudoScource, key, headerLabel, setheaderLabel)
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
										value={labelCounter.options.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
										onChange={(newVal) => {
											var optionsX = {
												...labelCounter,
												options: {
													...labelCounter.options,
													class: newVal.target.value,
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
										value={labelIcon.options.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
										onChange={(newVal) => {
											var optionsX = {
												...labelIcon,
												options: {
													...labelIcon.options,
													class: newVal.target.value,
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
										onBulkAddStyle(sudoSource, cssObj, labelIcon, setlabelIcon)
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
										{__("Choose Toggle Icon", "post-grid")}
									</label>
									<PGIconPicker
										library={iconToggle.options.library}
										srcType={iconToggle.options.srcType}
										iconSrc={iconToggle.options.iconSrc}
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
											var iconX = { ...icon };

											var optionsX = {
												...iconX.options,
												position: newVal,
											};

											iconX.options = optionsX;
											seticon(iconX);
										}}
									/>
								</PanelRow>
								<div className="flex  my-5  justify-between items-center">
									<label className="" htmlFor="emailVerification">
										{__("Class", "accordions")}
									</label>
									<PGinputText
										value={icon.options.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
										onChange={(newVal) => {
											var optionsX = {
												...icon,
												options: {
													...icon.options,
													class: newVal.target.value,
												},
											};
											seticon(optionsX);
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
								<div className="flex  my-5  justify-between items-center">
									<label className="" htmlFor="emailVerification">
										{__("Class", "accordions")}
									</label>
									<PGinputText
										value={iconToggle.options.class}
										className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-full max-w-[400px]"
										onChange={(newVal) => {
											var optionsX = {
												...iconToggle,
												options: {
													...iconToggle.options,
													class: newVal.target.value,
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
		var { onChange, postData, getNotifications } = this.props;

		return (
			<Html
				onChange={onChange}
				getNotifications={getNotifications}
				postData={postData}
				warn={this.state.showWarning}
				isLoaded={this.state.isLoaded}
			/>
		);
	}
}

export default AccordionsEdit;



































