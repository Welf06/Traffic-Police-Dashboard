import React, { memo, useCallback, useState, useEffect } from "react";
import {
	GoogleMap,
	useJsApiLoader,
	DirectionsRenderer,
	Marker,
} from "@react-google-maps/api";

const containerStyle = {
	width: "100%",
	height: "100%",
};

const center = {
	lat: 12.9716,
	lng: 77.5946,
};

function MainMap({ curData, mini }) {
	const [directions, setDirections] = useState(null);

	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
	});

	const [map, setMap] = useState(null);

   const mapOptions = {
      mapTypeControlOptions: {
        mapTypeIds: []
      },
      streetViewControl: false,
      zoomControl: mini ? false : true,
      fullscreenControl: mini ? false : true,
    };


	const onLoad = useCallback(
		function callback(map) {
			//  const bounds = new window.google.maps.LatLngBounds(currentLocation || center);
			//  map.fitBounds(bounds);
			setMap(map);
		},
		[curData]
	);

	const onUnmount = useCallback(function callback() {
		setMap(null);
	}, []);

	useEffect(() => {
		if (!isLoaded) {
			return;
		}

		const directionsService = new window.google.maps.DirectionsService();

		// Calculate route when both start and end positions are available
		if (curData) {
			const request = {
				origin: curData.start,
				destination: curData.end,
				travelMode: "DRIVING",
			};

			directionsService.route(request, (result, status) => {
				if (status === "OK") {
					setDirections(result);
				}
			});
		}
      mapOptions.zoomControlOptions =  {
         position: window.google.maps.ControlPosition.RIGHT_TOP
       }
	}, [isLoaded, curData]);
   

	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={curData.start}
			zoom={10}
			onLoad={onLoad}
			onUnmount={onUnmount}
         options={mapOptions}
		>
			{/* Child components, such as markers, info windows, etc. */}
			{directions && <DirectionsRenderer directions={directions} />}
		</GoogleMap>
	) : (
		<></>
	);
}

export default memo(MainMap);
