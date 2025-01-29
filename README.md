# Real-Time Device Tracking App

This project is a real-time device tracking application built using Node.js, Express, Socket.IO, and Leaflet.js. It allows multiple devices to share their live locations on a map in real time. The application is designed to track devices and display their positions dynamically on a map interface.

## Features

- **Real-Time Tracking:** Tracks the live location of multiple devices simultaneously.
- **Interactive Map:** Uses Leaflet.js to display a map with markers for each device.
- **Dynamic Updates:** Updates device positions in real time using WebSockets (Socket.IO).
- **Cross-Device Support:** Works on any device with a modern browser and geolocation support.
- **Re-center Button:** Allows users to re-center the map to their current location.

## Technologies Used

1. **Node.js**

   - A JavaScript runtime built on Chrome's V8 engine, used to build the backend server.
   - Handles client connections, processes location data, and broadcasts updates.

2. **Express**

   - A minimal and flexible Node.js web application framework.
   - Used to serve the frontend (HTML, CSS, JS) and handle routing.

3. **Socket.IO**

   - A library for real-time, bidirectional communication between clients and the server.
   - Enables real-time updates of device locations across all connected clients.

4. **Leaflet.js**

   - A lightweight, open-source JavaScript library for interactive maps.
   - Provides the map interface and handles markers for device locations.

5. **HTML, CSS, JavaScript**

   - Used to build the frontend interface and handle user interactions.

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js (v16 or higher)**
- **npm (Node Package Manager, comes with Node.js)**
- **A modern web browser with geolocation support (e.g., Chrome, Firefox, Edge)**

## How to Run the Project

### Step 1: Clone the Repository

Open your terminal or command prompt and run:

```bash
git clone https://github.com/your-username/realtime-tracking-app.git
```

Navigate to the project directory:

```bash
cd realtime-tracking-app
```

### Step 2: Install Dependencies

Install the required dependencies using npm:

```bash
npm install
```

This will install:

- Express
- Socket.IO
- Other dependencies listed in `package.json`

### Step 3: Start the Server

Run the following command to start the server:

```bash
node app.js
```

The server will start running on port 3000. You should see the following message in the terminal:

```
Server running on port 3000
```

### Step 4: Access the Application

Open your web browser and navigate to:

```
http://localhost:3000
```

Allow the browser to access your location when prompted. You should see a map with your current location marked.

## Running the Tracker on Multiple Devices

### Step 1: Find Your IPv4 Address

#### On Windows:

- Open Command Prompt.
- Run `ipconfig`.
- Look for the IPv4 Address under your active network adapter.

#### On macOS/Linux:

- Open Terminal.
- Run `ifconfig` or `ip addr`.
- Look for the `inet` address under your active network adapter.

### Step 2: Access the Application on Another Device

On another device connected to the same network, open a browser and navigate to:

```
http://<your-IPv4-address>:3000
```

Example: If your IPv4 address is `192.168.1.100`, use:

```
http://192.168.1.100:3000
```

Allow location access when prompted. Both devices will now show their live locations on the map in real-time.

## Project Structure

```
realtime-tracking-app/
├── node_modules/          # Node.js dependencies
├── public/                # Static files (CSS, JS, images)
│   ├── css/
│   │   └── style.css      # Custom styles for the app
│   ├── js/
│   │   └── script.js      # Client-side JavaScript logic
│   └── favicon.ico        # App icon
├── views/
│   └── index.ejs          # Main HTML template
├── app.js                 # Backend server logic
├── package.json           # Project dependencies and scripts
├── package-lock.json      # Lock file for dependencies
└── README.md              # Project documentation
```

## How It Works

### Client-Side:

1. The browser uses the Geolocation API to fetch the device's current coordinates.
2. The coordinates are sent to the server via Socket.IO.

### Server-Side:

1. The server receives the coordinates and broadcasts them to all connected clients.
2. It also handles client disconnections and removes their markers from the map.

### Real-Time Updates:

Each client listens for updates and dynamically adds/updates markers on the map.

## Customization

- **Map Style:** Customize the map style by using different tile layers from providers like Mapbox or OpenStreetMap.
- **Marker Icons:** Replace the default Leaflet markers with custom icons.
- **Additional Features:** Add features like device names, popups, or routes.

## Troubleshooting

### No Location Access:

- Ensure your browser has permission to access your device's location.
- Check if the Geolocation API is supported by your browser.

### Markers Not Updating:

- Verify that the server is running and clients are connected.
- Check the browser console for errors.

### Cannot Access on Another Device:

- Ensure both devices are connected to the same network.
- Verify that the firewall allows incoming connections on port 3000.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments

- **Leaflet.js** for the interactive map.
- **Socket.IO** for real-time communication.
- **OpenStreetMap** for the map tiles.

Enjoy tracking devices in real time! 🚀

