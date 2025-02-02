import React, { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS

const MapComponent = () => {
  // Default position set to UCLA's coordinates
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
  );
};

export default MapComponent;
