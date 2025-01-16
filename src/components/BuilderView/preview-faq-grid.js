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
	var [itemsWrap, setitemsWrap] = useState(accordionData.itemsWrap);
	var [itemWrap, setitemWrap] = useState(accordionData.itemWrap);
	var [items, setitems] = useState(accordionData.items);
	var [content, setcontent] = useState(accordionData.content);
	var [accOptions, setaccOptions] = useState(accordionData.accOptions);
	var [header, setheader] = useState(accordionData.header);
	var [headerLabel, setheaderLabel] = useState(accordionData.headerLabel);
	var [labelCounter, setlabelCounter] = useState(accordionData.labelCounter);
	var [labelIcon, setlabelIcon] = useState(accordionData.labelIcon);
	var [icon, seticon] = useState(accordionData.icon);
	var [searchInput, setsearchInput] = useState(accordionData.searchInput);


	const [toggled, setToggled] = useState(false);
	const [labelIconHtml, setlabelIconHtml] = useState("");

	const [iconHtml, seticonHtml] = useState("");
	const [iconExpandAllHtml, seticonExpandAllHtml] = useState("");
	const [iconCollapseAllHtml, seticonCollapseAllHtml] = useState("");



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
		setitemsWrap(accordionData.itemsWrap);
		setitemWrap(accordionData.itemWrap);
		setitems(accordionData.items);
		setcontent(accordionData.content);
		setaccOptions(accordionData.accOptions);
		setheader(accordionData.header);
		setheaderLabel(accordionData.headerLabel);
		setlabelCounter(accordionData.labelCounter);
		setlabelIcon(accordionData.labelIcon);
		seticon(accordionData.icon);
		setsearchInput(accordionData.searchInput);

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
		var iconSrc = icon?.options?.iconSrc;
		var iconHtml = `<span class="${iconSrc}"></span>`;
		seticonHtml(iconHtml);
	}, [icon?.options]);

	useEffect(() => {
		var iconSrc = labelIcon?.options?.iconSrc;
		var iconHtml = `<span class="${iconSrc}"></span>`;
		setlabelIconHtml(iconHtml);
	}, [labelIcon?.options]);













	function unescapeHTML(str) {
		const map = {
			'&amp;': '&',
			'&lt;': '<',
			'&gt;': '>',
			'&quot;': '"',
			'&#039;': "'"
		};
		return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function (match) {
			return map[match];
		});
	}








	return (



		<div className="px-10 py-10">


			<div id={`accordions-${id}`} className={`${wrapper?.options?.class} `}>

				<div className="top-wrap">
					{searchInput?.options.enable && (
						<div class="search-wrap">
							<input type="text" class="search-input" placeholder={searchInput?.options?.placeholder} />
						</div>
					)}







				</div>
				<div className={`items ${itemsWrap?.options?.class} `}>
					{items?.map((item, index) => {
						return (
							<div key={index} className={`${itemWrap?.options?.class} item`}>
								<div
									className={`accordion-header ${header?.options.class} `}
									onClick={(ev) => {
										setToggled(!toggled);
									}}>
									{labelCounter?.options.position == "left" && (
										<span className={` accordion-label-counter`}>{index}</span>
									)}
									{icon?.options.position == "left" && (
										<>

											<span
												className={` accordion-icon`}
												dangerouslySetInnerHTML={{ __html: iconHtml }}></span>


										</>
									)}
									{labelIcon?.options.position == "beforeLabel" && (
										<>
											{item?.labelIcon?.options.iconSrc && (
												<span className={` accordion-label-icon`}
													dangerouslySetInnerHTML={{ __html: `<span class="${item?.labelIcon?.options.iconSrc}"></span>` }}></span>
											)}
											{!item?.labelIcon?.options.iconSrc && (
												<span className={` accordion-label-icon`}
													dangerouslySetInnerHTML={{ __html: labelIconHtml }}></span>
											)}
										</>
									)}
									<a
										className={` accordion-header-label`}
										href={"#" + item.headerLabelSlug}
										onClick={(e) => {
											return;
										}}>
										{labelCounter?.options.position == "beforeLabelText" && (
											<span className={` accordion-label-counter`}>{index}</span>
										)}
										{labelIcon?.options.position == "beforeLabelText" && (
											<>
												{item?.labelIcon?.options.iconSrc && (
													<span className={` accordion-label-icon`}
														dangerouslySetInnerHTML={{ __html: `<span class="${item?.labelIcon?.options.iconSrc}"></span>` }}></span>
												)}
												{!item?.labelIcon?.options.iconSrc && (
													<span className={` accordion-label-icon`}
														dangerouslySetInnerHTML={{ __html: labelIconHtml }}></span>
												)}
											</>
										)}
										{item?.headerLabelText.length > 0 ? (
											<>
												<span
													className={``}
													dangerouslySetInnerHTML={{
														__html: item?.headerLabelText,
													}}></span>
											</>
										) : (
											"Start Writing..."
										)}
										{labelIcon?.options.position == "afterLabelText" && (
											<>
												{item?.labelIcon?.options.iconSrc && (
													<span className={` accordion-label-icon`}
														dangerouslySetInnerHTML={{ __html: `<span class="${item?.labelIcon?.options.iconSrc}"></span>` }}></span>
												)}
												{!item?.labelIcon?.options.iconSrc && (
													<span className={` accordion-label-icon`}
														dangerouslySetInnerHTML={{ __html: labelIconHtml }}></span>
												)}
											</>
										)}
										{labelCounter?.options.position == "afterLabelText" && (
											<span className={` accordion-label-counter`}>{index}</span>
										)}
									</a>
									{labelIcon?.options.position == "afterLabel" && (
										<>
											{item?.labelIcon?.options.iconSrc && (
												<span className={` accordion-label-icon`}
													dangerouslySetInnerHTML={{ __html: `<span class="${item?.labelIcon?.options.iconSrc}"></span>` }}></span>
											)}
											{!item?.labelIcon?.options.iconSrc && (
												<span className={` accordion-label-icon`}
													dangerouslySetInnerHTML={{ __html: labelIconHtml }}></span>
											)}
										</>
									)}
									{labelCounter?.options.position == "right" && (
										<span className={` accordion-label-counter`}>{index}</span>
									)}
									{icon?.options.position == "right" && (
										<>

											<span
												className={` accordion-icon`}
												dangerouslySetInnerHTML={{ __html: iconHtml }}></span>


										</>
									)}
								</div>



								<>
									<div
										className={`accordion-content animate__animated animate__${content?.options?.inAnimation}`}
										dangerouslySetInnerHTML={{
											__html: unescapeHTML(item?.contentText),
										}}></div>
								</>



							</div>
						);
					})}
				</div>


			</div>
		</div>



	);
}

class PreviewFaqGrid extends Component {
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

export default PreviewFaqGrid;
