
const { Component, RawHTML, useState, useEffect } = wp.element;

import { Icon, close, settings, cloud, plus } from "@wordpress/icons";
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


	var wrapper = accordionDataX?.wrapper;
	var header = accordionDataX?.header;
	var headerActive = accordionDataX?.headerActive;
	var labelCounter = accordionDataX?.labelCounter;
	var labelIcon = accordionDataX?.labelIcon;
	var sliderOptions = accordionDataX?.sliderOptions;
	var prev = accordionDataX?.prev;
	var next = accordionDataX?.next;
	var icon = accordionDataX?.icon;
	var prevIcon = accordionDataX?.prevIcon;
	var nextIcon = accordionDataX?.nextIcon;

	var items = [
		{
			header: {
				label: "Label 1",
				labelToggle: "Label 1 Toggle",
				icon: "",
				iconToggle: "",
			},
			content: { text: "Accordion content 1" },
		},
		{
			header: { label: "Label 2" },
			content: { text: "Accordion content 2" },
		},
	];

	const [prevIconHtml, setPrevIconHtml] = useState("");
	const [nextIconHtml, setNextIconHtml] = useState("");

	useEffect(() => {
		var iconSrc = nextIcon?.options?.iconSrc;
		var iconHtml = `<span class="${iconSrc}"></span>`;
		setNextIconHtml(iconHtml);
	}, [nextIcon?.options]);
	useEffect(() => {
		var iconSrc = prevIcon?.options?.iconSrc;
		var iconHtml = `<span class="${iconSrc}"></span>`;
		setPrevIconHtml(iconHtml);
	}, [prevIcon?.options]);


	var [active, setactive] = useState("0");
	const handleActive = (index) => {
		setactive(index);
	}






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
					return (
						<>
							<div
								className={`${header?.options?.class} ${active == index ? headerActive?.options.class : ""
									}  p-3 bg-white border-b border-solid border-0`}
								onClick={() => handleActive(index)}>
								{icon?.options.position == "before" && <span>Icon</span>}
								<span>
									{labelCounter?.enable && labelCounter?.position == "before" && (
										<>{index + 1}</>
									)}
									{labelIcon?.enable && labelIcon?.position == "before" && (
										<>labelIcon</>
									)}
									{item.header.label}
									{labelIcon?.enable && labelIcon?.position == "after" && (
										<>labelIcon</>
									)}
									{labelCounter?.enable && labelCounter?.position == "after" && (
										<>{index + 1}</>
									)}
								</span>
								{icon?.options?.position == "after" && <span>Icon</span>}
							</div>
							<div
								className={`${active == index ? "" : "hidden"} bg-white p-3`}>
								{item.content.text}
							</div>
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

		return <Html isLoading={isLoading} postData={postData} id={id} warn={this.state.showWarning} />;
	}
}

export default AccordionsView;
