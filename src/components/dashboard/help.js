const { Component, useState, useEffect } = wp.element;

import { Icon, close, check, external } from "@wordpress/icons";


function Html(props) {
	if (!props.warn) {
		return null;
	}

	var [help, sethelp] = useState(props.help); // Using the hook.



	useEffect(() => {

		sethelp(props.help)

	}, [props.help]);


	var helpPrams = {
		createAccordion: {
			title: "How to create Accordion",
			content: `
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, 
`,
			video: "ArANm9K1bes",
			docsUrl: "#",
		},
		useShortcodes: {
			title: "How to create Accordion",
			content: `
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, 
`,
			video: "ArANm9K1bes",
			docsUrl: "#",
		},



	}


	return (
		<div className={`${help.enable ? "" : "hidden"} z-[99999] top-0 left-0 fixed w-full h-full bg-slate-600 bg-opacity-90   `}>


			<div className=" bg-white my-[100px] p-5 relative w-[800px] h-[600px] overflow-y-scroll mx-auto rounded-md overflow-hidden">

				<span
					className="cursor-pointer px-2 py-1 bg-red-500 hover:bg-red-700 hover:text-white absolute top-0 right-0"
					onClick={(ev) => {
						var helpX = { ...help };
						helpX.enable = false;

						sethelp(helpX);
					}}>
					<Icon fill={"#fff"} icon={close} />
				</span>

				<div className="mb-4 text-2xl font-bold">{helpPrams[help?.id]?.title}</div>
				<div className="flex items-center  gap-2 align-middle"></div>
				<a className=" flex items-center gap-2 py-2 px-3 cursor-pointer  capitalize bg-gray-700 text-white font-medium rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
					<Icon fill={"#fff"} icon={external} />
					<span>Read on our Site</span>
				</a>
				<div className="my-4 text-base">{helpPrams[help?.id]?.content}</div>
				<div className="my-4 text-base">
					<iframe width="100%" height="450" src={`https://www.youtube.com/embed/${helpPrams[help?.id]?.video}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
				</div>


			</div>



		</div>
	);
}

class PGHelp extends Component {
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
		var { help } = this.props;

		return <Html help={help} warn={this.state.showWarning} />;
	}
}

export default PGHelp;