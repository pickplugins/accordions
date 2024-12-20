const { Component, useState, useEffect } = wp.element;
import apiFetch from "@wordpress/api-fetch";
import { __ } from "@wordpress/i18n";

import { Icon, close, cog, addCard, brush, category, columns } from "@wordpress/icons";
import { Popover, Spinner } from "@wordpress/components";
import PGinputSelect from "../input-select";
import PGinputText from "../input-text";

import AccordionsGuide from "../../components/accordions-guide";
import AccordionsEdit from "../../components/accordions-edit";
import AccordionsView from "../../components/accordions-view";
import PGtab from "../../components/tab";
import PGtabs from "../../components/tabs";
import WCPSList from "../../components/wcps-list";
import accordionDefaultData from "./accordion-default-data";
import accordionTemplates from "./accordion-templates";
import AccordionsGenerateCss from "./generate-css";
import PGNotify from "./notify";

function Html(props) {
	if (!props.warn) {
		return null;
	}

	var [activeAccordion, setActiveAccordion] = useState(null); // Using the hook.
	var [postData, setpostData] = useState({
		ID: null,
		post_content: accordionDefaultData,
		post_title: "",
	}); // Using the hook.
	var [accordionData, setaccordionData] = useState(postData.post_content); // Using the hook.

	var [debounce, setdebounce] = useState(0); // Using the hook.
	var [isLoading, setisLoading] = useState(false); // Using the hook.
	var [pleaseUpdate, setpleaseUpdate] = useState(false); // Using the hook.
	var [AIWriter, setAIWriter] = useState(false); // Using the hook.
	const [optionData, setoptionData] = useState({});
	const [optionDataSaved, setoptionDataSaved] = useState({});
	const [roles, setroles] = useState([]);
	var [needSave, setneedSave] = useState(false); // Using the hook.
	var [isLoadings, setisLoadings] = useState(false); // Using the hook.

	var [notifications, setnotifications] = useState([]); // Using the hook.

	useEffect(() => {
		setnotifications(notifications);

		// setTimeout(() => {
		// 	setnotifications([]);
		// }, 5000);

		const timer = setTimeout(() => {
			setnotifications([]); // Update the debounced value after delay
		}, 5000); // 300ms debounce delay

		return () => clearTimeout(timer); // Cleanup timer on value change or unmount

	}, [notifications]);


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
				setoptionDataSaved(optionData);
				setneedSave(false);
			}
		});
	}

	function addNotifications(notification) {
		var notificationsX = [...notifications];
		notificationsX.push(notification);
		setnotifications(notificationsX);
	}

	function selectAccordion(args) {
		setActiveAccordion(args);
	}
	function onChangeStyle(args) {

		var accordionDataX = { ...accordionData };
		accordionDataX.reponsiveCss = args;
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

		apiFetch({
			path: "/accordions/v2/update_post_data",
			method: "POST",
			data: {
				postId: activeAccordion,
				content: accordionData,
				_wpnonce: post_grid_editor_js._wpnonce,
			},
		}).then((res) => {
			setisLoading(false);
			setpleaseUpdate(false);
			addNotifications({ title: "Accordion Saved!", content: "You change successfully saved!.", type: "success" })

		});
	}

	useEffect(() => {
		setisLoading(true);

		if (activeAccordion == null) return;

		apiFetch({
			path: "/accordions/v2/accordions_data",
			method: "POST",
			data: {
				postId: activeAccordion,
				_wpnonce: post_grid_editor_js._wpnonce,
			},
		}).then((res) => {
			setisLoading(false);
			if (res?.post_content?.length == 0) {
				res.post_content = accordionDefaultData;
			}

			setpostData(res);
			setaccordionData(res.post_content);
		});
	}, [activeAccordion]);



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
		setisLoadings(true);
		apiFetch({
			path: "/accordions/v2/get_options",
			method: "POST",
			data: { option: "accordions_settings" },
		}).then((res) => {
			if (res.length != 0) {
				var resX = { ...res };

				setoptionDataSaved(resX);
				setoptionData(resX);
			}
			setisLoadings(false);
		});
	}, []);

	return (
		<div className="pg-setting-input-text pg-dashboard">
			<div className="flex h-[800px]">
				<div className="w-[500px] overflow-y-scroll light-scrollbar">

					<div className="flex items-center justify-between bg-blue-700 py-3 px-3">
						<div>
							<div className="flex items-center align-middle gap-3">

								<div className="text-xl text-white">Accordions</div>
								<div className="text-xs text-white">2.3.1</div>
							</div>
							<div className="text-sm text-white">By PickPlugins</div>
						</div>

						<div>
							<div className=" tracking-wide ">
								<div
									className="py-1 px-2 cursor-pointer  capitalize bg-gray-700 text-white font-medium rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
									onClick={(ev) => {
										ev.preventDefault();
										ev.stopPropagation();
										setAIWriter(!AIWriter);
									}}>
									{" "}
									<Icon fill={"#fff"} icon={cog} />
								</div>
								{AIWriter && (
									<Popover position="bottom right">
										<div className="w-[600px]  relative">


											{/* <span
										className="cursor-pointer px-1 bg-red-500 hover:bg-red-700 hover:text-white absolute top-0 right-0"
										onClick={(ev) => {
											ev.preventDefault();
											ev.stopPropagation();
											setAIWriter(!AIWriter);
										}}>
										<Icon fill={"#fff"} icon={close} />
									</span> */}

											<div className="px-4 py-2 bg-slate-400 text-white flex justify-between ">
												<div className="text-xl text-white">Accordions Settings</div>

												<div className="flex gap-2 items-center">
													<div
														className="bg-amber-500 rounded-sm text-md p-2 px-4 cursor-pointer pg-font text-white "
														onClick={(ev) => {
															// resetOptionData();
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
												<div className="flex  my-5  justify-between items-center">
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
												<div className="flex  my-5  justify-between items-center">
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
												<div className="flex  my-5  justify-between items-center">
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
												<div className="flex  my-5  justify-between items-center">
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
												<div className="flex  my-5  justify-between items-center">
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
												<div className="flex  my-5  justify-between items-center">
													<label className="text-base" htmlFor="">
														{__("License Key", "accordions")}
													</label>

													<PGinputText
														label=""
														className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[250px]"

														value={optionData?.licenseKey ?? ""}
														onChange={(newVal) => {
															var optionsX = {
																...optionData,
																licenseKey: newVal,
															};
															setoptionData(optionsX);
														}}
													/>
												</div>
											</div>
										</div>
									</Popover>
								)}
							</div>

						</div>
					</div>

					<PGtabs
						activeTab="accordions"
						orientation=""
						contentClass=" bg-white w-full"
						navItemClass="bg-gray-200 px-5 py-3 gap-2"
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
								{postData.post_content == null && (
									<div className="p-3 my-5 bg-orange-400">
										Please choose an accordion first.
									</div>
								)}

								<WCPSList
									addNotifications={addNotifications}
									selectAccordion={selectAccordion}
									activeAccordion={activeAccordion}
								/>
							</div>
						</PGtab>
						<PGtab name="edit">
							<div className=" ">
								{postData.ID != null && (
									<AccordionsEdit
										onChange={onChangeAccordion}
										addNotifications={addNotifications}
										postData={postData}
									/>
								)}
							</div>
						</PGtab>
						<PGtab name="templates">
							<div className="p-3">
								{accordionTemplates.map((preset, index) => {
									return (
										<div
											className="my-5 bg-slate-400 hover:bg-slate-500 p-3 rounded-sm cursor-pointer"
											key={index}
											onClick={(ev) => {
												var data = preset.data;
												var presetClean = {};

												Object.entries(data).map((item) => {
													var itemIndex = item[0];
													var itemArg = item[1];

													if (itemArg.options) {
														delete itemArg.options;
													}

													presetClean[itemIndex] = {
														...accordionData[itemIndex],
														...itemArg,
													};
												});

												var accordionDataX = {
													...accordionData,
													...presetClean,
												};

												onChangeAccordion(accordionDataX);

												addNotifications({ title: "Preset Applied", content: "WOW, Your accordion just got new look!", type: "success" })

											}}>
											<img className="w-full" src={preset.thumb} alt="" />
											<div className="text-lg mt-3 text-white">
												{preset.label}
											</div>
										</div>
									);
								})}
							</div>
						</PGtab>
					</PGtabs>
				</div>
				<div className="w-full sticky top-0 overflow-y-scroll">
					<div className="  relative">



						{postData.ID == null && (
							<AccordionsGuide

							/>
						)}
						{postData.ID != null && (
							<AccordionsView
								pleaseUpdate={pleaseUpdate}
								onUpdate={onUpdateAccordion}
								isLoading={isLoading}
								onChange={onChangeAccordion}
								postData={postData}
								id={activeAccordion}
								addNotifications={addNotifications}
							/>
						)}
						{postData.ID != null && (
							<AccordionsGenerateCss
								postData={postData}
								onChange={onChangeStyle}
							/>
						)}

						{JSON.stringify(notifications)}
					</div>
				</div>
			</div>

			<PGNotify notifications={notifications} />
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
