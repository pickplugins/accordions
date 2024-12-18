const { Component, useState, useEffect } = wp.element;
import apiFetch from "@wordpress/api-fetch";

import { brush, category, columns } from "@wordpress/icons";

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

	return (
		<div className="pg-setting-input-text pg-dashboard">
			<div className="flex h-[800px]">
				<div className="w-[500px] overflow-y-scroll light-scrollbar">
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
