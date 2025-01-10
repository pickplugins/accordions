const { Component, useState, useEffect } = wp.element;
import apiFetch from "@wordpress/api-fetch";
import { __ } from "@wordpress/i18n";

import { Popover, Spinner, PanelRow } from "@wordpress/components";
import {
	Icon,
	brush,
	category,
	cog,
	columns,
	close,
	help as helpIcon,
} from "@wordpress/icons";
import PGinputSelect from "../input-select";
import PGinputText from "../input-text";
import PGDropdown from "../dropdown";

import ImageAccordionEdit from "../../components/edit-image-accordion";
import TabsEdit from "../../components/edit-tabs";
import AccordionsEdit from "../../components/accordions-edit";
import AccordionsGuide from "../../components/accordions-guide";
import AccordionsView from "../../components/accordions-view";

import PGtab from "../../components/tab";

import PGtabs from "../../components/tabs";
import AccordionsList from "../../components/accordions-list";
import accordionDefaultData from "./accordion-default-data";
import tabsDefaultData from "./tabs-default-data";
import imageAccordionDefaultData from "./image-accordion-default-data";
import accordionMenuDefaultData from "./accordion-menu-default-data";
import AccordionsTemplates from "./templates";
import AccordionsGenerateCss from "./generate-css";
import PGHelp from "./help";
import PGNotify from "./notify";

function Html(props) {
	if (!props.warn) {
		return null;
	}

	var isProFeature = true;


	var [activeAccordion, setActiveAccordion] = useState(null);
	var [postData, setpostData] = useState({
		ID: null,
		post_content: {},
		post_title: "",
	});
	var [accordionData, setaccordionData] = useState(postData?.post_content);
	var [globalOptions, setglobalOptions] = useState(accordionData.globalOptions); // Using the hook.

	var [isLoading, setisLoading] = useState(false);
	var [pleaseUpdate, setpleaseUpdate] = useState(false);
	const [optionData, setoptionData] = useState({});
	const [roles, setroles] = useState([]);
	var [needSave, setneedSave] = useState(false);
	var [toggleSettings, settoggleSettings] = useState(false);

	var [notifications, setnotifications] = useState([]);
	var [help, sethelp] = useState({ id: "", enable: false });
	var [customerData, setcustomerData] = useState({ id: "", isPro: false });
	var [isProFeature, setisProFeature] = useState(true);

	var viewTypeArgs = {
		accordion: { label: "Accordion", value: "accordion" },
		tabs: { label: "Tabs", value: "tabs" },
		imageAccordion: { label: "Image Accordion", value: "imageAccordion" },
		// accordionMenu: { label: "Accordion Menu", value: "accordionMenu", coming: true },
	};

	useEffect(() => {

		setaccordionData(postData.post_content);
		//setglobalOptions(postData.post_content.globalOptions);
	}, [postData]);

	useEffect(() => {


		//setglobalOptions(accordionData.globalOptions);
	}, [accordionData]);


	useEffect(() => {



		if (globalOptions?.viewType == "accordion") {
			setpostData({ ...postData, post_content: accordionDefaultData })
		}
		if (globalOptions?.viewType == "tabs") {
			setpostData({ ...postData, post_content: tabsDefaultData })
		}

	}, [globalOptions]);

	useEffect(() => {
		setisLoading(true);

		if (activeAccordion == null) return;

		apiFetch({
			path: "/accordions/v2/accordions_data",
			method: "POST",
			data: {
				postId: activeAccordion,
				_wpnonce: accordions_builder_js._wpnonce,
			},
		}).then((res) => {
			setisLoading(false);

			console.log(res.post_content);


			if (res.post_content == null) {
				res.post_content = accordionDefaultData;
			}

			setpostData(res);
		});
	}, [activeAccordion]);




	useEffect(() => {
		setnotifications(notifications);


		const timer = setTimeout(() => {
			setnotifications([]); // Update the debounced value after delay
		}, 5000); // 300ms debounce delay

		return () => clearTimeout(timer); // Cleanup timer on value change or unmount
	}, [notifications]);


	useEffect(() => {

		if (customerData.isPro) {
			setisProFeature(false)
		}

	}, [customerData]);








	function handleAlertConfirmation() {
		if (confirm("Are you sure you want to reset the option data?")) {
			resetOptionData();
		}
	}

	function resetOptionData() {
		setoptionData(optionDataDefault);
	}

	function updateOption() {
		setisLoading(true);
		apiFetch({
			path: "/accordions/v2/update_options",
			method: "POST",
			data: { name: "accordions_settings", value: optionData },
		}).then((res) => {
			setisLoading(false);
			if (res.status) {
				setneedSave(false);
			}
		});
	}

	function addNotifications(notification) {
		var notificationsX = [...notifications];
		notificationsX.push(notification);
		setnotifications(notificationsX);
	}
	function setHelp(helpX) {
		sethelp(helpX);
	}

	function selectAccordion(args) {
		setActiveAccordion(args);
	}
	function onChangeStyle(args) {
		var accordionDataX = { ...accordionData };

		console.log(escapeHTML(args));


		accordionDataX.reponsiveCss = escapeHTML(args);
		//accordionDataX.reponsiveCss = (args);
		setaccordionData(accordionDataX);
	}

	function onChangeAccordion(args) {



		var postDataX = { ...postData };
		postDataX.post_content = args;
		setpostData(postDataX);

		setaccordionData(args);

		setpleaseUpdate(true);
	}

	function onUpdateAccordion() {
		setisLoading(true);

		console.log(accordionData);


		var content = accordionData;
		//content = JSON.stringify(content);

		console.log(content);


		apiFetch({
			path: "/accordions/v2/update_post_data",
			method: "POST",
			data: {
				postId: activeAccordion,
				content: content,
				_wpnonce: accordions_builder_js._wpnonce,
			},
		}).then((res) => {
			setisLoading(false);
			setpleaseUpdate(false);
			addNotifications({
				title: "Accordion Saved!",
				content: "You change successfully saved!.",
				type: "success",
			});
		});
	}



	useEffect(() => {
		apiFetch({
			path: "/accordions/v2/user_roles_list",
			method: "POST",
			data: {},
		}).then((res) => {
			var rolesX = [];
			Object.entries(res?.roles).map((role) => {
				var index = role[0];
				var val = role[1];
				rolesX.push({ label: val, value: index });
			});

			setroles(rolesX);
		});
	}, []);

	useEffect(() => {
		setisLoading(true);
		apiFetch({
			path: "/accordions/v2/get_options",
			method: "POST",
			data: { option: "accordions_settings" },
		}).then((res) => {
			if (res.length != 0) {
				var resX = { ...res };
				if (resX?.license_key.length > 0) {
					setcustomerData({ ...customerData, isPro: true })
				}

				setoptionData(resX);
			}
			setisLoading(false);
		});
	}, []);


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








	return (
		<div className="pg-setting-input-text pg-dashboard">
			<div className="flex h-[800px]">
				<div className="w-[500px] overflow-y-scroll light-scrollbar">
					<div className="flex items-center justify-between bg-blue-700 py-3 px-3">
						<div>
							<div className="flex items-center align-middle gap-3">
								<div className="text-xl text-white">Accordions</div>
								<div className="text-xs text-white flex items-center gap-2">
									{/* <span>2.3.5</span>{" "} */}
									<span className="bg-lime-600 px-3 py-1 rounded-md">Beta</span>
								</div>
							</div>
							<div className="text-sm text-white">By PickPlugins</div>
						</div>

						<div>


							<div
								className={`py-1 px-2 cursor-pointer  capitalize  text-white font-medium rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700 ${toggleSettings ? "bg-gray-800" : "bg-gray-500"}`}
								onClick={(ev) => {
									settoggleSettings(!toggleSettings)
								}}>

								{isLoading && (
									<Spinner />
								)}
								{!isLoading && (
									<>
										{toggleSettings && (<Icon fill={"#fff"} icon={close} />)}
										{!toggleSettings && (<Icon fill={"#fff"} icon={cog} />)}
									</>
								)}




							</div>








						</div>
					</div>

					{toggleSettings && (
						<>
							<div className="relative bg-white">


								<div className="px-4 py-2 bg-slate-400 text-white  ">
									<div className="text-xl text-white mb-4">
										Accordions Settings
									</div>

									<div className="flex gap-2 items-center">
										<div
											className="bg-amber-500 rounded-sm text-md p-2 px-4 cursor-pointer pg-font text-white "
											onClick={(ev) => {
												handleAlertConfirmation();
											}}>
											{__("Reset", "accordions")}
										</div>
										<div
											className="bg-green-700 rounded-sm text-md p-2 px-4 cursor-pointer pg-font text-white flex items-center"
											onClick={(ev) => {
												updateOption();
											}}>
											<span>{__("Save", "accordions")}</span>
											{needSave && (
												<span className="w-5 inline-block h-5 ml-3 rounded-xl text-center bg-red-500">
													!
												</span>
											)}
										</div>
									</div>
								</div>

								<div className="p-3">
									<div className="my-5">
										<label className=" text-base" htmlFor="">
											{__("Allow access by roles", "accordions")}
										</label>
										<PGinputSelect
											val={optionData?.user_roles ?? []}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[250px]"
											options={roles}
											onChange={(newVal) => {
												var optionsX = {
													...optionData,
													user_roles: newVal,
												};
												setoptionData(optionsX);
											}}
											multiple={true}
										/>
									</div>
									<div className="my-5">
										<label className="text-base" htmlFor="">
											{__("Font-awesome version", "accordions")}
										</label>
										<PGinputSelect
											val={optionData?.font_aw_version ?? "none"}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[250px]"
											options={[
												{ label: "None", value: "none" },
												{ label: "Version 4+", value: "v_4" },
												{ label: "Version 5+", value: "v_5" },
											]}
											onChange={(newVal) => {
												var optionsX = {
													...optionData,
													font_aw_version: newVal,
												};
												setoptionData(optionsX);
											}}
											multiple={false}
										/>
									</div>
									<div className="my-5">
										<label className="text-base" htmlFor="">
											{__("Allow Iframe on accordion", "accordions")}
										</label>
										<PGinputSelect
											val={optionData?.allow_iframe ?? "no"}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[250px]"
											options={[
												{ label: "No", value: "no" },
												{ label: "Yes", value: "yes" },
											]}
											onChange={(newVal) => {
												var optionsX = {
													...optionData,
													allow_iframe: newVal,
												};
												setoptionData(optionsX);
											}}
											multiple={false}
										/>
									</div>
									<div className="my-5">
										<label className="text-base" htmlFor="">
											{__("Enable accordions preview", "accordions")}
										</label>
										<PGinputSelect
											val={optionData?.accordions_preview ?? "no"}
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[250px]"
											options={[
												{ label: "No", value: "no" },
												{ label: "Yes", value: "yes" },
											]}
											onChange={(newVal) => {
												var optionsX = {
													...optionData,
													accordions_preview: newVal,
												};
												setoptionData(optionsX);
											}}
											multiple={false}
										/>
									</div>
									<div className="my-5">
										<label className="text-base" htmlFor="">
											{__("Open AI API Key", "accordions")}
										</label>

										<PGinputText
											label=""
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[250px]"
											value={optionData?.openaiApiKey ?? ""}
											onChange={(newVal) => {
												var optionsX = {
													...optionData,
													openaiApiKey: newVal,
												};
												setoptionData(optionsX);
											}}
										/>
									</div>
									<div className="my-5">
										<div className="text-base" htmlFor="">
											{__("License Key", "accordions")}
										</div>

										<PGinputText
											label=""
											className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[250px]"
											value={optionData?.license_key ?? ""}
											onChange={(newVal) => {
												var optionsX = {
													...optionData,
													license_key: newVal,
												};
												setoptionData(optionsX);
											}}
										/>
									</div>
								</div>
							</div>

						</>
					)}

					{!toggleSettings && (
						<>
							<PGtabs
								activeTab="accordions"
								orientation=""
								stickyNavs={true}
								contentClass=" bg-white w-full"
								navItemClass="bg-gray-200 px-5 py-3 gap-2 grow "
								navItemLabelClass="flex-col "
								navItemSelectedClass="!bg-white"
								activeClass="active-tab"
								onSelect={(tabName) => { }}
								tabs={[
									{
										name: "accordions",
										title: "Accordions",
										icon: columns,
										className: "tab-disable-blocks",
									},
									{
										name: "edit",
										title: "Edit",
										icon: brush,
										className: "tab-disable-blocks",
									},
									{
										name: "templates",
										title: "Templates",
										icon: category,
										className: "tab-disable-blocks",
									},
								]}>
								<PGtab name="accordions">
									<div className="relative p-3">
										{postData?.post_content == null && (
											<div className="p-3 my-5 bg-orange-400">
												Please choose an accordion first.
											</div>
										)}

										<AccordionsList
											addNotifications={addNotifications}
											selectAccordion={selectAccordion}
											activeAccordion={activeAccordion}
											setHelp={setHelp}
										/>
									</div>
								</PGtab>
								<PGtab name="edit">


									{postData?.ID == null && (
										<div className="py-3">
											<div className="my-3 bg-orange-400 p-3  text-white  text-center animate__animated animate__flash animate__repeat-2">Please select post from list.</div>
										</div>
									)}

									<div className=" ">
										{postData?.ID != null && (
											<>

												<div className="my-4 p-3">
													<PanelRow>
														<label htmlFor="">View Type?</label>
														<PGDropdown
															position="bottom right"
															variant="secondary"
															buttonTitle={postData?.post_content?.globalOptions?.viewType ? viewTypeArgs[postData?.post_content?.globalOptions?.viewType]?.label : "Choose"}
															options={viewTypeArgs}
															onChange={(option, index) => {
																if (confirm("Data will reset, Please confirm?")) {
																	if (option.value == "accordion") {
																		setpostData({ ...postData, post_content: accordionDefaultData })

																	}
																	if (option.value == "tabs") {
																		setpostData({ ...postData, post_content: tabsDefaultData })
																	}
																	if (option.value == "imageAccordion") {
																		setpostData({ ...postData, post_content: imageAccordionDefaultData })
																	}
																	if (option.value == "accordionMenu") {
																		setpostData({ ...postData, post_content: accordionMenuDefaultData })
																	}

																}




															}}
															values=""></PGDropdown>
													</PanelRow>
												</div>





												{postData.post_content.globalOptions?.viewType == "accordion" && (
													<AccordionsEdit
														onChange={onChangeAccordion}
														addNotifications={addNotifications}
														postData={postData}
														customerData={customerData}
														setHelp={setHelp}
													/>
												)}
												{postData.post_content.globalOptions?.viewType == "tabs" && (
													<TabsEdit
														onChange={onChangeAccordion}
														addNotifications={addNotifications}
														postData={postData}
														customerData={customerData}
														setHelp={setHelp}
													/>
												)}
												{postData.post_content.globalOptions?.viewType == "imageAccordion" && (
													<ImageAccordionEdit
														onChange={onChangeAccordion}
														addNotifications={addNotifications}
														postData={postData}
														customerData={customerData}
														setHelp={setHelp}
													/>
												)}
												{/* {postData.post_content.globalOptions?.viewType == "accordionMenu" && (
													<ImageAccordionEdit
														onChange={onChangeAccordion}
														addNotifications={addNotifications}
														postData={postData}
														customerData={customerData}
														setHelp={setHelp}
													/>
												)} */}






											</>
										)}




									</div>
								</PGtab>
								<PGtab name="templates">

									{postData?.ID == null && (
										<div className="py-3">
											<div className="my-3 bg-orange-400 p-3  text-white  text-center animate__animated animate__flash animate__repeat-2">Please select post from list.</div>
										</div>
									)}

									<AccordionsTemplates
										onChange={onChangeAccordion}
										addNotifications={addNotifications}
										postData={postData}
										customerData={customerData}
										setHelp={setHelp}
									/>
								</PGtab>
							</PGtabs>
						</>
					)}


				</div>
				<div className="w-full sticky top-0 overflow-y-scroll">
					<div className="  relative">

						<div className="my-3 hidden bg-orange-400 p-3 ml-5 text-white  text-center animate__animated animate__flash animate__repeat-2">


							<div className="text-xl">
								<i class="fa-solid fa-triangle-exclamation"></i> Please test the Accordions Builder and <span className="font-bold cursor-pointer underline" onClick={(ev) => {
									settoggleSettings(!toggleSettings)
								}}>send us feedbacks.</span>
							</div>
							<div>Please do not use for old accordion, we will add migration later.</div>

						</div>

						{(postData?.ID == null || toggleSettings) && <AccordionsGuide addNotifications={addNotifications} customerData={customerData}
						/>}

						{(!toggleSettings && postData?.ID != null) && (
							<AccordionsView
								pleaseUpdate={pleaseUpdate}
								onUpdate={onUpdateAccordion}
								isLoading={isLoading}
								onChange={onChangeAccordion}
								postData={postData}
								id={activeAccordion}
								addNotifications={addNotifications}
								setHelp={setHelp}
							/>
						)}

						{postData?.ID != null && (
							<AccordionsGenerateCss
								postData={postData}
								onChange={onChangeStyle}
							/>
						)}
					</div>
				</div>
			</div>



			<PGNotify notifications={notifications} />
			<PGHelp help={help} />
		</div>
	);
}

class PGDashboard extends Component {
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
		var { onChange, setEnable } = this.props;

		return <Html setEnable={setEnable} warn={this.state.showWarning} />;
	}
}

export default PGDashboard;
