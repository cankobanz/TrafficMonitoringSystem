import { createIcon, generatePopupContent, addMarkerWithPopup } from './helpers.js';

// Initialize the map using Leaflet
export function initMap() {
    const map = L.map('map').setView([52.3702, 4.8952], 8);  // Center the map on the Netherlands

    // Add a tile layer (map background)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    return map;
}

// Function to update the map with traffic data (jams, roadworks, radars)
export function updateMap(data, map) {
    // Clear all existing markers and polylines
    map.eachLayer(layer => {
        if (layer instanceof L.Marker || layer instanceof L.Polyline) {
            map.removeLayer(layer);
        }
    });

    // Define the icons for radar, jams, and roadworks
    const radarIcon = createIcon('images/radar.png', [15, 15]);
    const jamIcon = createIcon('images/jam.png', [15, 15]);
    const roadworkIcon = createIcon('images/roadwork.png', [20, 20]);

    // Loop through the data from the database
    // Loop through the data from the database
    data.forEach(incident => {
        // Loop through each road in the incident
        incident.roads.forEach(road => {
            // Loop through each segment in the road
            road.segments.forEach(segment => {
                // Handle jams, roadworks, and radars for each segment
                handleJams(segment.jams, map, jamIcon);
                handleRoadworks(segment.roadworks, map, roadworkIcon);
                handleRadars(segment.radars, map, radarIcon);
            });
        });
    });

}

// Function to handle jams data and markers
function handleJams(jams, map, icon) {
    if (!jams) return;
    jams.forEach(jam => {
        if (jam.polyline) {
            // If delay is higher than or equal to 600, red. If less than 600, orange. If not available, blue.
            const color = (jam.delay >= 600) ? 'red' : (jam.delay ? 'orange' : 'blue');
            addPolyline(jam.polyline, jam, map, color);
        } else {
            addMarkerWithPopup(jam.fromLoc, jam, icon, map);
        }
    });
}

// Function to handle roadworks data and markers
function handleRoadworks(roadworks, map, icon) {
    if (!roadworks) return;
    roadworks.forEach(roadwork => {
        if (roadwork.polyline) {
            addPolyline(roadwork.polyline, roadwork, map, 'black');
        } else {
            addMarkerWithPopup(roadwork.fromLoc, roadwork, icon, map);
        }
    });
}

// Function to handle radars data and markers
function handleRadars(radars, map, icon) {
    if (!radars) return;
    radars.forEach(radar => {
        if (radar.loc && radar.loc.lat && radar.loc.lon) {
            addMarkerWithPopup(radar.loc, radar, icon, map);
        } else {
            console.log('No location data available for radar');
        }
    });
}

// Function to add a polyline to the map
function addPolyline(encodedPolyline, data, map, color) {
    if (!encodedPolyline) {
        console.log(`No polyline data available for ${data.incidentType || data.type}`);
        return;
    }

    const latlngs = polyline.decode(encodedPolyline);
    const polylineLayer = L.polyline(latlngs, {
        color: color,
        weight: 5,
        opacity: 0.7,
        smoothFactor: 1
    }).addTo(map);

    polylineLayer.bindPopup(generatePopupContent(data));
}
