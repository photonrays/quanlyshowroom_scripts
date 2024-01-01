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

  console.log("Inserting into LOAIXE");

  // Insert data into the database using Faker
  const insertData = (name) => {
    const fakeTenLX = name;
    const query = "INSERT INTO LOAIXE (TenLX) VALUES (?)";
    const values = [fakeTenLX];

    connection.query(query, values, (err, results) => {
      if (err) {
        console.error("Error inserting data:", err);
        throw err;
      }
      // Close the connection after inserting data
    });
  };

  const carTypes = [
    "Sedan",
    "SUV",
    "Coupe",
    "Convertible",
    "Hatchback",
    "Minivan",
    "Truck",
    "Crossover",
    "Wagon",
    "Electric Vehicle (EV)",
    "Hybrid",
    "Plug-in Hybrid (PHEV)",
    "Sports Car",
    "Luxury Car",
    "Compact Car",
    "Subcompact Car",
    "Off-road Vehicle",
    "Compact SUV",
    "Midsize SUV",
    "Full-size SUV",
    "Supermini",
    "Microcar",
    "Hot Hatch",
    "Pickup Truck",
    "Roadster",
    "Limousine",
    "Estate Car",
    "Minibus",
    "Compact MPV",
    "Mid-size MPV",
    "Full-size MPV",
    "City Car",
    "Targa",
    "Grand Tourer",
    "Estate",
    "Grand Caravan",
    "Compact Pickup Truck",
    "Light Truck",
    "Heavy Truck",
    "Electric Compact Car",
    "Electric SUV",
    "Electric Minivan",
    "Electric Pickup Truck",
    "Fuel Cell Vehicle",
    "Autonomous Vehicle",
    "Flying Car",
    "Hover Car",
    "Solar-Powered Car",
    "Amphibious Car",
    "Concept Car",
    "Supercar",
    "Hypercar",
    "Urban Mobility Vehicle",
    "Submarine Car",
    "Jet-powered Car",
    "Quantum Car",
  ];

  for (let i = 0; i < carTypes.length; i++) {
    insertData(carTypes[i]);
  }
  connection.end();
});
