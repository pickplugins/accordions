

const { Component, RawHTML, useState, useEffect } = wp.element;

import { Icon, close, settings, cloud, plus } from '@wordpress/icons';
import { ReactSortable } from "react-sortablejs";
import { PanelBody, RangeControl, Button, ButtonGroup, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, Spinner, CustomSelectControl, Popover, __experimentalInputControl as InputControl, } from '@wordpress/components'
import apiFetch from '@wordpress/api-fetch';


var myStore = wp.data.select('postgrid-shop');



function Html(props) {

	if (!props.warn) {
		return null;
	}

	var id = props.id;






	var [isLoading, setisLoading] = useState(false); // Using the hook.
	var [postData, setpostData] = useState(null); // Using the hook.
	var [viewType, setviewType] = useState('accordion'); // Using the hook.
	var [items, setitems] = useState(null); // Using the hook.

	var defaultPostData = {
		wrapper: { class: "" },
		header: { class: "" },
		headerActive: { class: "" },
		headerLabel: { class: "" },
		labelIcon: { class: "", position: "before" },
		labelCounter: { class: "", position: "before" },
		content: { class: "" },
		icon: { class: "", position: "before" },
		iconToggle: { class: "" },


		items: [{ header: { label: "Label 1", labelToggle: "Label 1 Toggle", icon: "", iconToggle: "" }, content: { text: "Accordion content 1" } }, { header: { label: "Label 2" }, content: { text: "Accordion content 3" } }],


	}


	useEffect(() => {

		setisLoading(true);


		apiFetch({
			path: "/accordions/v2/accordions_data",
			method: "POST",
			data: {
				postId: id,
				_wpnonce: post_grid_editor_js._wpnonce,

			},
		}).then((res) => {

			setisLoading(false);

			console.log(res);


			setpostData(res);
			var post_content = (res.post_content == null || res.post_content.length == 0) ? defaultPostData.items : res.post_content;
			setitems(post_content)
		});






	}, [id]);













	return (
		<div className="ml-5">
			{(isLoading) && (
				<div className='absolute top-0 left-0 bg-slate-500'>
					<Spinner />
				</div>
			)}


			<div className='flex items-center justify-between align-middle bg-white p-5  mb-5'>

				<div className='flex items-center gap-5'>
					<div className='pr-5'>View Type: </div>

					<div className={(viewType == 'accordion') ? 'bg-slate-500 text-white p-3 py-2' : 'p-3 py-2 bg-slate-400'} onClick={ev => {
						setviewType("accordion")
					}}>Accordion</div>
					<div className={(viewType == 'tabs') ? 'bg-slate-500 text-white p-3 py-2' : 'p-3 py-2 bg-slate-400'} onClick={ev => {
						setviewType("tabs")
					}}>Tabs</div>


					<h2>
						{postData?.post_title && (
							<>You are editing: {postData.post_title}</>
						)}
					</h2>
				</div>

				<div>
					<div className='p-3 py-2 bg-slate-500 inline-block' onClick={ev => {



					}}>Add</div>
				</div>

			</div>



			<div>




			</div>





			<div className='my-5'>

				{items?.map(item => {


					return (

						<>
							<div className='p-3 bg-white border-b border-solid border-0'>

								<span>Icon</span>
								{item.header.label}
							</div>
							<div className='bg-white p-3'>{item.content.text}</div>

						</>

					)

				})}

			</div>



		</div>
	);






}

class AccordionsView extends Component {

	constructor(props) {
		super(props);
		this.state = { showWarning: true };
		this.handleToggleClick = this.handleToggleClick.bind(this);
	}




	handleToggleClick() {
		this.setState(state => ({
			showWarning: !state.showWarning
		}));
	}



	render() {

		var {
			onChange,
			id


		} = this.props;







		return (


			<Html onChange={onChange} id={id} warn={this.state.showWarning} />


		)
	}
}













export default AccordionsView;