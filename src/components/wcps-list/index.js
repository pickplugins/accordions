

const { Component, RawHTML, useState, useEffect } = wp.element;

import { ReactSortable } from "react-sortablejs";
import { PanelBody, RangeControl, Button, ButtonGroup, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, Spinner, CustomSelectControl, Popover, __experimentalInputControl as InputControl, } from '@wordpress/components'
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
	addCard,
	help,
} from "@wordpress/icons";

var myStore = wp.data.select('postgrid-shop');
import PGinputText from "../input-text";



function Html(props) {

	if (!props.warn) {
		return null;
	}

	var isLoaded = props.isLoaded;
	var selectAccordion = props.selectAccordion;
	var activeAccordion = props.activeAccordion;
	var addNotifications = props.addNotifications;
	var setHelp = props.setHelp;





	var [searchPrams, setsearchPrams] = useState({ search: "" }); // Using the hook.
	var [posts, setPosts] = useState(null); // Using the hook.
	var [pagination, setPagination] = useState({ currentPage: 1 }); // Using the hook.
	var [dataLoaded, setdataLoaded] = useState(false); // Using the hook.
	var [isLoading, setisLoading] = useState(false); // Using the hook.








	var queryArgs = [
		{
			"id": "postType",
			"val": [
				"accordions"
			]
		},
		{
			"id": "postStatus",
			"val": [
				"any"
			]
		},
		{
			"id": "s",
			"val": ""
		},
		{
			"id": "order",
			"val": "DESC"
		},
		{
			"id": "orderby",
			"val": [
				"date"
			]
		},
		{
			"id": "postsPerPage",
			"val": "20"
		},
		{
			"id": "paged",
			"val": "1"
		}
	]


	function Prev() {

	}

	useEffect(() => {

		setisLoading(true);

		queryArgs.map(item => {

			var id = item.id;

			if (id == "paged") {
				item.val = pagination.currentPage;
			}
			if (id == "s") {
				item.val = searchPrams.search;
			}



		})





		apiFetch({
			path: "/accordions/v2/accordions_list",
			method: "POST",
			data: {
				queryArgs: queryArgs,
				_wpnonce: post_grid_editor_js._wpnonce,

			},
		}).then((res) => {

			setisLoading(false);

			setPosts(res.posts);
			addNotifications({ title: "Accordions Loaded", content: "All Accordions loaded, Now click to pick one to edit.", type: "success" })


		});






	}, [isLoaded, pagination.currentPage, searchPrams.search]);




	function create_post() {


		setisLoading(true);
		apiFetch({
			path: "/accordions/v2/create_post",
			method: "POST",
			data: { postTitle: searchPrams.search, },
		}).then((res) => {
			console.log(res);

			if (res.error) {
				addNotifications({
					title: "There is an Error!",
					content: res.errorMessage,
					type: "error",
				});
			}
			if (res.success) {
				posts.unshift({ ID: res.id, post_content: "", post_author: 0, post_title: searchPrams.search });
				addNotifications({
					title: "Accordion Create!",
					content: res.successMessage,
					type: "success",
				});
			}



			setisLoading(false);
			if (res.status) {
			}
		});
	}








	return (
		<div className="">
			{isLoading && (
				<div className=" text-center ">
					<Spinner />
				</div>
			)}

			<div className="my-4 flex items-center gap-3">
				<PGinputText
					value={searchPrams.search}
					placeholder={"Search.../Add New..."}
					className="!py-1 px-2 !border-2 !border-[#8c8f94] !border-solid w-[180px]"
					onChange={(newVal) => {
						var searchPramsX = { ...searchPrams };
						searchPramsX.search = newVal;
						setsearchPrams(searchPramsX);
						const timer = setTimeout(() => {
							// Update the debounced value after delay
						}, 3000); // 300ms debounce delay
						return () => clearTimeout(timer); // Cleanup timer on value change or unmount
					}}
				/>

				<div
					className="flex items-center  gap-2 py-2 px-3 cursor-pointer  capitalize bg-gray-700 text-white font-medium rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
					onClick={(ev) => {
						create_post();
					}}>
					<Icon fill={"#fff"} icon={addCard} />
					<span>Create</span>
				</div>
				<span
					className="cursor-pointer"
					onClick={() => {
						setHelp({
							id: "createAccordion",
							enable: true,
						});
					}}>
					<Icon icon={help} />
				</span>
			</div>

			{posts != null && (
				<>
					{posts.map((item, index) => {
						return (
							<div
								className="flex justify-between align-middle items-center p-3 border-0 border-b border-solid border-[#ddd] hover:bg-slate-300 cursor-pointer"
								key={index}
								onClick={(ev) => {
									selectAccordion(item.ID);

									addNotifications({
										title: "Ready to Edit",
										content: "Now go to Edit panel to customize accordion.",
										type: "success",
									});
								}}>
								<div>
									<div className="text-base mb-2">{item.post_title}</div>
									<div className="text-sm flex items-center gap-2">
										<span className="text-xs">{`(#${item.ID})`}</span>
									</div>
								</div>
								{activeAccordion == item.ID && (
									<span>
										<Icon icon={check} />
									</span>
								)}
							</div>
						);
					})}
				</>
			)}

			<div className="flex py-5 justify-between px-2">
				<div
					className="bg-slate-700 text-white px-5 py-2 rounded-sm cursor-pointer hover:bg-slate-600"
					onClick={(ev) => {
						if (pagination.currentPage > 1) {
							var currentPage = pagination.currentPage - 1;
							setPagination({ currentPage: currentPage });
						}
					}}>
					Prev
				</div>
				<div
					className="bg-slate-700 text-white px-5 py-2 rounded-sm cursor-pointer hover:bg-slate-600"
					onClick={(ev) => {
						var currentPage = pagination.currentPage + 1;

						setPagination({ currentPage: currentPage });
					}}>
					Next
				</div>
			</div>
		</div>
	);






}

class wcpsList extends Component {

	constructor(props) {
		super(props);
		this.state = { showWarning: true, isLoaded: false };
		this.handleToggleClick = this.handleToggleClick.bind(this);
	}


	componentDidMount() {
		setTimeout(() => {
			this.setState(state => ({
				isLoaded: !state.isLoaded
			}));
		},
			1000)
	}

	handleToggleClick() {
		this.setState(state => ({
			showWarning: !state.showWarning
		}));
	}



	render() {

		var {
			selectAccordion,
			activeAccordion,
			setHelp,
			addNotifications
		} = this.props;







		return (


			<Html selectAccordion={selectAccordion} activeAccordion={activeAccordion} warn={this.state.showWarning} isLoaded={this.state.isLoaded} setHelp={setHelp} addNotifications={addNotifications}
			/>


		)
	}
}













export default wcpsList;