// const socket = io();


// // if(navigator.geolocation){
// //     navigator.geolocation.watchPosition(
// //         (position)=>{
// //             const {latitude, longitude} = position.coords;
// //             socket.emit("send-location",{latitude,longitude});
// //         },
// //         (error)=>{
// //             // console.log(error);
// //             console.error("Geolocation error:", error);
// //             alert("Unable to retrieve your location. Please enable location services.");
// //         },
// //         {
// //             enableHighAccuracy:true,
// //             timeout:5000,
// //             maximumAge:0,
// //         }

// //     );
// // } else{
// //     console.log("Geolocation is not supported by this browser.");
// //     alert("Geolocation is not supported by your browser.");
// // }
// // Wait for the user's location to set the map view
// const map = L.map("map");
// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     attribution: "StreetMap-byShashwat",
// }).addTo(map);
// console.log("Map initialized");

// // Set initial map view to the user's location
// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//         (position) => {
//             const { latitude, longitude } = position.coords;
//             map.setView([latitude, longitude], 16); // Set initial view to the user's location
//             console.log(`Initial map view set to [${latitude}, ${longitude}]`);
//         },
//         (error) => {
//             console.error("Geolocation error:", error);
//             alert("Unable to retrieve your location. Please enable location services.");
//             map.setView([20, 77], 10); // Fallback to a default view (e.g., India)
//         }
//     );
// } else {
//     console.error("Geolocation is not supported by this browser.");
//     alert("Geolocation is not supported by your browser.");
//     map.setView([20, 77], 10); // Fallback to a default view (e.g., India)
// }


// // Watch for location updates
// if (navigator.geolocation) {
//     navigator.geolocation.watchPosition(
//         (position) => {
//             const { latitude, longitude } = position.coords;
//             socket.emit("send-location", { latitude, longitude });
//             console.log(`Sent location: [${latitude}, ${longitude}]`);
//         },
//         (error) => {
//             console.error("Geolocation error:", error);
//         },
//         {
//             enableHighAccuracy: true,
//             timeout: 5000,
//             maximumAge: 0,
//         }
//     );
// }

// // const map = L.map("map").setView([0,0], 16);

// // L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
// //     attribution: "StreetMap-byShashwat",
// // }).addTo(map);

// const markers ={};

// socket.on("receive-location", (data) => {
//     console.log("Received location data:", data);
//     const { id, latitude, longitude } = data;
//     if (latitude && longitude) {
//         if (markers[id]) {
//             markers[id].setLatLng([latitude, longitude]);
//             console.log(`Updated marker for ${id}`);
//         } else {
//             markers[id] = L.marker([latitude, longitude]).addTo(map);
//             console.log(`Added marker for ${id}`);
//         }
//     }
// });

// socket.on("user-disconnected", (id) => {
//     if (markers[id]) {
//         map.removeLayer(markers[id]);
//         delete markers[id];
//         console.log(`Removed marker for ${id}`);
//     }
// });


const socket = io();

// Check for geolocation support and watch position
// if (navigator.geolocation) {
//     navigator.geolocation.watchPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         socket.emit("send-location", { latitude, longitude });
//     }, 
//     (error) => {
//         console.log(error);
//     },
//     {
//         enableHighAccuracy: true,
//         timeout: 5000,
//         maximumAge: 0,
//     });
// } else {
//     console.log("Geolocation is not supported by this browser.");
// }

// Initialize the map
const map = L.map("map").setView([20, 77], 5);

// Add a tile layer to the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "StreetMap-byShashwat"
}).addTo(map);

// Store markers by user ID
const markers = {};

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            map.setView([latitude, longitude], 16); // Center map on the user's location
            console.log(`Initial map view set to [${latitude}, ${longitude}]`);
        },
        (error) => {
            console.error("Geolocation error:", error);
            alert("Unable to retrieve your location. Defaulting to India.");
        }
    );
} else {
    console.error("Geolocation is not supported by this browser.");
    alert("Geolocation is not supported by your browser. Defaulting to India.");
}


// Watch for location updates and send them to the server
if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            // Round coordinates to 6 decimal places
            const roundedLat = parseFloat(latitude.toFixed(6));
            const roundedLng = parseFloat(longitude.toFixed(6));
            socket.emit("send-location", { latitude, longitude });
        },
        (error) => {
            console.error("Geolocation error:", error);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        }
    );
}

// Listen for incoming location data from the server
// socket.on("receive-location", (data) => {
//     const { id, latitude, longitude } = data;
//     map.setView([latitude, longitude]);
//     if (markers[id]) {
//         // Update the marker's position
//         markers[id].setLatLng([latitude, longitude]);
//     } else {
//         // Create a new marker if it doesn't exist
//         markers[id] = L.marker([latitude, longitude]).addTo(map);
             
//     }
// });

socket.on("receive-location", (data) => {
    const { id, latitude, longitude } = data;

    if (markers[id]) {
        // Update the marker's position
        markers[id].setLatLng([latitude, longitude]);
        console.log(`Updated marker for user: ${id}`);
    } else {
        // Create a new marker if it doesn't exist
        markers[id] = L.marker([latitude, longitude]).addTo(map);
        console.log(`Added marker for user: ${id}`);
    }
});



// Remove markers when a user disconnects
// socket.on("user-disconnected", (id) => {
//     if (markers[id]) {
//         map.removeLayer(markers[id]);
//         delete markers[id];
//     }
// });

// Handle user disconnection
socket.on("user-disconnected", (id) => {
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
        console.log(`Removed marker for user: ${id}`);
    }
});


// Re-center button functionality
document.getElementById("recenter-btn").addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                map.setView([latitude, longitude], 16); // Re-center to user's location
            },
            (error) => {
                console.error("Geolocation error:", error);
                alert("Unable to retrieve your location.");
            }
        );
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});