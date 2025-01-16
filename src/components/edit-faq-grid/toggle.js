import { ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import React from "react";

const Toggle = ({ label, value, onChange }) => {
	return (
		<div className="flex items-center gap-2 justify-between ">
			<span>
				{value
					? __("Enabled.", "accordions")
					: __("Disabled.", "accordions")}
			</span>
			<ToggleControl
				// help={value ? __("Enabled", "accordions") : __("Disabled.", "accordions")}
				checked={value ? true : false}
				onChange={(e) => {
					onChange(!value);
				}}
			/>
		</div>
	);
};

export default Toggle;
