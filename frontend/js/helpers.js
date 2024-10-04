// --------------- Table Helper Functions ---------------
// These functions are primarily used by table.js for data formatting and populating tables.

// Function to format a date, optionally including time if available
export function formatDate(dateString) {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    // Check if the time exists
    const hasTime = dateString.includes('T') && dateString.includes(':');
    return hasTime ? `${formattedDate}, ${date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}` : formattedDate;
}

// Helper function to clear the table
export function clearTable(tableBody) {
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
}

// Function to convert the slider value to a date string (future date based on the slider value)
export function getFormattedDate(value, baseDate = new Date()) {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + parseInt(value));
    return date.toISOString().split('T')[0];
}

// --------------- Map Helper Functions ---------------
// These functions are used in map.js to handle map-related operations such as adding markers, popups, and polylines.

// Function to capitalize each word in a string
export function capitalizeFirstLetterOfEachWord(str) {
    return str.split('-').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
}

// Function to create Leaflet icons
export function createIcon(iconUrl, iconSize) {
    return L.icon({
        iconUrl: iconUrl,
        iconSize: iconSize,
        iconAnchor: [iconSize[0] / 2, iconSize[1] / 2],  // Centering the icon
        popupAnchor: [0, -iconSize[1] / 2]  // Positioning the popup
    });
}

// Function to generate popup content
export function generatePopupContent(data) {
    let content = '';

    if (data.road) {
        content += `<strong>Road:</strong> ${data.road}<br>`;
    }

    if (data.category) {
        content += `<strong>Incident Type:</strong> ${capitalizeFirstLetterOfEachWord(data.category)}<br>`;
    }

    if (data.incidentType && data.category !== "radars") {
        content += `<strong>Status:</strong> ${capitalizeFirstLetterOfEachWord(data.incidentType)}<br>`;
    }

    if (data.delay) {
        content += `<strong>Delay:</strong> ${(data.delay / 60)} minutes<br>`;
    }

    if (data.from) {
        content += `<strong>From:</strong> ${data.from}<br>`;
    }

    if (data.to) {
        content += `<strong>To:</strong> ${data.to}<br>`;
    }

    if (data.reason) {
        content += `<strong>Reason:</strong> ${data.reason}<br>`;
    }

    if (!content) {
        content = `<strong>No information available.</strong>`;
    }

    return content;
}

// Function to add a marker with a popup
export function addMarkerWithPopup(location, data, icon, map) {
    if (!location) {
        console.log('No location data available');
        return;
    }
    const marker = L.marker([location.lat, location.lon], { icon: icon }).addTo(map);
    marker.bindPopup(generatePopupContent(data));
}
