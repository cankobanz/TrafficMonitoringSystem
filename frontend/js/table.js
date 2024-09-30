import { formatDate, clearTable, capitalizeFirstLetterOfEachWord } from './helpers.js';

// Function to populate the table with traffic jams and roadworks data
export function populateTable(data) {
    const tableBody = document.querySelector('#trafficTable tbody');
    let rowIndex = 1;  // Initialize row index for numbering

    // Clear the table first
    clearTable(tableBody);

    // Loop through the data and add rows to the table
    data.forEach(incident => {
        if (incident.roads) {  // Check if the incident has roads
            incident.roads.forEach(road => {
                road.segments.forEach(segment => {  // Iterate through each segment of the road
                    if (segment.jams) {
                        segment.jams.forEach(jam => {
                            const row = createTableRow(rowIndex, jam.road, jam.distance, jam.delay, jam.category, jam.start, jam.stop);
                            tableBody.appendChild(row);
                            rowIndex++;
                        });
                    }
    
                    if (segment.roadworks) {
                        segment.roadworks.forEach(roadwork => {
                            const row = createTableRow(rowIndex, roadwork.road, roadwork.distance, roadwork.delay, roadwork.category, roadwork.start, roadwork.stop);
                            tableBody.appendChild(row);
                            rowIndex++;
                        });
                    }
                });
            });
        }
    });
    
}

// Helper function to create a table row
function createTableRow(rowIndex, road, distance, delay, category, start, stop) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${rowIndex}</td>
        <td>${road || 'Unknown'}</td>
        <td>${distance /1000 || 'N/A'}</td>
        <td>${delay / 60 || 'N/A'}</td>
        <td>${capitalizeFirstLetterOfEachWord(category) || 'N/A'}</td>
        <td>${formatDate(start)}</td>
        <td>${formatDate(stop)}</td>
    `;
    return row;
}
