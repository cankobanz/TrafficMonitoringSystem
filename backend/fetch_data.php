<?php
require 'database.php';  // Connect to MongoDB

// Function to fetch data from ANWB API
function fetchTrafficData() {
    $jsonData = file_get_contents(API_URL); // API_URL Come from database.php -> config.php
    return json_decode($jsonData, true);
}

// Function to limit the collection size based on config setting
function limitCollectionSize($collection, $maxSize = COLLECTION_SIZE_LIMIT) { // COLLECTION_SIZE_LIMIT Come from database.php -> config.php
    $count = $collection->countDocuments();
    if ($count > $maxSize) {
        $excess = $count - $maxSize;
        // Remove older documents, sorted by natural order (_id)
        for ($i = 0; $i < $excess; $i++) {
            //  sort documents based on their _uploaded_at values, find the oldest and delete it
            $collection->findOneAndDelete([], ['sort' => ['_uploaded_at' => 1]]);
        }
    }
}

// Function to insert traffic data and maintain collection size
function insertTrafficData($collection) {
    $trafficData = fetchTrafficData();

    if ($trafficData) {
        $collection->insertOne($trafficData); // Insert data
        limitCollectionSize($collection);  // Maintain collection size based on config
        echo "Data inserted and collection limited to " . COLLECTION_SIZE_LIMIT . " records.\n";
    } else {
        echo "Failed to fetch data.\n";
    }
}

// Connect to the database and collection
$collection = connectToDatabase()->selectCollection('incidents');

// Insert data with the default limit from config
insertTrafficData($collection);
?>
