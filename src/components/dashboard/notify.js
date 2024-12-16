const { Component, useState, useEffect } = wp.element;
import apiFetch from "@wordpress/api-fetch";

import { Icon, bell, check, caution, error, published, brush, category, columns, close, cancelCircleFilled } from "@wordpress/icons";

import AccordionsGenerateCss from "./generate-css";
import accordionDefaultData from "./accordion-default-data";
import tabsDefaultData from "./tabs-default-data";
import accordionTemplates from "./accordion-templates";
import AccordionsEdit from "../../components/accordions-edit";
import AccordionsView from "../../components/accordions-view";
import PGtab from "../../components/tab";
import PGtabs from "../../components/tabs";
import WCPSList from "../../components/wcps-list";

function Html(props) {
	if (!props.warn) {
		return null;
	}




	var [notifications, setnotifications] = useState(props.notifications); // Using the hook.



	useEffect(() => {
		setnotifications(props.notifications)

	}, [props.notifications]);




	return (
		<div className={`${notifications.length > 0 ? "" : "hidden"} fixed right-6 bottom-6 `}>


			{notifications?.map((item, index) => {

				var type = item.type

				return (
					<div className={`my-2 flex items-center gap-3 rounded-sm shadow-md bg-white p-3 ${type == 'success' ? "  border-l-4 border-indigo-500 border-solid" : ""} ${type == 'error' ? " border-b-2 border-red-700" : ""} ${type == 'warnning' ? " border-b-2 border-yellow-500" : ""}`}>
						{type == "warnning" && (
							<Icon icon={caution} />
						)}
						{type == "error" && (
							<Icon icon={error} />
						)}
						{type == "success" && (
							<Icon icon={check} />
						)}

						<span>{item.content}</span>

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
