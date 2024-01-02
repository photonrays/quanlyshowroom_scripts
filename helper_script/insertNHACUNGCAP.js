const mysql = require("mysql");
const { faker } = require("@faker-js/faker/locale/vi");
require("dotenv").config();

// Your database configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

// Create a MySQL connection
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    throw err;
  }

  console.log("Inserting into NHACUNGCAP");

  // Insert data into the database using Faker
  const insertData = (name) => {
    const fakeTenNCC = name;
    const fakeSDT = faker.phone.number();
    const fakeDiaChi = faker.location.streetAddress({ useFullAddress: true });
    const query =
      "INSERT INTO NHACUNGCAP (TenNCC, DiaChi, SDT) VALUES (?, ?, ?)";
    const values = [fakeTenNCC, fakeDiaChi, fakeSDT];

    connection.query(query, values, (err, results) => {
      if (err) {
        console.error("Error inserting data:", err);
        throw err;
      }
      // Close the connection after inserting data
    });
  };

  // Insert data 10 times (you can adjust the number as needed)
  const carRetailCompanyNames = [
    "DriveHub",
    "AutoVista",
    "VelocityCars",
    "CruiseCrafters",
    "WheelWonders",
    "RoadRovers",
    "MetroMotors",
    "PinnacleAutomobiles",
    "UrbanDrive",
    "SkylineCars",
    "EpicAutos",
    "NexGenMotors",
    "GlobeGearheads",
    "SprintWheels",
    "ZenithAutomotive",
    "PrimeDrive",
    "TitanMotors",
    "HorizonCars",
    "EliteAutoEmporium",
    "ZenDrive",
    "EverGreenWheels",
    "PrestigeMotors",
    "SummitAutos",
    "InfiniteRides",
    "OpulentVehicles",
    "VistaDrive",
    "PanoramaCars",
    "WheelsOfWonder",
    "LuxeLanes",
    "EcoMotionAutos",
    "StarDrive",
    "EagleEyeAutomobiles",
    "ThunderWheels",
    "UrbanCarriage",
    "VoyageVehicles",
    "AllureAutomotives",
    "QuantumCars",
    "NobleWheels",
    "FrontierAutos",
    "DriveElegance",
    "VelocityVehicles",
    "EverlastingMotors",
    "CosmicCars",
    "LegacyDrive",
    "StratosphereAutos",
    "CascadeMotors",
    "ZenithWheels",
  ];
  for (let i = 0; i < carRetailCompanyNames.length; i++) {
    insertData(carRetailCompanyNames[i]);
  }
  connection.end();
});
