<?php
// MongoDB Configuration
define('MONGODB_URI', 'mongodb://localhost:27017');
define('MONGODB_DBNAME', 'anwb_traffic_data');

// API Configuration
define('API_URL', 'https://api.anwb.nl/v2/incidents?apikey=QYUEE3fEcFD7SGMJ6E7QBCMzdQGqRkAi&polylines=true&polylineBounds=true&totals=true');

// Collection Limit
define('COLLECTION_SIZE_LIMIT', 100);

// Data Fetch Interval (in minutes)
define('FETCH_INTERVAL_MINUTES', 5);
?>
