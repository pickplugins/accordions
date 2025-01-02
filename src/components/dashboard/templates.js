
const { Component, RawHTML, useState, useEffect } = wp.element;
import { RichText } from '@wordpress/block-editor'
import { __ } from "@wordpress/i18n";

import {
	Icon, settings, cloud, plus, post, close,
	help as helpIcon,
} from "@wordpress/icons";
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



	var addNotifications = props.addNotifications;
	var onChange = props.onChange;

	var [postData, setpostData] = useState(props.postData); // Using the hook.
	var [accordionData, setaccordionData] = useState(postData.post_content); // Using the hook.


	var [templates, settemplates] = useState([]); // Using the hook.
	const [queryLayouts, setQueryLayouts] = useState({
		keyword: "",
		price: "",
		viewType: postData.post_content.globalOptions.viewType == undefined ? "accordion" : postData.post_content.globalOptions.viewType,
		page: 1,
	});



	useEffect(() => {

		var requestData = {
			keyword: queryLayouts.keyword,
			page: queryLayouts.page,
			price: queryLayouts.price,
			viewType: queryLayouts.viewType,
		};
		requestData = JSON.stringify(requestData);
		fetch(
			"https://pickplugins.com/demo/accordions/wp-json/accordions/v2/get_posts_accordions",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json;charset=utf-8",
				},
				body: requestData,
			}
		)
			.then((response) => {
				if (response.ok && response.status < 400) {
					response.json().then((data) => {

						var posts = data.posts;

						var postsX = [];

						posts.map(item => {

							postsX.push({

								label: item.post_title,
								thumb: "https://pickplugins.com/wp-content/uploads/2024/12/accoridons-template-1.png",
								isPro: item?.is_pro == "yes" ? true : false,
								data: item.post_content
							})

							settemplates(postsX);

						})


					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});


	}, []);


	var isProFeature = true;





	return (
		<div className="ml-5">
			<div className="p-3">
				<p className="flex items-center gap-2">
					How templates work.
					<span
						className="cursor-pointer"
						title="Click to know more"
						onClick={() => {
							setHelp({
								id: "accordionTemplatesHelp",
								enable: true,
							});
						}}>
						<Icon icon={helpIcon} />
					</span>
				</p>







				{postData.post_content.globalOptions?.viewType == "accordion" && (
					<>
						{templates.map((preset, index) => {
							return (
								<div
									className="my-5 bg-slate-400 hover:bg-slate-500 p-3 rounded-sm cursor-pointer"
									title="Click To Apply"
									key={index}
									onClick={(ev) => {

										if (preset.isPro) {

											if (isProFeature) {
												addNotifications({
													title: "Opps its pro!",
													content: "This feature only avilable in premium version",
													type: "error",
												});
												return;

											}

										}

										addNotifications({
											title: "Preset Applied",
											content: "WOW, Your accordion just got new look!",
											type: "success",
										});


										var data = preset.data;
										data = JSON.parse(data)

										var presetClean = {};

										Object.entries(data).map((item) => {
											var itemIndex = item[0];
											var itemArg = item[1];


											if (itemArg.options != undefined) {
												delete itemArg.options;
											}
											if (accordionData[itemIndex]) {
												delete accordionData[itemIndex]?.styles;
												delete accordionData[itemIndex]?.hover;
												delete accordionData[itemIndex]?.after;
												delete accordionData[itemIndex]?.before;
												delete accordionData[itemIndex]?.active;
												delete accordionData[itemIndex]?.focus;
												delete accordionData[itemIndex]?.target;
												delete accordionData[itemIndex]?.visited;
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



										onChange(accordionDataX);

										addNotifications({
											title: "Preset Applied",
											content: "WOW, Your accordion just got new look!",
											type: "success",
										});
									}}>
									<img className="w-full" src={preset.thumb} alt="" />
									<div className="mt-3 flex justify-between  items-center">
										<span className="text-lg  text-white ">{preset.label}</span>

										{preset.isPro && (

											<>

												{isProFeature && (
													<span
														className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white "
													>
														{__("Pro", "accordions")}
													</span>
												)}
											</>

										)}





									</div>
								</div>
							);
						})}
					</>
				)}


				{postData.post_content.globalOptions?.viewType == "tabs" && (
					<>
						{templates.map((preset, index) => {
							return (
								<div
									className="my-5 bg-slate-400 hover:bg-slate-500 p-3 rounded-sm cursor-pointer"
									title="Click To Apply"
									key={index}
									onClick={(ev) => {

										if (preset.isPro) {

											if (isProFeature) {
												addNotifications({
													title: "Opps its pro!",
													content: "This feature only avilable in premium version",
													type: "error",
												});
												return;

											}

										}

										addNotifications({
											title: "Preset Applied",
											content: "WOW, Your accordion just got new look!",
											type: "success",
										});


										var data = preset.data;
										var presetClean = {};

										Object.entries(data).map((item) => {
											var itemIndex = item[0];
											var itemArg = item[1];



											if (itemArg.options != undefined) {
												delete itemArg.options;
											}
											if (accordionData[itemIndex]) {
												delete accordionData[itemIndex]?.styles;
												delete accordionData[itemIndex]?.hover;
												delete accordionData[itemIndex]?.after;
												delete accordionData[itemIndex]?.before;
												delete accordionData[itemIndex]?.active;
												delete accordionData[itemIndex]?.focus;
												delete accordionData[itemIndex]?.target;
												delete accordionData[itemIndex]?.visited;
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




										onChange(accordionDataX);

										addNotifications({
											title: "Preset Applied",
											content: "WOW, Your accordion just got new look!",
											type: "success",
										});
									}}>
									<img className="w-full" src={preset.thumb} alt="" />
									<div className="mt-3 flex justify-between  items-center">
										<span className="text-lg  text-white ">{preset.label}</span>

										{preset.isPro && (

											<>

												{isProFeature && (
													<span
														className="bg-amber-500 px-2 py-1  no-underline rounded-sm  cursor-pointer text-white "
													>
														{__("Pro", "accordions")}
													</span>
												)}
											</>

										)}





									</div>
								</div>
							);
						})}
					</>
				)}




			</div>

		</div>
	);
}

class AccordionsTemplates extends Component {
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
		var { postData, onChange, addNotifications } = this.props;

		return (
			<Html
				postData={postData}
				onChange={onChange}
				addNotifications={addNotifications}
				warn={this.state.showWarning}
			/>
		);
	}
}

export default AccordionsTemplates;
