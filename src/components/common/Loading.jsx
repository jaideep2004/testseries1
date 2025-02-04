// components/common/Loading.jsx
import React from "react";

const Loading = ({ size = "default" }) => {
	const sizeClasses = {
		small: "w-5 h-5",
		default: "w-8 h-8",
		large: "w-12 h-12",
	};

	return (
		<div className='flex justify-center items-center'>
			<div
				className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`}
			/>
		</div>
	);
};

export default Loading;
