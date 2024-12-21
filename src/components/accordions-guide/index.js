const { Component, RawHTML, useState, useEffect } = wp.element;
import apiFetch from "@wordpress/api-fetch";
import { Popover, Spinner } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { Icon, close, cog, addCard, brush, category, columns, starFilled } from "@wordpress/icons";

import { Fragment } from "react";
import PGinputSelect from "../input-select";
import PGinputText from "../input-text";
import PGtab from "../../components/tab";
import PGtabs from "../../components/tabs";
var myStore = wp.data.select("postgrid-shop");

function Html(props) {
	if (!props.warn) {
		return null;
	}




	var [postData, setpostData] = useState(props.postData); // Using the hook.

	return (
		<div className="ml-5">

			<div className="flex justify-between items-center p-5 bg-white">
				<div>
					<div className="text-4xl">Accordions By PickPlugins</div>
				</div>
				<div>
					<div>Version: 2.3.1</div>
					<div>Create Support Ticket</div>
					<div>Videos</div>
					<div><Icon icon={starFilled} /><Icon icon={starFilled} /><Icon icon={starFilled} /><Icon icon={starFilled} /><Icon icon={starFilled} /></div>
				</div>
			</div>

			<PGtabs
				activeTab="overview"
				orientation=""
				contentClass=" w-full"
				navItemClass="bg-gray-200 px-5 py-3 gap-2"
				navItemSelectedClass="!bg-white"
				activeClass="active-tab"
				onSelect={(tabName) => { }}
				tabs={[
					{
						name: "overview",
						title: "Overview",
						icon: columns,
						className: "tab-disable-blocks",
					},
					{
						name: "edit",
						title: "Edit",
						icon: brush,
						className: "tab-disable-blocks",
					},
					{
						name: "templates",
						title: "Templates",
						icon: category,
						className: "tab-disable-blocks",
					},
				]}>
				<PGtab name="overview">

					<div class="grid grid-rows-4 grid-flow-col gap-4">
						<div class="row-span-3 ...">01</div>
						<div class="col-span-2 ...">02</div>
						<div class="row-span-2 col-span-2 ...">03</div>
					</div>









					<div className="grid my-5 grid-cols-12 gap-4">
						<div className="col-span-8">
							<div className="bg-white rounded-md p-6">
								<iframe width="100%" height="700" src="https://www.youtube.com/embed/ArANm9K1bes?si=uIGfrIJGD_cC2TGI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
							</div>

						</div>
						<div className="col-span-4">
							<div >

							</div>

						</div>

					</div>


				</PGtab>
				<PGtab name="edit">
					edit
				</PGtab>
				<PGtab name="templates">
					templates
				</PGtab>
			</PGtabs>


		</div>
	);
}

class AccordionsGuide extends Component {
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

		} = this.props;

		return (
			<Html
				postData={postData}
				warn={this.state.showWarning}
			/>
		);
	}
}

export default AccordionsGuide;
