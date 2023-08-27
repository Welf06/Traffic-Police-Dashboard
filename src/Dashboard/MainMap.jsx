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

function MainMap() {
	const [currentLocation, setCurrentLocation] = useState(null);
	const [directions, setDirections] = useState(null);

	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
	});

	const [map, setMap] = useState(null);

	useEffect(() => {
		const geolocation = navigator.geolocation;

		if (geolocation) {
			geolocation.getCurrentPosition((position) => {
				setCurrentLocation({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
			});
		}
	}, []);

	const onLoad = useCallback(
		function callback(map) {
			//  const bounds = new window.google.maps.LatLngBounds(currentLocation || center);
			//  map.fitBounds(bounds);

			setMap(map);
		},
		[currentLocation]
	);

	const onUnmount = useCallback(function callback() {
		setMap(null);
	}, []);

	useEffect(() => {
		if (!isLoaded) {
			return;
		}

		const directionsService = new window.google.maps.DirectionsService();

		// Define start and end positions
		const startLocation = currentLocation;
		const endLocation = { lat: 12.95, lng: 77.605 };

		// Calculate route when both start and end positions are available
		if (startLocation && endLocation) {
			const request = {
				origin: startLocation,
				destination: endLocation,
				travelMode: "DRIVING",
			};

			directionsService.route(request, (result, status) => {
				if (status === "OK") {
					setDirections(result);
				}
			});
		}
	}, [isLoaded, currentLocation]);
   
   const mapOptions = {
      mapTypeControlOptions: {
        mapTypeIds: []
      },
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_TOP
      }
    };

	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={currentLocation}
			zoom={10}
			onLoad={onLoad}
			onUnmount={onUnmount}
         options={mapOptions}
		>
			{/* Child components, such as markers, info windows, etc. */}
			{directions && <DirectionsRenderer directions={directions} />}
			{/* Marker A (Start) */}
			{currentLocation && (
				<Marker
					position={currentLocation}
					label="Ambulance" // Change the label content
				/>
			)}
			{/* Marker B (End) */}
			<Marker
				position={{ lat: 12.95, lng: 77.605 }} // Change this to your end location
				label="B" // Change the label content
			/>
		</GoogleMap>
	) : (
		<></>
	);
}

export default memo(MainMap);
