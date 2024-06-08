const { Component, useState, useEffect } = wp.element;
import apiFetch from '@wordpress/api-fetch';

import {
	Icon,
	styles,
	close,
	plus,
	key,
	check,
	typography,
	textColor,
	lockSmall,
	category,
	atSymbol,
	settings,
	upload,
	color,
	plusCircle,
	download,
	arrowRight,
	brush,
	code,
} from "@wordpress/icons";


import PGtabs from "../../components/tabs";
import PGtab from "../../components/tab";
import AccordionsList from "../../components/accordions";
import AccordionsView from "../../components/accordions-view";
import AccordionsEdit from "../../components/accordions-edit";



function Html(props) {
	if (!props.warn) {
		return null;
	}

	var [activeAccordion, setActiveAccordion] = useState(null); // Using the hook.
	var [postData, setpostData] = useState(null); // Using the hook.
	var [isLoading, setisLoading] = useState(false); // Using the hook.


	function selectAccordion(args) {

		console.log(args);
		setActiveAccordion(args)
	}


	function onChangeAccordion(args) {

		console.log(args);
		//setaccordionData(args)
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

			console.log(res);


			setpostData(res);

		});






	}, [activeAccordion]);




	var optionDataDefault = {
		customFonts: [],
		googleFonts: [],
		container: { width: "1150px" },
		breakpoints: [],
		colors: [],
		editor: { width: "1150px" },
		blocks: { disabled: [] },
		addons: { disabled: [] },
		blockInserter: { postGridPositon: "" }, // Category positon
		openAI: { apiKey: "" },
		keyframes: {},
		license: { license_key: { key: "" } },
		globalStyles: [],
		customScript: [],
		postTypes: [
			{
				labels: {
					name: "post types",
					singular_name: "",
					menu_name: "",
					all_items: "",
					add_new: "",
					add_new_item: "",
					edit: "",
					edit_item: "",
					new_item: "",
					view: "",
					view_item: "",
					search_items: "",
					not_found: "",
					not_found_in_trash: "",
					parent: "",
				},
				description: "",
				public: false,
				show_ui: true,
				show_in_rest: false,
				capability_type: "post",
				capabilities: {
					publish_posts: "",
					edit_posts: "",
					edit_others_posts: "",
					read_private_posts: "",
					edit_post: "",
					delete_post: "",
					read_post: "",
				},
				map_meta_cap: true,
				publicly_queryable: true,
				exclude_from_search: false,
				hierarchical: false,
				query_var: true,
				supports: ["title"],
				show_in_nav_menus: true,
				menu_icon: "",
				show_in_menu: "",
			},
		],
		apiKeys: {},
		pageStyles: [],
	};






	// ! hello
	return (
		<div className="pg-setting-input-text pg-dashboard">

			<div className="flex ">

				<div className="w-[400px]">
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
								icon: category,
								className: "tab-disable-blocks",
							},
							{
								name: "edit",
								title: "Edit",
								icon: category,
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
							<div className="relative p-5">
								<AccordionsList selectAccordion={selectAccordion} activeAccordion={activeAccordion} />
							</div>
						</PGtab>
						<PGtab name="edit">
							<div className=" ">
								<AccordionsEdit onChange={onChangeAccordion} accordionData={postData} />
							</div>
						</PGtab>
						<PGtab name="templates">
							<div className=" ">
								templates
							</div>
						</PGtab>











					</PGtabs>

				</div>
				<div className="w-full">
					<div className="  relative">
						<AccordionsView id={activeAccordion} />
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
