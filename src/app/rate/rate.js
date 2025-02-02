'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import dynamic from "next/dynamic";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS

// Dynamically import the MapComponent with SSR disabled
const MapComponent = dynamic(() => import("./map"), { ssr: false });

export default function UpdatePitStop() {
  const [features, setFeatures] = useState({
    AllDayAccess: false,
    LGBTQfriendly: false,
    wheelChairFriendly: false
  });
  const [locationName, setLocationName] = useState('');

  const handleToggle = (feature) => {
    setFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

  useEffect(() => {
    var config = {
      method: 'get',
      url: 'https://api.geoapify.com/v1/geocode/autocomplete?text=Mosco&apiKey=81aba2aee5154efaa881fffe1da2b70d',
      headers: { }
    };
    
    axios(config)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);

//   id: {
//     requried: true,
//     type: String,
// },
// type: {
//     required: true,
//     type: String,
// },
// name: {
//     required: true,
//     type: String,
// },
// location: {
//     type: {
//         type: String,
//         enum: ['Point'],
//         required: true,
//     },
//     coordinates: {
//         type: [Number],
//         required: true,
//     },
// },
// AllDayAccess: {
//     require: true,
//     type: Boolean,
// },
// LGBTQfriendly: {
//     required: true,
//     type: Boolean
// },
// wheelChairFriendly: {
//     required: true,
//     type: Boolean,
// },

const handleSave = async () => {
  try {
    console.log('Sending request...');
    const response = await axios.post('http://localhost:3001/create/createPitStop', {
      id: "1",
      type: "pitStop",
      name: locationName,
      location: {
        type: "Point",
        coordinates: [markerPosition[0], markerPosition[1]]
      },
      AllDayAccess: features.AllDayAccess,
      LGBTQfriendly: features.LGBTQfriendly,
      wheelChairFriendly: features.wheelChairFriendly
    });
    console.log('Response:', response);
    alert('Features saved successfully!');
  } catch (error) {
    console.error('Error:', error);
    alert('Error saving features. Please try again.');
  }
};
const [position, setPosition] = useState([34.0689, -118.4452]); // UCLA coordinates
  const [markerPosition, setMarkerPosition] = useState(null);
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    // Override Leaflet's default marker icon to prevent 404 error
    const defaultIcon = new L.Icon({
      iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon-2x.png", // Direct URL to Leaflet marker icon
      iconSize: [25, 41], // Size of the marker
      iconAnchor: [12, 41], // Anchor point of the icon
      popupAnchor: [1, -34], // Popup position relative to the icon
      shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png", // Direct URL to Leaflet shadow image
      shadowSize: [41, 41], // Size of the shadow
    });

    L.Marker.prototype.options.icon = defaultIcon; // Apply to all markers

    // Get current location if possible
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]); // Set map center to user's current location
        },
        (error) => {
          console.error("Geolocation error: ", error);
        }
      );
    }
  }, []);

  // Capture map click events and set marker coordinates
  const MapClick = () => {
    useMapEvent("click", (e) => {
      const { lat, lng } = e.latlng; // Extract latitude and longitude from click event
      setMarkerPosition([lat, lng]); // Set marker position
      setCoords(`Latitude: ${lat}, Longitude: ${lng}`); // Set coordinates for display
    });
    return null;
  };

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <div className="mb-4">
          <label htmlFor="locationName" className="block text-sm font-medium text-gray-700">Location Name</label>
          
          
          <input
            type="text"
            id="locationName"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter location name"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
          />
        </div>
        
        {Object.keys(features).map((feature) => (
          <button
            key={feature}
            onClick={() => handleToggle(feature)}
            className={`w-full p-2 rounded ${
              features[feature] 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {feature}: {features[feature] ? '✓' : '✗'}
          </button>
        ))}
      </div>




      <div style={{ height: "70vh", width: "70%" }}>
        <p>Marker Coordinates: {coords}</p>
      <MapContainer
        center={position} // Use the user's position or default to UCLA
        zoom={13}
        style={{ height: "70%", width: "70%" }}
        whenCreated={(map) => {
          map.locate({ setView: true, maxZoom: 16 }); // Optional: Locate the user automatically on map load
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClick />
        {markerPosition && (
          <Marker position={markerPosition}>
            {/* Ensure that the popup is correctly added to the marker */}
            <Popup>{coords}</Popup>
          </Marker>
        )}
      </MapContainer>
    
    </div>




      <button
        onClick={handleSave}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Save Features
      </button>
    </div>
  );
}


// // const RatePage = () => {
// //   return (
// //     <div>
// //       <h1>Rate Page</h1>
// //       <MapComponent />
// //     </div>
// //   );
// // };

// // export default RatePage;
// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from "react-leaflet";
// import L from "leaflet";

// const MapComponent = () => {
//   const [position, setPosition] = useState(null); // To store user's position
//   const [markerPosition, setMarkerPosition] = useState(null); // To store marker position
//   const [error, setError] = useState(null); // To handle geolocation errors
//   const [coords, setCoords] = useState(null); // To store the coordinates of the marker

//   // Handle user geolocation
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setPosition([position.coords.latitude, position.coords.longitude]);
//         },
//         (error) => {
//           setError(error.message);
//         }
//       );
//     } else {
//       setError("Geolocation is not supported by this browser.");
//     }
//   }, []);

//   // Handle map clicks
//   const MapClick = () => {
//     useMapEvent("click", (e) => {
//       const { lat, lng } = e.latlng; // Get latitude and longitude of the clicked location
//       setMarkerPosition([lat, lng]); // Set the marker position
//       setCoords(`Latitude: ${lat}, Longitude: ${lng}`); // Display coordinates
//     });
//     return null;
//   };

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!position) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={{ height: "100vh", width: "100%" }}>
//       <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
//         {/* TileLayer for the map */}
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         {/* Handle map clicks */}
//         <MapClick />
//         {/* If a marker is placed, display it */}
//         {markerPosition && (
//           <Marker position={markerPosition}>
//             <Popup>{coords}</Popup>
//           </Marker>
//         )}
//       </MapContainer>

//       {/* Display coordinates */}
//       {coords && (
//         <div>
//           <p>Marker Coordinates: {coords}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MapComponent;
