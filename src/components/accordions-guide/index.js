const { Component, RawHTML, useState, useEffect } = wp.element;
import apiFetch from "@wordpress/api-fetch";
import { Popover, Spinner } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { Icon, close, cog, addCard, brush, category, columns, starFilled, postAuthor, styles } from "@wordpress/icons";

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

	const tableData = [
		{
			feature: "Feature 1",
			lite: "true",
			pro: "true",
			new: "true",
		},
		{
			feature: "Feature 2",
			lite: "false",
			pro: "true",
			hot: "true",
		},
		{
			feature: "Feature 3",
			lite: "1+",
			pro: "3+",
		},
		{
			feature: "Feature 4",
			lite: "12",
			pro: "4",
		},
	];

	const ourPlugins = [
		{
			name: "Plugin Name 1",
			description:
				"At ShapedPlugin LLC, we have been looking for the best way to create FAQ pages or sections on WordPress sites.",
			logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/WordPress_blue_logo.svg/512px-WordPress_blue_logo.svg.png",
			link: "https://example.com",
		},
		{
			name: "Plugin Name 2",
			description:
				"At ShapedPlugin LLC, we have been looking for the best way to create FAQ pages or sections on WordPress sites.",
			logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/WordPress_blue_logo.svg/512px-WordPress_blue_logo.svg.png",
			link: "https://example.com",
		},
		{
			name: "Plugin Name 3",
			description:
				"At ShapedPlugin LLC, we have been looking for the best way to create FAQ pages or sections on WordPress sites.",
			logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/WordPress_blue_logo.svg/512px-WordPress_blue_logo.svg.png",
			link: "https://example.com",
		},
		{
			name: "Plugin Name 4",
			description:
				"At ShapedPlugin LLC, we have been looking for the best way to create FAQ pages or sections on WordPress sites.",
			logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/WordPress_blue_logo.svg/512px-WordPress_blue_logo.svg.png",
			link: "https://example.com",
		},
		{
			name: "Plugin Name 5",
			description:
				"At ShapedPlugin LLC, we have been looking for the best way to create FAQ pages or sections on WordPress sites.",
			logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/WordPress_blue_logo.svg/512px-WordPress_blue_logo.svg.png",
			link: "https://example.com",
		},
		{
			name: "Plugin Name 6",
			description:
				"At ShapedPlugin LLC, we have been looking for the best way to create FAQ pages or sections on WordPress sites.",
			logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/WordPress_blue_logo.svg/512px-WordPress_blue_logo.svg.png",
			link: "https://example.com",
		},
	];

	return (
		<div className="ml-5">
			<div className="flex justify-between items-center p-5 pb-20 bg-white ">
				<div>
					<div className="flex justify-between items-center gap-3"><span className="text-4xl font-extrabold">Accordions</span> <span className="text-base">By PickPlugins</span></div>
					<div className="font-mono text-sm">Version: 2.3.1</div>
				</div>
				<div className="">

					<div className="flex items-center  gap-2 py-3 px-5 cursor-pointer  capitalize bg-amber-500 text-white font-medium rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Upgrade</div>
					<div className="my-4 max-w-52">Help us by providing your feedbacks and five star reviews on wordpress.org
						🌟🌟🌟🌟🌟
					</div>
				</div>
			</div>

			<PGtabs
				activeTab="overview"
				orientation=""
				tabsWrapperClass="mt-[-50px] "
				contentClass=" w-full"
				navItemsWrapClass="gap-3 px-10"
				navItemClass=" px-5 py-3 gap-2 rounded-t-md"
				navItemSelectedClass="!bg-white border-2  border-b-0 border-solid  border-blue-700"
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
						title: "Free Vs Pro",
						icon: styles,
						className: "tab-disable-blocks",
					},
					{
						name: "templates",
						title: "About Us",
						icon: postAuthor,
						className: "tab-disable-blocks",
					},
				]}>
				<PGtab name="overview">
					<div className="flex gap-4 items-start flex-wrap mt-10 px-10">
						<div className="flex-1 flex flex-col gap-3 p-[40px] max-w-[70%] bg-white rounded-md shadow-md">
							<h2 className="text-[32px] font-semibold text-gray-800">
								Super Excited to See you!
							</h2>
							<p className="text-gray-500 text-[14px]">
								Thanks for installing Accordions plugin! Watch this video to get started.







							</p>
							<iframe
								width="100%"
								height="400"
								src="https://www.youtube.com/embed/9PS63kqe20M?si=8osl4q7yCx7c8BGY"
								title="YouTube video player"
								className="rounded-md overflow-hidden"
								frameborder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								referrerpolicy="strict-origin-when-cross-origin"
								allowfullscreen></iframe>

						</div>
						<div className="grid md:grid-cols-1 grid-cols-3 content-between md:max-w-[30%] max-w-full gap-3 text-gray-800">
							<div className="flex flex-col gap-3 bg-white p-[20px] rounded-md shadow-md">
								<div className="text-[18px] font-semibold flex items-center gap-2">
									<span>🌟</span>Videos
								</div>
								<p>
									Join the PickPlugins Facebook group to share your experiences, ideas, and feedback!

								</p>
								<a
									href="#"
									className="inline-block  font-medium px-[16px] py-[8px] border border-solid border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white rounded-md w-max transition-colors duration-300">
									Watch on YouTube
								</a>
							</div>
							<div className="flex flex-col gap-3 bg-white p-[20px] rounded-md shadow-md">
								<div className="text-[18px] font-semibold flex items-center gap-2">
									<span>🌟</span>Documentation
								</div>
								<p>
									Check out our detailed documentation to learn what the Accordions plugin can do!







								</p>
								<a
									href="#"
									className="inline-block font-medium px-[16px] py-[8px] border border-solid border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white rounded-md w-max transition-colors duration-300">
									Check Documentation
								</a>
							</div>
							<div className="flex flex-col gap-3 bg-white p-[20px] rounded-md shadow-md">
								<div className="text-[18px] font-semibold flex items-center gap-2">
									<span>🌟</span>Need Help?
								</div>
								<p>
									Contact our friendly support team for quick and personalized help!
								</p>
								<a
									href="#"
									className="inline-block font-medium px-[16px] py-[8px] border border-solid border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white rounded-md w-max transition-colors duration-300">
									Create Support Ticket
								</a>
							</div>
						</div>
					</div>


				</PGtab>
				<PGtab name="edit">
					<div className=" rounded-md   mt-10">
						<table className="table-auto w-full text-left">
							<thead className="bg-gray-700 text-white">
								<tr className="">
									<th className="min-w-[550px] py-4 px-8">FEATURES</th>
									<th className="min-w-[100px] py-4 px-8 text-center">Lite</th>
									<th className="min-w-[100px] py-4 px-8 text-center">👑PRO</th>
								</tr>
							</thead>
							<tbody className="bg-gray-100 text-gray-800">
								{tableData.map((item, index) => (
									<tr
										key={index}
										className="even:bg-gray-200 last:rounded-b-md last:overflow-hidden">
										<td className="py-3 px-8">
											{item.feature}{" "}
											{item.new && (
												<span className="text-emerald-100 inline-block text-[12px] leading-none px-2 py-1 bg-emerald-500 rounded-full">
													NEW
												</span>
											)}{" "}
											{item.hot && (
												<span className="text-red-100 inline-block text-[12px] leading-none px-2 py-1 bg-red-500 rounded-full">
													HOT
												</span>
											)}
										</td>
										<td className="py-3 px-8  text-center">
											{typeof item.lite === "number"
												? item.lite
												: item.lite === "true"
													? "✔️"
													: item.lite === "false"
														? "❌"
														: item.lite}
										</td>
										<td className="py-3 px-8 text-center">
											{typeof item.pro === "number"
												? item.pro
												: item.pro === "true"
													? "✔️"
													: item.pro === "false"
														? "❌"
														: item.pro}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</PGtab>
				<PGtab name="templates">
					<div className="grid grid-cols-2 gap-4 w-full p-7 bg-white mt-10">
						<div>
							<h1 className="text-2xl font-medium mb-4">
								The Most Powerful Accordion and FAQs Builder plugin for
								WordPress from the Easy Accordion Team, ShapedPlugin, LLC
							</h1>
							<p className="mb-4 text-pretty">
								At ShapedPlugin LLC, we have been looking for the best way to
								create FAQ pages or sections on WordPress sites. Unfortunately,
								we couldn't find any suitable plugin that met our needs. Hence,
								we set a simple goal: to develop a highly customizable and
								full-featured Accordion and FAQs builder plugin to minimize
								customer support costs.
							</p>
							<p className="mb-4 text-pretty">
								The Easy Accordion plugin provides a convenient way to create
								visually appealing FAQ pages to reduce customer costs. Check it
								out now and experience the difference!
							</p>
							<div className="flex gap-4">
								<a
									href="#"
									className="bg-gray-700 border-transparent border border-solid font-medium text-white inline-block py-[14px] px-[24px] rounded-md">
									Explore Easy Accordion
								</a>
								<a
									href="#"
									className="hover:bg-gray-700 border-gray-700 text-gray-700 hover:text-white border border-solid font-medium transition-colors duration-300 inline-block py-[14px] px-[24px] rounded-md">
									More About Us
								</a>
							</div>
						</div>
						<div className="self-center">
							<figure>
								<img
									src="https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
									alt=""
									className="w-full rounded-lg shadow-sm object-contain"
								/>
								<figcaption className="text-sm text-center mt-2">
									ShapedPlugin Team
								</figcaption>
							</figure>
						</div>
					</div>
					<div>
						<h3 className="text-2xl font-medium my-8">
							Improve your website with our top-notch plugins!
						</h3>
						<div className="grid grid-cols-3 gap-4">
							{ourPlugins.map((plugin) => (
								<div className="bg-gray-200 hover:bg-gray-300 shadow-sm p-8 rounded-lg relative">

									<h4 className="font-medium text-lg mb-4">{plugin.name}</h4>
									<p className="text-[14px]">{plugin.description}</p>
									<a href={plugin.link} className="absolute inset-0"></a>
								</div>
							))}
						</div>
					</div>
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
