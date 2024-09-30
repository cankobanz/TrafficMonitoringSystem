// const api_url_time = '2024-09-30T06:53:00.251Z';  // Set this variable to null or empty if you don't want to filter by time. Ex: 2024-09-29T21:05:57.812Z
const api_url_time = ''
// Construct the API URL based on whether the time parameter is provided
export const API_URL = api_url_time 
    ? `http://localhost:8000/backend/api.php?time=${api_url_time}`  // Use the time query parameter
    : 'http://localhost:8000/backend/api.php';  // Fetch the latest data without time filtering

export const FETCH_DATA_URL = 'http://localhost:8000/backend/fetch_data.php';  // URL to update the database
export const INTERVAL_MINUTES = 5;  // Update database interval in minutes
