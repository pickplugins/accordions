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
import PGinputText from "../input-text";

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



	var [globalOptions, setglobalOptions] = useState(accordionData.globalOptions); // Using the hook.
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




	useEffect(() => {
		onChange(accordionData)

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

	var viewTypeArgs = {
		accordion: { label: "Accordion", value: "accordion" },
		// tabs: { label: "Tabs", value: "tabs" },
		// tabsVertical: { label: "Tabs Vertical", value: "tabsVertical" },
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
							<label for="">View Type?</label>
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
						title="Accordion Settings"
						initialOpen={false}>
						<PGtab name="normal">

							<PanelRow>
								<label for="">Enable lazyLoad</label>
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
								<label for="">Enable Autoembed</label>
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
								<label for="">Enable Shortcodes</label>

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
								<label for="">Enable wpautop</label>

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
								<label for="">Enable Schema</label>

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
										onBulkAddStyle(sudoSource, cssObj, headerActive, setheaderActive)
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
										onBulkAddStyle(sudoSource, cssObj, headerLabel, setheaderLabel)
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
										onBulkAddStyle(sudoSource, cssObj, labelCounter, setlabelCounter)
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
										onBulkAddStyle(sudoSource, cssObj, iconToggle, seticonToggle)
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