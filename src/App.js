import React, { useRef, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

const containerStyle = {
  width: "1000px",
  height: "1000px",
};

const center = { lat: 28.351839, lng: 79.409561 }

function MyComponent() {

  const [directions, setDirections] = useState("")
  const [distance, setDistance] = useState('')
   /** @type React.MutableRefObject<HTMLInputElement> */
   const originRef = useRef()
   /** @type React.MutableRefObject<HTMLInputElement> */
   const destiantionRef = useRef()
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAolXVBph__8LXk-JukgnxDUI4LPDQAsxQ",
    libraries: ["places"],
  });

  async function calculateRoute(event) {
    event.preventDefault();
    // if (originRef.current.value === '' || destiantionRef.current.value === '') {
    //   return
    // }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirections(results)
    setDistance(results.routes[0].legs[0].distance.text)
    console.log(results.routes[0].legs[0].distance.text)
    
  }

  return isLoaded ? (
    <>
    
      <Autocomplete>
        <input type="text" placeholder="source" ref={originRef}/>
      </Autocomplete>
      <Autocomplete>
        <input type="text" placeholder="destination"  ref={destiantionRef}/>
      </Autocomplete>
      <button onClick={calculateRoute}>Submit</button>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={7}>
        <Marker />
        {directions && (
            <DirectionsRenderer directions={directions} />
          )}
        <></>
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
