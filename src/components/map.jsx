import React from "react";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";

const Map = ({ directions }) => {
  const containerStyle = {
    width: "550px",
    height: "550px",
  };

  const center = { lat: 28.351839, lng: 79.409561 };
  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={7}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        <Marker />
        {directions && <DirectionsRenderer directions={directions} />}
        <></>
      </GoogleMap>
    </div>
  );
};

export default Map;
