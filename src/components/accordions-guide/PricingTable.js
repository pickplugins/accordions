import React from "react";

const PricingTable = ({ data }) => {
	return (
		<div className="bg-white rounded-md">
			<div className="flex items-center justify-center gap-2 py-5">
				<span className="text-gray-700 line-through text-xl font-medium">
					{data.price}
				</span>
				<span className="text-gray-700 text-3xl font-bold">
					{data.salePrice}
				</span>
			</div>
			<div className="bg-[#450077] py-4 text-center text-white text-xl font-bold">
				{data.title}
			</div>
			{data.features.map((item, i) => (
				<div className="py-[8px] text-center font-medium border-b border-solid border-b-gray-200">
					{item}
				</div>
			))}
			<div className="flex  items-center justify-center p-4">
				<a
					href={data.link}
					className="px-8 py-3 no-underline bg-[#450077] text-white cursor-pointer rounded-md"
				>
					Buy Now <i className="fas fa-cart-plus"></i>
				</a>
			</div>
		</div>
	);
};

export default PricingTable;
