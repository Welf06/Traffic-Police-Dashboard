import React from "react";

import { Typography } from "@material-tailwind/react";

import progressGreen from "../Assets/progress_green.svg";
import progressRed from "../Assets/progress_red.svg";
import progressGreenEnd from "../Assets/progress_green_end.svg";
import progressRedEnd from "../Assets/progress_red_end.svg";

function LocationList() {
	const sampleData = [
		{
			name: "RV Public School Rhastriya Vidyalaya Road",
			distance: "0",
			time: "10:35 am",
		},
		{
			name: "Patel M Kempiah Circle",
			distance: "0.4",
			time: "10:36 am",
		},
		{
			name: "JC Road",
			distance: "1.2",
			time: "10:38 am",
		},
		{
			name: "Mysore Road",
			distance: "1.6",
			time: "",
		},
		{
			name: "Hudson Circle",
			distance: "2.4",
			time: "",
		},
		{
			name: "Corporation Circle",
			distance: "3.2",
			time: "",
		},
		{
			name: "Vydehi Hospital",
			distance: "4.4",
			time: "",
		},
	];

	let maxDistance = 0;
	sampleData.forEach((data) => {
		if (data.time !== "") {
			maxDistance = Math.max(maxDistance, parseFloat(data.distance));
		}
	});

	function Progress({ data, index }) {
		return (
			<div className="relative inline-block md:w-[25%] lg:w-[20%]">
				{index === sampleData.length - 1 ? (
					<img
						src={data.time === "" ? progressRedEnd : progressGreenEnd}
						alt="progress"
						className="h-[auto] w-[100%]"
					></img>
				) : (
					<img
						src={data.time === "" ? progressRed : progressGreen}
						alt="progress"
						className="h-[auto] w-[100%]"
						style={{ zIndex: 1 }} // Ensure the image is behind the text
					/>
				)}
            {data.time === "" && (
               <div
					className="absolute md:top-4 lg:top-5 left-0 w-full h-full flex items-top justify-center"
					style={{ zIndex: 2 }} // Ensure the text is on top of the image
				>
					{/* Your overlay text */}
					<span className="text-white text-xs">
						{" "}
						{Math.floor(parseFloat(data.distance) - maxDistance)} mins
					</span>
				</div>
            )}
			</div>
		);
	}

	return (
		<div className="w-[100%] flex flex-col items-center gap-4">
			<Typography className="md:test-md lg:text-lg font-bold">
				North Region
			</Typography>
			<div>
				{sampleData.map((data, index) => (
					<div key={index} className="flex items-top gap-4">
						<Progress data={data} index={index} />

						<div className="flex flex-col w-[80%] mt-1">
							<Typography className="md:text-xs lg:text-sm">
								{data.name}
							</Typography>
							{data.time !== "" ? (
								<Typography className="md:text-[0.7rem] lg:text-xs text-gray-400">
									{data.distance} km | {data.time}
								</Typography>
							) : (
								<Typography className="md:text-[0.7rem] lg:text-xs text-gray-400">
									{data.distance} km
								</Typography>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default LocationList;
