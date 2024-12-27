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


	const [toggled, setToggled] = useState(false);
	const [labelIconHtml, setlabelIconHtml] = useState("");

	const [iconHtml, seticonHtml] = useState("");
	const [iconToggleHtml, seticonToggleHtml] = useState("");



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
		setitems(postData.post_content.items);
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
		var accordionDataX = { ...accordionData };
		accordionDataX.items = items;
		onChange(accordionDataX);
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

	var [active, setactive] = useState(9999);

	return (
		<div className="ml-5">
			<div className="flex items-center justify-between align-middle bg-white p-5  mb-5">
				<div className="flex items-center gap-5">
					<div className="text-xl">
						{postData?.post_title && (
							<>You are editing: {postData.post_title}</>
						)}
					</div>


				</div>

				<div className="flex items-center align-middle gap-3">


					<div className="flex items-center align-middle gap-2">
						<span className="cursor-pointer" title="Click to know more"
							onClick={() => {
								setHelp({
									id: "useShortcodes",
									enable: true,

								});
							}}
						>
							<Icon icon={help} />
						</span>
						<input
							type="text"
							className="w-72 !bg-slate-200 !rounded-none !border-2 !border-solid border-slate-400 text-sm !py-1 !px-2 font-mono"
							value={`[accordions_builder id="${id}"]`}
							onClick={() => {
								var str = `[accordions_builder id="${id}"]`;

								copyData(str);
							}}
						/>
					</div>



					{pleaseUpdateX && (
						<div
							className="bg-slate-700 text-white px-5 py-2 rounded-sm cursor-pointer hover:bg-slate-600"
							onClick={(ev) => {
								onUpdate(true);
							}}>
							Save
						</div>
					)}
				</div>
			</div>


			<div className="px-10 py-10">


				<div className={`${wrapper?.options?.class} `}>

					<div className="top-wrap">
						{searchInput.options.enable && (
							<div class="search-wrap">
								<input type="text" class="search-input" placeholder={searchInput.options.placeholder} />
							</div>
						)}


						{expandCollapseAll.options.enable && (
							<div class="expand-collapse-all" data-expandAllText="" data-collapseAllText="" data-expandAllIconHtml="" data-collapseAllIconHtml="">

								<span>{expandCollapseAll.options?.expandAllText}</span>

							</div>
						)}





					</div>


					{items?.map((item, index) => {
						return (
							<Fragment key={index}>
								<div
									className={`accordion-header ${header.options.class} ${active == index ? "accordion-header-active" : ""
										}`}
									onClick={(ev) => {
										setToggled(!toggled);
										setactive(index == active ? 999 : index);
									}}>
									{labelCounter.options.position == "left" && (
										<span className={` accordion-label-counter`}>{index}</span>
									)}
									{icon.options.position == "left" && (
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
									{labelIcon.options.position == "beforeLabel" && (
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
										{labelCounter.options.position == "beforeLabelText" && (
											<span className={` accordion-label-counter`}>{index}</span>
										)}
										{labelIcon.options.position == "beforeLabelText" && (
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
										{item.headerLabel?.options.text.length > 0 ? (
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
										{labelIcon.options.position == "afterLabelText" && (
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
										{labelCounter.options.position == "afterLabelText" && (
											<span className={` accordion-label-counter`}>{index}</span>
										)}
									</div>
									{labelIcon.options.position == "afterLabel" && (
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
									{labelCounter.options.position == "right" && (
										<span className={` accordion-label-counter`}>{index}</span>
									)}
									{icon.options.position == "right" && (
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
					})}
				</div>
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

export default AccordionsView;
