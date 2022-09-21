import React, { useRef, useState, useEffect } from "react";
import { MdLocationOn } from "react-icons/md";

import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

const containerStyle = {
  width: "700px",
  height: "700px",
};

const center = { lat: 28.351839, lng: 79.409561 };

function MyComponent() {
  const [directions, setDirections] = useState("");
  const [distance, setDistance] = useState("");
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();
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
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirections(results);
    setDistance(results.routes[0].legs[0].distance.text);
    console.log(results.routes[0].legs[0].distance.text);
  }
  function clearRoute() {
    setDirections(null);
    setDistance("");
  }

  return isLoaded ? (
    <>
      <div className=" bg-[#F4F8FA] h-[930px]">
        <h1 className="text-center text-xl font-medium text-[#1B31A8] pt-8">
          Let's calculate distance from Google maps
        </h1>
        <div className="flex">
          <div className="w-1/2 p-44">
            <div className="flex">
              <div className="w-1/2">
                <label className="mb-2 text-sm">Origin</label>

                <Autocomplete>
                
                   <div>
                   <div className="text-red-600 text-4xl pt-2 absolute">
                      <MdLocationOn />
                    </div>
                    <input
                      className="w-64 h-14 mb-8 outline outline-none border border-gray-300 rounded-md pl-10 text-2xl text-[#4D6475] font-medium "
                      type="text"
                      placeholder="source"
                      ref={originRef}
                    />
               </div>
                </Autocomplete>
                <label className="mb-2 text-sm">Destination</label>

                <Autocomplete>
                  <>
                  <div className="text-red-600 text-4xl pt-2 absolute">
                      <MdLocationOn />
                    </div>
                  <input
                    className="w-64 h-14 outline outline-none border border-gray-300 rounded-md pl-10 text-2xl text-[#4D6475] font-medium"
                    type="text"
                    placeholder="destination"
                    ref={destiantionRef}
                  />
                  </>
                </Autocomplete>
              </div>
              <div className="flex justify-center items-center w-1/2">
                <button
                  className="w-32 h-16 bg-[#1B31A8] rounded-full text-white font-medium text-xl"
                  onClick={calculateRoute}
                >
                  Calculate
                </button>
              </div>
            </div>
            <div className=" mt-14 border border-gray-300 ">
              <div className="bg-[#FFFFFF] h-20 p-6 flex justify-between">
                <h1 className="text-[#1E2A32] text-xl font-medium">Distance</h1>
                <h1 className="text-[#0079FF] text-4xl font-medium">{distance}</h1>
              </div>
              <div className="bg-[#F4F8FA] h-20 p-6">
                <h1>The distance between <span></span> and Delhi is 1,427 kms.</h1>
               
              </div>
            </div>
          </div>
          <div className="w-1/2 flex justify-center mt-20 drop-shadow-md  shadow-gray-400">
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
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
