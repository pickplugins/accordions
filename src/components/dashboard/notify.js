const { Component, useState, useEffect } = wp.element;

import { Icon, close, check } from "@wordpress/icons";


function Html(props) {
	if (!props.warn) {
		return null;
	}




	var [notifications, setnotifications] = useState(props.notifications); // Using the hook.



	useEffect(() => {

		props.notifications.reverse()
		var slicedArray = props.notifications.slice(0, 3)
		setnotifications(slicedArray)

	}, [props.notifications]);




	return (
		<div className={`${notifications.length > 0 ? "" : "hidden"} fixed right-6 bottom-6 `}>


			{notifications?.map((item, index) => {

				var type = item.type

				return (
					<div className={`max-w-72 mb-2 overflow-hidden relative rounded-sm shadow-md bg-white p-3 ${type == 'success' ? " border-0 border-l-4 border-l-green-700 border-solid" : ""} ${type == 'error' ? " border-b-2 border-b-red-700" : ""} ${type == 'warnning' ? " border-b-2 border-b-yellow-500" : ""}`}>

						<span
							className="cursor-pointer px-1 bg-red-500 hover:bg-red-700 hover:text-white absolute top-0 right-0"
							onClick={(ev) => {
								var notificationsX = [...notifications];
								notificationsX.splice(index, 1);

								setnotifications(notificationsX);
							}}>
							<Icon fill={"#fff"} icon={close} />
						</span>

						<div className="flex items-center gap-3 ">
							<div>
								{type == "warnning" && (
									<Icon icon={close} />
								)}
								{type == "error" && (
									<Icon icon={close} />
								)}
								{type == "success" && (
									<Icon icon={check} />
								)}
							</div>
							<div className="text-base mb-2">
								{item?.title}
							</div>
						</div>
						<div className="text-xs">{item?.content}</div>

					</div>
				)

			})}




		</div>
	);
}

class PGNotify extends Component {
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
		var { notifications } = this.props;

		return <Html notifications={notifications} warn={this.state.showWarning} />;
	}
}

export default PGNotify;