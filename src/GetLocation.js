// import React, { useState, useEffect } from 'react';

// function GetLocation() {
//   const [position, setPosition] = useState({
//     latitude: null,
//     longitude: null,
//     accuracy: null,
//     altitude: null,
//     heading: null, // Heading is also available
//     speed: null, // Not directly supported
//   });
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       const timeoutId = setTimeout(() => {
//         setError("Geolocation timed out.");
//       }, 10000); // Set a 10-second timeout

//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           clearTimeout(timeoutId);
//           setPosition({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//             accuracy: position.coords.accuracy,
//             altitude: position.coords.altitude,
//             heading: position.coords.heading,
//           });
//         },
//         (error) => {
//           clearTimeout(timeoutId);
//           setError(error.message);
//         }
//       );
//     } else {
//       setError("Geolocation is not supported by this browser or device.");
//     }
//   }, []);

//   return (
//     <div>
//       {error ? (
//         <p>Error: {error}</p>
//       ) : position.latitude && position.longitude ? (
//         <p>
//           Latitude: {position.latitude} <br />
//           Longitude: {position.longitude} <br />
//           Accuracy: ±{position.accuracy} meters <br />
//           Altitude: {position.altitude} meters (if available) <br />
//           Heading: {position.heading} degrees (if available) <br />
//           Speed: Not directly supported by this API <br />
//         </p>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

// export default GetLocation;

import React, { useState, useEffect } from 'react';

function GetLocation() {
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      // Check if running in a network-only environment
      if (typeof window === 'undefined') { // This check is not foolproof, but can be an indicator
        setError("Geolocation is not available in this environment.");
        return;
      }

      const timeoutId = setTimeout(() => {
        setError("Geolocation timed out.");
      }, 10000); // Set a 10-second timeout

      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(timeoutId);
          setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          clearTimeout(timeoutId);
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser or device.");
    }
  }, []);

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : position.latitude && position.longitude ? (
        <p>
          Latitude: {position.latitude} <br /> Longitude: {position.longitude}
        </p>
      ) : (
        <p>Geolocation is not available.</p>
      )}
    </div>
  );
}

export default GetLocation;
