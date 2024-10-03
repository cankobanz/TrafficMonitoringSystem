<?php
require 'config.php';
require 'vendor/autoload.php';

// MongoDB client setup function using config values
// MongoDB\Client provided by MongoDB PHP library.
// It is the preffered Class for connecting to a MongoDB server
function connectToDatabase() {
    $client = new MongoDB\Client(MONGODB_URI); 
    return $client->selectDatabase(MONGODB_DBNAME);
}
?>
