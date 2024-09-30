# Traffic Monitoring System

This project provides a traffic monitoring system using MongoDB as the database and PHP for the backend. The system fetches traffic data from the ANWB API and stores it in a MongoDB database, which can then be retrieved and displayed on a frontend using a map and table format.

## Features

- **Map Display**: Shows traffic incidents, jams, roadworks, and radars on a map using Leaflet.js.
- **Real-time Updates**: Data is fetched from the ANWB API every 5 minutes and stored in MongoDB.
- **REST API**: Provides a REST API that uses GET requests to fetch traffic incidents from the database for certain time in history.
- **Filtering**: Current data can be filtered by the selected date using the date slider on the frontend. 
  
## Prerequisites

Before running the project, you will need the following installed on your machine:

### My Environment Details

- **PHP**: 8.2.24
- **MongoDB**: 8.0.0
- **Composer**: 2.7.9 (Dependency Manager for PHP)
- **MongoDB PHP Driver**: 1.18.1 Thread Safe (TS) x64 
- **MongoDB PHP Library**: 1.19.1 (Installed via Composer)
  - This library provides PHP bindings for MongoDB operations.


### 1. Clone the Project from GitHub

```bash
git clone https://github.com/cankobanz/TrafficMonitoringSystem.git
cd TrafficMonitoringSystem
```

### 2. MongoDB Setup

- Install and run [MongoDB 8.0.0](https://www.mongodb.com/try/download/community).
- Ensure MongoDB is running locally on port `27017`.


### 3. Setup

1. **Composer**: Necessary for PHP Library installation. Follow the [official Composer installation guide](https://getcomposer.org/download/) to install it on your system.


2. **MongoDB PHP Driver**: Ensure that the **MongoDB PHP driver** is installed correctly on your system.

   - To install the driver, follow the [official MongoDB PHP Driver installation guide](https://www.php.net/manual/en/mongodb.installation.php). If you are using Windows, you can also follow following steps.
   - For **Windows** users, ensure that you download the correct version of the driver. For **PHP 8.2.24** and **MongoDB PHP Driver 1.18.1**, download the appropriate version from [PECL](https://pecl.php.net/package/mongodb). 
     - Choose the **DLL** option, unzip the package, and move the `php_mongodb.dll` file to your `php/ext` directory.
     - Then, open your `php.ini` file and add the following line to enable the MongoDB extension:
       ```
       extension=mongodb
       ```
     - After editing the `php.ini` file, restart your web server to apply the changes.



3. **MongoDB PHP Library**:

   Install the MongoDB PHP Library using Composer by running the following command:

   ```bash
   composer require mongodb/mongodb:^1.19.1
   ```

### 4. Run the application
Go to the root directory of the project:
   ```bash
   cd ./TrafficMonitoringSystem
   ```

Start the PHP built-in server by running the following command:
   ```bash
   php -S localhost:8000
   ```

Open your web browser and navigate to the following URL:
   ```
   http://localhost:8000
   ```

This will open the main page of the application, from where you can navigate to the frontend and backend functionality. 

In the following image, you can find the demonstration of the application.
![Main Page](images/MainPage.png)

### File Structure

```
yourproject/
├── backend/
│   ├── api.php                # REST API to retrieve traffic data from database
│   ├── config.php             # Configuration file for MongoDB, API URL, and other constants
│   ├── database.php           # MongoDB database connection file
│   ├── fetch_data.php         # Fetches and inserts traffic data into MongoDB
│   └── vendor/                # Dependency directory, installed via Composer
├── frontend/
│   ├── css/                   # CSS files for styling
│   ├── images/                # Images used in the frontend (e.g., for map markers)
│   ├── js/                    # JavaScript files for map, table, and slider functionality
│   └── index.html             # Main frontend interface showing traffic data and map
├── index.html                 # Entry point page with links to frontend and backend
└── README.md                  # Documentation for the project
```

---

This structure provides a clean overview of the project, and the commands guide users through running the application and viewing the traffic monitoring system.
