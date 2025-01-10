const { Component, RawHTML, useState, useEffect } = wp.element;

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

	var [wrapper, setwrapper] = useState(accordionData.wrapper); // Using the hook.
	var [items, setitems] = useState(accordionData.items); // Using the hook.
	var [item, setitem] = useState(accordionData.item);
	var [overlay, setoverlay] = useState(accordionData.overlay);
	var [content, setcontent] = useState(accordionData.content);
	var [title, settitle] = useState(accordionData.title);
	var [image, setimage] = useState(accordionData.image);

	// var [wrapper, setwrapper] = useState(accordionData.wrapper);
	// var [items, setitems] = useState(accordionData.items);
	// var [content, setcontent] = useState(accordionData.content);
	// var [accOptions, setaccOptions] = useState(accordionData.accOptions);
	// var [header, setheader] = useState(accordionData.header);
	// var [headerActive, setheaderActive] = useState(accordionData.headerActive);
	// var [headerLabel, setheaderLabel] = useState(accordionData.headerLabel);
	// var [labelCounter, setlabelCounter] = useState(accordionData.labelCounter);
	// var [labelIcon, setlabelIcon] = useState(accordionData.labelIcon);
	// var [icon, seticon] = useState(accordionData.icon);
	// var [iconToggle, seticonToggle] = useState(accordionData.iconToggle);
	// var [searchInput, setsearchInput] = useState(accordionData.searchInput);
	// var [expandCollapseAll, setexpandCollapseAll] = useState(accordionData.expandCollapseAll);

	// var [navsWrap, setnavsWrap] = useState(accordionData?.navsWrap);
	// var [navItem, setnavItem] = useState(accordionData?.navItem);
	// var [activeNavItem, setactiveNavItem] = useState(
	// 	accordionData?.activeNavItem
	// );
	// var [navLabel, setnavLabel] = useState(accordionData?.navLabel);
	// var [panelWrap, setpanelWrap] = useState(accordionData?.panelWrap);

	// const [toggled, setToggled] = useState(false);
	// const [labelIconHtml, setlabelIconHtml] = useState("");

	// const [iconHtml, seticonHtml] = useState("");
	// const [iconToggleHtml, seticonToggleHtml] = useState("");
	// const [iconExpandAllHtml, seticonExpandAllHtml] = useState("");
	// const [iconCollapseAllHtml, seticonCollapseAllHtml] = useState("");
	// const [activeTab, setactiveTab] = useState(0);

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
		setitem(accordionData.item);
		setoverlay(accordionData.overlay);
		setcontent(accordionData.content);
		settitle(accordionData.title);
		setimage(accordionData.image);
	}, [accordionData]);

	useEffect(() => {
		//var accordionDataX = { ...accordionData };
		//accordionDataX.items = items;
		//onChange(accordionDataX);
	}, [items]);

	useEffect(() => {
		setpleaseUpdateX(pleaseUpdate);
	}, [pleaseUpdate]);

	var [active, setactive] = useState(9999);


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
			{/* PreviewImageAccordion */}
			{/* {JSON.stringify(accordionData)} */}

			<div
				id={`accordions-${id}`}
				className={`image-accordion-wrapper ${wrapper?.options?.class} `}>

				<div className="items">
					{items?.map((i, index) => {
						return (
							<div
								key={index}
								className={`image-accordion-item  ${i.active ? "active" : ""} ${index == active ? "active" : ""} ${item?.options?.class} `}
								onMouseOver={ev => {
									setactive(index)

								}}
								onMouseLeave={ev => {
									setactive(9999)

								}}

							>
								<img
									src={i.image.url}
									className={`image-accordion-image ${image?.options?.class}`}
								/>

								{(index == active || i.active) && (
									<div
										className={`image-accordion-overlay ${overlay?.options?.class} animate__animated animate__${overlay?.options?.inAnimation}`}>
										<div
											className={`image-accordion-title ${title?.options?.class}`}>
											{i.title}
										</div>
										<div className={`image-accordion-content ${content?.options?.class}`}>
											{unescapeHTML(i.content)}
										</div>
									</div>
								)}



							</div>
						);
					})}
				</div>


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
