import React from "react";
import { useState } from "react";

import { Typography } from "@material-tailwind/react";

import MainMap from "./MainMap";
import LocationList from "./LocationList";
import MiniMaps from "./MiniMaps";

import logo from "../Assets/logo.png";
import sampleData from './sampleData.json'


function Dashboard() {
   const [curData, setCurData] = useState(sampleData[0])
	const [currentLocation, setCurrentLocation] = useState(sampleData[0].start);
	const [endLocation, setEndLocation] = useState(sampleData[0].end);
   const [data, setData] = useState(sampleData)

	return (
		<>
			<div className="flex gap-4 p-4 min-h-[95vh]">
				<div className="md:w-[30%] lg:w-[25%]">
					<div className="h-[70%] overflow-auto">
						<LocationList curData={curData}/>
					</div>
					<div className="h-[30%] flex flex-col items-center justify-center gap-1 mt-4">
						<Typography className="text-gray-400 md:text-md lg:text-lg">
							Powered by
						</Typography>
						<img
							src={logo}
							alt="logo"
							className="md:h-12 md:w-24 lg:h-16 lg:w-32"
						></img>
					</div>
				</div>
				<div className="md:w-[70%] lg:w-[75%]">
					<div className="h-[70%]">
						<MainMap
							curData={curData}
                     mini={false}
						/>
					</div>
               <div className="h-[30%]">
                  <MiniMaps curData={curData} data={data} setCurData={setCurData}/>
               </div>
				</div>
			</div>
		</>
	);
}

export default Dashboard;
