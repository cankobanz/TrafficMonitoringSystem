<?php
// This is the REST API file that builds the connection between Frontend and Backend.
require 'database.php'; // Include the database connection file

// Tells the client (frontend in this case) what to expect (json in this case)
header("Content-Type: application/json"); 

// Connect to MongoDB
$database = connectToDatabase();
$collection = $database->selectCollection('incidents');

// Initialize the query array
$query = [];

// Check if a time parameter is provided in the URL query
if (!empty($_GET['time'])) {
    $time = $_GET['time'];  // Get the time from the query parameters
    $query['_uploaded_at'] = $time; // Filter by _uploaded_at field
} else {
    // If no time is provided, sort by _uploaded_at in descending order (to get the latest) and limit to 1
    $cursor = $collection->find([], ['sort' => ['_uploaded_at' => -1], 'limit' => 1]);
    $incidents = iterator_to_array($cursor);
    
    // Return the latest incident as JSON
    echo json_encode($incidents);
    exit();
}

// Fetch the incidents based on the query
$cursor = $collection->find($query);
$incidents = iterator_to_array($cursor);

// Return results as JSON
echo json_encode($incidents);

// Example usage:
// http://localhost:8000/backend/api.php?time=2024-09-30T10:32:58.166Z  --> Fetch incidents with _uploaded_at = 2024-09-01
// http://localhost:8000/backend/api.php  --> Fetch the latest uploaded data
?>
