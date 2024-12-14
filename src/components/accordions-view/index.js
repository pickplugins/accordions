
const { Component, RawHTML, useState, useEffect } = wp.element;

import { Icon, close, settings, cloud, plus, post } from "@wordpress/icons";
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


	var id = props.id;
	var isLoading = props.isLoading;


	var postData = props.postData;
	var accordionDataX = postData.post_content;

	console.log(accordionDataX);

	if (accordionDataX == null) {
		return null;
	}



	var items = accordionDataX?.items;
	var wrapper = accordionDataX?.wrapper;
	var header = accordionDataX?.header;
	var headerActive = accordionDataX?.headerActive;
	var labelCounter = accordionDataX?.labelCounter;
	var labelIcon = accordionDataX?.labelIcon;
	var headerLabel = accordionDataX?.headerLabel;

	var icon = accordionDataX?.icon;
	var iconToggle = accordionDataX?.iconToggle;


	var items = [
		{
			headerLabel: {
				"options": {
					"text": "Accordion Header 1",
					"tag": "",
					"class": "accordion-header-label",
				},
			},
			content: {
				"options": {
					"tag": "",
					"class": "accordion-content",
					text: "Accordion content 1"
				},
			},
		},
		{
			headerLabel: {
				"options": {
					"text": "Accordion Header 2",
					"tag": "",
					"class": "accordion-header-label",
				},
			},
			content: {
				"options": {
					"tag": "",
					"class": "accordion-content",
					text: "Accordion content 2"
				},
			},
		},
		{
			headerLabel: {
				"options": {
					"text": "Accordion Header 3",
					"tag": "",
					"class": "accordion-header-label",
				},
			},
			content: {
				"options": {
					"tag": "",
					"class": "accordion-content",
					text: "Accordion content 3"
				},
			},
		},










	];
	const [toggled, setToggled] = useState(false);
	const [labelIconHtml, setlabelIconHtml] = useState("");

	const [iconHtml, seticonHtml] = useState("");
	const [iconToggleHtml, seticonToggleHtml] = useState("");

	useEffect(() => {
		var iconSrc = iconToggle?.options?.iconSrc;
		var iconHtml = `<span class="${iconSrc}"></span>`;
		seticonToggleHtml(iconHtml);
	}, [iconToggle?.options]);

	useEffect(() => {
		var iconSrc = icon?.options?.iconSrc;
		var iconHtml = `<span class="${iconSrc}"></span>`;
		seticonHtml(iconHtml);
	}, [icon?.options]);

	useEffect(() => {
		var iconSrc = labelIcon?.options?.iconSrc;
		var iconHtml = `<span class="${iconSrc}"></span>`;
		setlabelIconHtml(iconHtml);
	}, [labelIcon?.options]);


	var [active, setactive] = useState("0");
	const handleActive = (index) => {
		setactive(index);
	}


	var blockId = "";
	var blockIdX = "";


	return (
		<div className="ml-5">





			<div className="flex items-center justify-between align-middle bg-white p-5  mb-5">
				<div className="flex items-center gap-5">





					<h2>
						{postData?.post_title && (
							<>You are editing: {postData.post_title}</>
						)}
					</h2>
				</div>

				<div>
					{isLoading && (
						<div className="">
							<Spinner />
						</div>
					)}
				</div>
			</div>

			<div></div>






			<div className={`my-5 ${wrapper?.options?.class} `}>
				{items?.map((item, index) => {

					console.log(item);



					return (
						<>
							<div
								className={`${blockId}-accordion-header ${blockIdX}  ${header.options.class
									} ${toggled ? "accordion-header-active" : ""}`}
								onClick={(ev) => {
									setToggled(!toggled);
								}}>
								{labelCounter.options.position == "left" && (
									<span
										className={`${blockId}-accordion-label-counter accordion-label-counter`}>
										{index}
									</span>
								)}
								{icon.options.position == "left" && (
									<>
										{!toggled && (
											<span
												className={`${blockId}-accordion-icon accordion-icon`}
												dangerouslySetInnerHTML={{ __html: iconHtml }}></span>
										)}
										{toggled && (
											<span
												className={`${blockId}-accordion-icon-toggle accordion-icon accordion-icon-toggle}`}
												dangerouslySetInnerHTML={{ __html: iconToggleHtml }}></span>
										)}
									</>
								)}
								{labelIcon.options.position == "beforeLabel" && (
									<span
										className={`${blockId}-accordion-label-icon accordion-label-icon`}
										dangerouslySetInnerHTML={{ __html: labelIconHtml }}></span>
								)}
								<div
									className={`${blockId}-accordion-header-label accordion-header-label`}
									onClick={(e) => {
										return;
									}}>
									{labelCounter.options.position == "beforeLabelText" && (
										<span
											className={`${blockId}-accordion-label-counter accordion-label-counter`}>
											{index}
										</span>
									)}
									{labelIcon.options.position == "beforeLabelText" && (
										<span
											className={`${blockId}-accordion-label-icon accordion-label-icon`}
											dangerouslySetInnerHTML={{ __html: labelIconHtml }}></span>
									)}
									{headerLabel.options.text.length > 0 ? (
										<span

											dangerouslySetInnerHTML={{ __html: item?.headerLabel.options.text }}
										/>
									) : (
										"Start Writing..."
									)}
									{labelIcon.options.position == "afterLabelText" && (
										<span
											className={`${blockId}-accordion-label-icon accordion-label-icon`}
											dangerouslySetInnerHTML={{ __html: labelIconHtml }}></span>
									)}
									{labelCounter.options.position == "afterLabelText" && (
										<span
											className={`${blockId}-accordion-label-counter accordion-label-counter`}>
											{index}
										</span>
									)}
								</div>
								{labelIcon.options.position == "afterLabel" && (
									<span
										className={`${blockId}-accordion-label-icon accordion-label-icon`}
										dangerouslySetInnerHTML={{ __html: labelIconHtml }}></span>
								)}
								{labelCounter.options.position == "right" && (
									<span
										className={`${blockId}-accordion-label-counter accordion-label-counter`}>
										{index}
									</span>
								)}
								{icon.options.position == "right" && (
									<>
										{!toggled && (
											<span
												className={`${blockId}-accordion-icon accordion-icon`}
												dangerouslySetInnerHTML={{ __html: iconHtml }}></span>
										)}
										{toggled && (
											<span
												className={`${blockId}-accordion-icon-toggle accordion-icon-toggle`}
												dangerouslySetInnerHTML={{ __html: iconToggleHtml }}></span>
										)}
									</>
								)}
							</div>
							{toggled && (
								<div
									className={`${blockId}-accordion-content accordion-content`}>
									{item?.content.options.text}
								</div>
							)}
						</>
					);
				})}
			</div>

			<code>
				{JSON.stringify(wrapper)}
			</code>
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
		this.setState((state) => ({
			showWarning: !state.showWarning,
		}));
	}

	
	render() {
		var { postData, id, isLoading } = this.props;

		return (
			<Html
				isLoading={isLoading}
				postData={postData}
				id={id}
				warn={this.state.showWarning}
			/>
		);
	}
}

export default AccordionsView;
