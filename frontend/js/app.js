import { fetchTrafficData, scheduleBackendUpdate , filterDataByDate} from './data.js';
import { populateTable } from './table.js';
import { initializeSlider } from './slider.js';
import { initMap, updateMap } from './map.js';
import { getFormattedDate } from './helpers.js';

const map = initMap();

// Function to fetch and load traffic data
async function loadTrafficData(selectedDate) {
    const data = await fetchTrafficData();  // Centralized fetch logic
    console.log(data)

    if (!selectedDate) {
        selectedDate = getFormattedDate(0);  // Default to today's date
    }

    const filteredData = filterDataByDate(data, selectedDate);
    populateTable(filteredData);
    updateMap(filteredData, map);  // Update map
}

// Initialize slider to load data on change
initializeSlider(loadTrafficData);

// Load initial data on page load
window.onload = () => loadTrafficData();

scheduleBackendUpdate();  // 5 minutes