const { Component, useState, useEffect } = wp.element;
import apiFetch from "@wordpress/api-fetch";

import { brush, category, columns } from "@wordpress/icons";

import accordionDefaultData from "./accordion-default-data";
import tabsDefaultData from "./tabs-default-data";
import accordionTemplates from "./accordion-templates";
import AccordionsEdit from "../../components/accordions-edit";
import AccordionsView from "../../components/accordions-view";
import PGtab from "../../components/tab";
import PGtabs from "../../components/tabs";
import WCPSList from "../../components/wcps-list";

function Html(props) {
	if (!props.warn) {
		return null;
	}



	var [activeAccordion, setActiveAccordion] = useState(null); // Using the hook.
	var [postData, setpostData] = useState({ ID: 125777, post_content: accordionDefaultData, post_title: "" }); // Using the hook.
	var [accordionData, setaccordionData] = useState(postData.post_content); // Using the hook.

	var [isLoading, setisLoading] = useState(false); // Using the hook.







	function selectAccordion(args) {
		setActiveAccordion(args);
	}

	function onChangeAccordion(args) {


		var postDataX = { ...postData }
		postDataX.post_content = args
		setpostData(postDataX);
	}

	useEffect(() => {
		setisLoading(true);

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
			setaccordionData(res.post_content)

		});
	}, [activeAccordion]);

	useEffect(() => {

	}, [accordionData]);









	// ! hello
	return (
		<div className="pg-setting-input-text pg-dashboard">
			<div className="flex ">
				<div className="w-[450px] overflow-y-scroll light-scrollbar">
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
									selectAccordion={selectAccordion}
									activeAccordion={activeAccordion}
								/>
							</div>
						</PGtab>
						<PGtab name="edit">
							<div className=" ">
								<AccordionsEdit
									onChange={onChangeAccordion}
									postData={postData}
								/>
							</div>
						</PGtab>
						<PGtab name="templates">
							<div className="p-3">


								{accordionTemplates.map((preset) => {

									return (
										<div onClick={ev => {
											var data = preset.data
											var presetClean = {};


											Object.entries(data).map(item => {
												var itemIndex = item[0]
												var itemArg = item[1]

												if (itemArg.options) {
													delete itemArg.options
												}

												presetClean[itemIndex] = { ...accordionData[itemIndex], ...itemArg };



											})


											var accordionDataX = { ...accordionData, presetClean }
											onChangeAccordion(accordionDataX)

										}}>{preset.label}</div>
									)

								})}

							</div>
						</PGtab>
					</PGtabs>
				</div>
				<div className="w-full sticky top-0">
					<div className="  relative">

						<AccordionsView isLoading={isLoading} onChange={onChangeAccordion} postData={postData} id={activeAccordion} />





					</div>
				</div>
			</div>
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
