const { Component, RawHTML, useState, useEffect } = wp.element;
import apiFetch from "@wordpress/api-fetch";
import { Popover, Spinner } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { Icon, close, cog, addCard, helpFilled, help } from "@wordpress/icons";

import { Fragment } from "react";
import PGinputSelect from "../input-select";
import PGinputText from "../input-text";

var myStore = wp.data.select("postgrid-shop");

function Html(props) {
	if (!props.warn) {
		return null;
	}

	var id = props.id;
	var onChange = props.onChange;
	var addNotifications = props.addNotifications;
	var setHelp = props.setHelp;

	var isLoading = props.isLoading;
	var onUpdate = props.onUpdate;
	var pleaseUpdate = props.pleaseUpdate;

	if (props.postData.post_content == null) {
		return null;
	}

	var [pleaseUpdateX, setpleaseUpdateX] = useState(props.pleaseUpdate);
	var [postData, setpostData] = useState(props.postData);
	var [accordionData, setaccordionData] = useState(postData.post_content);

	var [globalOptions, setglobalOptions] = useState(accordionData.globalOptions);

	var [wrapper, setwrapper] = useState(accordionData.wrapper);
	var [items, setitems] = useState(accordionData.items);
	var [content, setcontent] = useState(accordionData.content);
	var [accOptions, setaccOptions] = useState(accordionData.accOptions);
	var [header, setheader] = useState(accordionData.header);
	var [headerActive, setheaderActive] = useState(accordionData.headerActive);
	var [headerLabel, setheaderLabel] = useState(accordionData.headerLabel);
	var [labelCounter, setlabelCounter] = useState(accordionData.labelCounter);
	var [labelIcon, setlabelIcon] = useState(accordionData.labelIcon);
	var [icon, seticon] = useState(accordionData.icon);
	var [iconToggle, seticonToggle] = useState(accordionData.iconToggle);
	var [searchInput, setsearchInput] = useState(accordionData.searchInput);
	var [expandCollapseAll, setexpandCollapseAll] = useState(accordionData.expandCollapseAll);

	var [navsWrap, setnavsWrap] = useState(accordionData?.navsWrap);
	var [navItem, setnavItem] = useState(accordionData?.navItem);
	var [activeNavItem, setactiveNavItem] = useState(
		accordionData?.activeNavItem
	);
	var [navLabel, setnavLabel] = useState(accordionData?.navLabel);
	var [panelWrap, setpanelWrap] = useState(accordionData?.panelWrap);

	const [toggled, setToggled] = useState(false);
	const [labelIconHtml, setlabelIconHtml] = useState("");

	const [iconHtml, seticonHtml] = useState("");
	const [iconToggleHtml, seticonToggleHtml] = useState("");
	const [iconExpandAllHtml, seticonExpandAllHtml] = useState("");
	const [iconCollapseAllHtml, seticonCollapseAllHtml] = useState("");
	const [activeTab, setactiveTab] = useState(0);



	const copyData = (data) => {
		navigator.clipboard
			.writeText(data)
			.then(() => {
				addNotifications({
					title: "Copied to clipboard!",
					content:
						"Use the shortcode in page or post conent where you want to display.",
					type: "success",
				});
			})
			.catch((err) => { });
	};

	useEffect(() => {
		setpostData(props.postData);
	}, [props.postData]);

	useEffect(() => {
		setaccordionData(postData.post_content);
		//setitems(postData.post_content.items);
	}, [postData]);


	useEffect(() => {


		setglobalOptions(accordionData.globalOptions);

		setwrapper(accordionData.wrapper);
		setitems(accordionData.items);
		setcontent(accordionData.content);
		setaccOptions(accordionData.accOptions);
		setheader(accordionData.header);
		setheaderActive(accordionData.headerActive);
		setheaderLabel(accordionData.headerLabel);
		setlabelCounter(accordionData.labelCounter);
		setlabelIcon(accordionData.labelIcon);
		seticon(accordionData.icon);
		seticonToggle(accordionData.iconToggle);
		setsearchInput(accordionData.searchInput);
		setexpandCollapseAll(accordionData.expandCollapseAll);

	}, [accordionData]);



	useEffect(() => {
		//var accordionDataX = { ...accordionData };
		//accordionDataX.items = items;
		//onChange(accordionDataX);
	}, [items]);

	useEffect(() => {
		setpleaseUpdateX(pleaseUpdate);
	}, [pleaseUpdate]);

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


	useEffect(() => {

		var expandAllIconSrc = expandCollapseAll?.options?.expandAllIcon?.iconSrc;
		var collapseAllIconSrc = expandCollapseAll?.options?.collapseAllIcon?.iconSrc;

		var expandIconHtml = `<span class="${expandAllIconSrc}"></span>`;
		seticonExpandAllHtml(expandIconHtml);

		var collapseIconHtml = `<span class="${collapseAllIconSrc}"></span>`;
		seticonCollapseAllHtml(collapseIconHtml);



	}, [expandCollapseAll?.options]);







	var [active, setactive] = useState(9999);

	return (



		<div className="px-10 py-10">


			<div id={`accordions-${id}`} className={`${wrapper?.options?.class} `}>


				PreviewImageAccordion


			</div>
		</div>



	);
}

class PreviewImageAccordion extends Component {
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
		var {
			postData,
			id,
			isLoading,
			onChange,
			pleaseUpdate,
			onUpdate,
			addNotifications,
			setHelp,
		} = this.props;

		return (
			<Html
				isLoading={isLoading}
				postData={postData}
				id={id}
				onUpdate={onUpdate}
				pleaseUpdate={pleaseUpdate}
				onChange={onChange}
				addNotifications={addNotifications}
				setHelp={setHelp}
				warn={this.state.showWarning}
			/>
		);
	}
}

export default PreviewImageAccordion;