import { API_URL, FETCH_DATA_URL , INTERVAL_MINUTES } from './config.js';

export async function fetchTrafficData() {
    try {
        const response = await fetch(API_URL); // Use centralized API URL
        return await response.json();
    } catch (error) {
        console.error('Error fetching traffic data:', error);
        return [];
    }
}

export async function startBackendInitially() {
    try {
        const response = await fetch(FETCH_DATA_URL);
        const data = await response.text(); // fetch_data.php likely returns text
        console.log('Data fetched from backend:', data);
    } catch (error) {
        console.error('Error fetching backend data:', error);
    }
}


export function scheduleBackendUpdate(intervalMinutes = INTERVAL_MINUTES) { // Default to 5 minutes if no interval is provided
    const intervalMilliseconds = intervalMinutes * 60 * 1000; // Convert minutes to milliseconds
    setInterval(() => {
        fetch(FETCH_DATA_URL)
            .then(response => response.text()) // fetch_data.php likely returns text
            .then(data => console.log('Data fetched from backend:', data))
            .catch(error => console.error('Error fetching backend data:', error));
    }, intervalMilliseconds);  // Use the interval in milliseconds
}


// Function to manually filter data for the selected date
export function filterDataByDate(data, selectedDate) {
    const filteredResults = []; // Array to store the relevant incidents

    // Helper function to check relevance of jams or roadworks
    function checkRelevance(items, selectedDate) {
        return items.filter(item => {
            const startDate = item.start ? new Date(item.start).toISOString().split('T')[0] : null;
            const stopDate = item.stop ? new Date(item.stop).toISOString().split('T')[0] : null;

            // Check different cases for startDate and stopDate
            if (!startDate && !stopDate) return true;
            // if (startDate && !stopDate && startDate <= selectedDate) return true;
            if (startDate && !stopDate && !item.delay && startDate <= selectedDate) return true;
            if (startDate && !stopDate && item.delay && startDate == selectedDate) return true;
            if (!startDate && stopDate && selectedDate <= stopDate) return true;
            if (startDate && stopDate && startDate <= selectedDate && stopDate >= selectedDate) return true;
            return false;
        });
    }

    // Loop through each incident in the data
    data.forEach(incident => {
        const filteredRoads = [];  // Store filtered roads

        // Loop through each road in the incident
        if (incident.roads) {
            incident.roads.forEach(road => {
                const filteredSegments = []; // Store filtered segments for each road

                // Loop through each segment in the road
                road.segments.forEach(segment => {
                    const relevantJams = segment.jams ? checkRelevance(segment.jams, selectedDate) : [];
                    const relevantRoadworks = segment.roadworks ? checkRelevance(segment.roadworks, selectedDate) : [];

                    // Always keep radars without filtering them
                    const radars = segment.radars || [];

                    // Only add segments that have relevant jams, roadworks, or radars
                    if (relevantJams.length || relevantRoadworks.length || radars.length) {
                        filteredSegments.push({
                            start: segment.start,
                            end: segment.end,
                            jams: relevantJams.length ? relevantJams : undefined,
                            roadworks: relevantRoadworks.length ? relevantRoadworks : undefined,
                            radars: radars.length ? radars : undefined  // Keep radars unchanged
                        });
                    }
                });

                // If the road has filtered segments, add it to filtered roads
                if (filteredSegments.length) {
                    filteredRoads.push({
                        ...road,
                        segments: filteredSegments  // Attach the filtered segments
                    });
                }
            });
        }

        // If the incident has filtered roads, add it to the filtered results
        if (filteredRoads.length) {
            filteredResults.push({
                ...incident,
                roads: filteredRoads  // Attach filtered roads
            });
        }
    });

    return filteredResults;
}

