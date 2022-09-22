import React, { useRef, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import Map from "../src/components/map";

import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import Navbar from "./components/navbar";

function App() {
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

  //function to calculate routes 

  const Route = async (event) => {
    event.preventDefault();
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const data = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirections(data);
    setDistance(data.routes[0].legs[0].distance.text);
    console.log(data.routes[0].legs[0].distance.text);
  };

  
  // console.log(typeof(directions.request.origin))
  console.log(directions);

  return isLoaded ? (
    <>

    {/* form div  */}
      <div className=" bg-[#F4F8FA] min-h-screen">
    <Navbar />
        <h1 className="text-center text-md text-[#1B31A8] pt-8">
          Let's calculate <span className="font-medium">distance</span> from
          Google maps
        </h1>
        <div className="flex">
          <div className="w-1/2 p-28">
            <div className="flex">
              <div className="w-1/2">
                <label className="mb-4 text-sm">Origin</label>

                <Autocomplete>
                  <div>
                    <div className="text-red-600 text-4xl pt-2 absolute">
                      <MdLocationOn />
                    </div>
                    <input
                      className="w-64 h-14 mb-8 outline  outline-none border border-gray-300 rounded-md pl-10 text-2xl text-[#4D6475] font-medium "
                      type="text"
                      placeholder="Origin"
                      ref={originRef}
                    />
                  </div>
                </Autocomplete>
                <label className="mb-4 text-sm">Destination</label>

                <Autocomplete>
                  <>
                    <div className="text-red-600 text-4xl pt-2 absolute">
                      <MdLocationOn />
                    </div>
                    <input
                      className="w-64 h-14 outline outline-none border border-gray-300 rounded-md pl-10  text-2xl text-[#4D6475] font-medium"
                      type="text"
                      placeholder="destination"
                      ref={destiantionRef}
                    />
                  </>
                </Autocomplete>
              </div>
              <div className="flex justify-center items-center w-1/2">
                <button
                  className="w-32 h-14 bg-[#1B31A8] text-center rounded-full text-white font-medium text-md"
                  onClick={Route}
                >
                  Calculate
                </button>
                
              </div>
            </div>
            <div className=" mt-14 border border-gray-300  rounded-md">
              <div className="bg-[#FFFFFF] h-20 p-6 flex justify-between">
                <h1 className="text-[#1E2A32] text-xl font-medium">Distance</h1>
                <h1 className="text-[#0079FF] text-3xl font-medium">
                  {!distance ? null : distance}
                </h1>
              </div>
              <div className="bg-[#F4F8FA] h-20 p-6">
                <h1>
                  The distance between{" "}
                  <span className="font-bold">
                    {!directions ? null : directions.request.origin.query}
                  </span>{" "}
                  and{" "}
                  <span className="font-bold">
                    {!directions ? null : directions.request.destination.query}
                  </span>{" "}
                  is <span className="font-bold">{distance}</span>.
                </h1>
              </div>
            </div>
          </div>
          <div className="w-1/2 flex justify-center mt-4 drop-shadow-md  shadow-gray-400">
            <Map directions={directions} />
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}

export default App;
