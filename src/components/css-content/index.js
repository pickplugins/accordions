const { Component } = wp.element;
import { __ } from "@wordpress/i18n";
import { Button, Dropdown } from "@wordpress/components";
import { useState } from "@wordpress/element";
import {
	__experimentalInputControl as InputControl,
	ColorPalette,
} from "@wordpress/components";
function Html(props) {
	if (!props.warn) {
		return null;
	}
	//var content = props.val == null || props.val == undefined ? "" : props.val.replaceAll('"', "");
	var content = props.val == null || props.val == undefined ? "" : props.val;

	// content = content.replaceAll("u0022", "");
	// content = content.replaceAll("&quot;", "");

	console.log(content);

	function escapeHTML(str) {
		const map = {

			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#039;'
		};
		return str.replace(/[<>"']/g, function (match) {
			return map[match];
		});
	}

	function unescapeHTML(str) {
		const map = {

			'&lt;': '<',
			'&gt;': '>',
			'&quot;': '"',
			'&#039;': "'"
		};
		return str.replace(/&lt;|&gt;|&quot;|&#039;/g, function (match) {
			return map[match];
		});
	}

	return (
		<div className="mt-4">
			<InputControl
				value={unescapeHTML(content)}
				type="text"
				onChange={(newVal) => {
					if (newVal.includes("attr")) {
						props.onChange(escapeHTML(newVal), "content");
					}
					else {
						console.log(newVal);


						props.onChange(escapeHTML(newVal), "content");
					}
				}}
			/>
		</div>
	);
}
class PGcssContent extends Component {
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
		var { val, onChange } = this.props;
		return <Html val={val} onChange={onChange} warn={this.state.showWarning} />;
	}
}
export default PGcssContent;
