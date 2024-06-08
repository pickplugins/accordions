

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

	var onChange = props.onChange;



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

	var accordionDataX = (props.accordionData.post_content == null || props.accordionData.post_content.length == 0) ? defaultPostData : props.accordionData;


	var [accordionData, setaccordionData] = useState(accordionDataX); // Using the hook.
	var [wrapper, setwrapper] = useState(accordionData.wrapper); // Using the hook.









	return (
		<div className="p-5">


			<PanelBody
				className="font-medium text-slate-900 "
				title="Wrapper"
				initialOpen={false}>

				<div>
					<label for="" className="font-medium text-slate-900 ">
						Wrapper Class
					</label>
					<InputControl
						value={wrapper.class}

						onChange={(newVal) => {

							var accordionDataX = { ...accordionData }

							accordionDataX.wrapper.class = newVal;



							setaccordionData(accordionDataX)


						}}
					/>
				</div>

			</PanelBody>


			{JSON.stringify(accordionData)}



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
			onChange,
			accordionData


		} = this.props;







		return (


			<Html onChange={onChange} accordionData={accordionData} warn={this.state.showWarning} isLoaded={this.state.isLoaded} />


		)
	}
}













export default AccordionsEdit;