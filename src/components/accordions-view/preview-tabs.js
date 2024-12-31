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

				<div className="top-wrap">



				</div>


				{/* {items?.map((item, index) => {
					return (
						<Fragment key={index}>
							<div
								className={`accordion-header ${header?.options.class} ${active == index ? "accordion-header-active" : ""
									}`}
								onClick={(ev) => {
									setToggled(!toggled);
									setactive(index == active ? 999 : index);
								}}>
								{labelCounter?.options.position == "left" && (
									<span className={` accordion-label-counter`}>{index}</span>
								)}
								{icon?.options.position == "left" && (
									<>
										{active != index && (
											<span
												className={` accordion-icon`}
												dangerouslySetInnerHTML={{ __html: iconHtml }}></span>
										)}
										{active == index && (
											<span
												className={` accordion-icon accordion-icon-toggle`}
												dangerouslySetInnerHTML={{
													__html: iconToggleHtml,
												}}></span>
										)}
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
								<div
									className={` accordion-header-label`}
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
								</div>
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
										{active != index && (
											<span
												className={` accordion-icon`}
												dangerouslySetInnerHTML={{ __html: iconHtml }}></span>
										)}
										{active == index && (
											<span
												className={` accordion-icon-toggle`}
												dangerouslySetInnerHTML={{
													__html: iconToggleHtml,
												}}></span>
										)}
									</>
								)}
							</div>
							{active == index && (
								<>
									<div
										className={`accordion-content`}
										dangerouslySetInnerHTML={{
											__html: item?.contentText,
										}}></div>
								</>
							)}
						</Fragment>
					);
				})} */}



				<div className={" navs-wrapper  "} role="tablist">
					{items.map((tab, index) => {
						return (
							<div
								key={index}
								className={` ${index === activeTab
									? "  nav-item-active nav-item "
									: `nav-item pg${index}-nav-item`
									}`}
								role="tab"
								tabIndex={index}
								onClick={() => setactiveTab(index)}>

								{labelCounter?.options.position == "left" && (
									<span className={` accordion-label-counter`}>{index}</span>
								)}

								{icon.options.position == "before" && (
									<>
										{index == activeTab ? (
											<>
												<span
													className={` nav-icon-toggle`}
													dangerouslySetInnerHTML={{ __html: iconToggleHtml }}></span>
											</>
										) : (
											<>
												<span
													className={` nav-icon`}
													dangerouslySetInnerHTML={{ __html: iconHtml }}></span>

											</>
										)}


									</>
								)}

								{labelIcon?.options.position == "beforeLabel" && (
									<>
										{tab?.labelIcon?.options.iconSrc && (
											<span className={` accordion-label-icon`}
												dangerouslySetInnerHTML={{ __html: `<span class="${tab?.labelIcon?.options.iconSrc}"></span>` }}></span>
										)}
										{!tab?.labelIcon?.options.iconSrc && (
											<span className={` accordion-label-icon`}
												dangerouslySetInnerHTML={{ __html: labelIconHtml }}></span>
										)}
									</>
								)}

								<div className=" nav-label"
								>
									{labelCounter?.options.position == "beforeLabelText" && (
										<span className={` accordion-label-counter`}>{index}</span>
									)}

									{labelIcon?.options.position == "beforeLabelText" && (
										<>
											{tab?.labelIcon?.options.iconSrc && (
												<span className={` accordion-label-icon`}
													dangerouslySetInnerHTML={{ __html: `<span class="${tab?.labelIcon?.options.iconSrc}"></span>` }}></span>
											)}
											{!tab?.labelIcon?.options.iconSrc && (
												<span className={` accordion-label-icon`}
													dangerouslySetInnerHTML={{ __html: labelIconHtml }}></span>
											)}
										</>
									)}

									{tab.headerLabelText}

									{labelIcon?.options.position == "afterLabelText" && (
										<>
											{tab?.labelIcon?.options.iconSrc && (
												<span className={` accordion-label-icon`}
													dangerouslySetInnerHTML={{ __html: `<span class="${tab?.labelIcon?.options.iconSrc}"></span>` }}></span>
											)}
											{!tab?.labelIcon?.options.iconSrc && (
												<span className={` accordion-label-icon`}
													dangerouslySetInnerHTML={{ __html: labelIconHtml }}></span>
											)}
										</>
									)}

									{labelCounter?.options.position == "afterLabelText" && (
										<span className={` accordion-label-counter`}>{index}</span>
									)}

								</div>

								{labelIcon?.options.position == "afterLabel" && (
									<>
										{tab?.labelIcon?.options.iconSrc && (
											<span className={` accordion-label-icon`}
												dangerouslySetInnerHTML={{ __html: `<span class="${tab?.labelIcon?.options.iconSrc}"></span>` }}></span>
										)}
										{!tab?.labelIcon?.options.iconSrc && (
											<span className={` accordion-label-icon`}
												dangerouslySetInnerHTML={{ __html: labelIconHtml }}></span>
										)}
									</>
								)}
								{labelCounter?.options.position == "right" && (
									<span className={` accordion-label-counter`}>{index}</span>
								)}
								{icon.options.position == "after" && (
									<>
										{index == activeTab ? (
											<>
												<span
													className={` nav-icon-toggle`}
													dangerouslySetInnerHTML={{ __html: iconToggleHtml }}></span>
											</>
										) : (
											<>
												<span
													className={` nav-icon`}
													dangerouslySetInnerHTML={{ __html: iconHtml }}></span>

											</>
										)}


									</>
								)}

							</div>
						);
					})}
				</div>
				<div className={"panels-wrap"}>
					{items.map((tab, index) => {
						return (
							<div className={`tabs-panel animate__animated animate__${panelWrap?.options?.inAnimation}  ${activeTab === index ? "tabs-panel-active" : "hidden"
								}`}
								dangerouslySetInnerHTML={{ __html: tab.contentText }}
							>


							</div>
						)
					}

					)}



				</div>

			</div>
		</div>



	);
}

class PreviewTabs extends Component {
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

export default PreviewTabs;