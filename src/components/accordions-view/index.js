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

	var postDataX = props.postData;
	var accordionDataX = postDataX.post_content;

	if (accordionDataX == null) {
		return null;
	}

	var [pleaseUpdateX, setpleaseUpdateX] = useState(props.pleaseUpdate); // Using the hook.
	var [postData, setpostData] = useState(props.postData); // Using the hook.
	var [accordionData, setaccordionData] = useState(postData.post_content); // Using the hook.

	var [styleObj, setstyleObj] = useState({}); // Using the hook.

	var [wrapper, setwrapper] = useState(accordionDataX.wrapper); // Using the hook.
	var [items, setitems] = useState(accordionDataX.items); // Using the hook.
	var [content, setcontent] = useState(accordionDataX.content);
	var [accOptions, setaccOptions] = useState(accordionDataX.accOptions);
	var [header, setheader] = useState(accordionDataX.header);
	var [headerActive, setheaderActive] = useState(accordionDataX.headerActive);
	var [headerLabel, setheaderLabel] = useState(accordionDataX.headerLabel);
	var [labelCounter, setlabelCounter] = useState(accordionDataX.labelCounter);
	var [labelIcon, setlabelIcon] = useState(accordionDataX.labelIcon);
	var [icon, seticon] = useState(accordionDataX.icon);
	var [iconToggle, seticonToggle] = useState(accordionDataX.iconToggle);


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
						<span className="cursor-pointer"
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

					{isLoading && (
						<div className="">
							<Spinner />
						</div>
					)}

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

			<div className={`my-5 ${wrapper?.options?.class} `}>
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
												className={` accordion-icon accordion-icon-toggle}`}
												dangerouslySetInnerHTML={{
													__html: iconToggleHtml,
												}}></span>
										)}
									</>
								)}
								{labelIcon.options.position == "beforeLabel" && (
									<span
										className={` accordion-label-icon`}
										dangerouslySetInnerHTML={{ __html: labelIconHtml }}></span>
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
										<span
											className={` accordion-label-icon`}
											dangerouslySetInnerHTML={{
												__html: labelIconHtml,
											}}></span>
									)}
									{item.headerLabel?.options.text.length > 0 ? (
										<>
											<span
												className={``}
												dangerouslySetInnerHTML={{
													__html: item?.headerLabel.options.text,
												}}></span>
										</>
									) : (
										"Start Writing..."
									)}
									{labelIcon.options.position == "afterLabelText" && (
										<span
											className={` accordion-label-icon`}
											dangerouslySetInnerHTML={{
												__html: labelIconHtml,
											}}></span>
									)}
									{labelCounter.options.position == "afterLabelText" && (
										<span className={` accordion-label-counter`}>{index}</span>
									)}
								</div>
								{labelIcon.options.position == "afterLabel" && (
									<span
										className={` accordion-label-icon`}
										dangerouslySetInnerHTML={{ __html: labelIconHtml }}></span>
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
											__html: item?.content.options.text,
										}}></div>
								</>
							)}
						</Fragment>
					);
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
