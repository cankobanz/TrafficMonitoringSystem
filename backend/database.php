<?php
require 'config.php';
require 'vendor/autoload.php';

// MongoDB client setup function using config values
function connectToDatabase() {
    $client = new MongoDB\Client(MONGODB_URI);
    return $client->selectDatabase(MONGODB_DBNAME);
}
?>
