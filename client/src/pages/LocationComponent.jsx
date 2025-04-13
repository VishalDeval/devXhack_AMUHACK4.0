import React, { useState } from 'react';
import axios from 'axios';

const LocationComponent = () => {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          setLocation({ lat: latitude, lon: longitude });

          try {
            await axios.post('/api/save-location', {
              latitude,
              longitude,
            });
            console.log("Location sent to server");
          } catch (error) {
            console.error("Failed to send location:", error);
          }

          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error.message);
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <button
        onClick={getLocation}
        className="text-sm text-white bg-[#fd5b5b] hover:bg-[#1f88d9] hover:drop-shadow-[0_0_5px_#1f88d9] text-center rounded-3xl w-60 h-8 p-1 ml-10 drop-shadow-[0_0_5px_#fd5b5b] cursor-pointer"
        disabled={loading}
      >
        {loading ? 'Getting location...' : 'Nearby Dr. / Medical Store'}
      </button>

      {location.lat && (
        <p className=" text-lg text-white">
          📍 Latitude: {location.lat}, Longitude: {location.lon}
        </p>
      )}
    </div>
  );
};

export default LocationComponent;
