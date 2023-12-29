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

  console.log("Connected to MySQL database");

  // Insert data into the database using Faker
  const insertData = () => {
    const rand = faker.number.int({ min: 1, max: 80 });
    if (rand > 9) {
      fakeMaXe = "XE00" + rand;
    } else {
      fakeMaXe = "XE000" + rand;
    }
    const fakeMaTTS = faker.number.int({ min: 1, max: 55 });
    const fakeGiaTri = faker.number.float({ min: 1, max: 2000 });
    const fakeDonVi = faker.helpers.arrayElement(
      // Distance
      "km",
      "m",
      "mi",
      "yd",

      // Speed
      "km/h",
      "m/s",
      "mph",
      "kn",

      // Time
      "s",
      "min",
      "h",

      // Fuel Efficiency
      "km/L",
      "mpg",

      // Mass
      "kg",
      "g",
      "lb",

      // Power
      "kW",
      "hp",

      // Torque
      "Nm",
      "lb-ft",

      // Temperature
      "°C",
      "°F",

      // Pressure
      "Pa",
      "kPa",
      "psi",

      // Volume
      "L",
      "mL",
      "gal",

      // Angle
      "°",
      "rad",

      // Percentage
      "%"
    );

    const query =
      "INSERT INTO GIATRITHONGSO (MaXe, MaTTS, GiaTri, DonVi ) VALUES (?, ?, ?, ?)";
    const values = [fakeMaXe, fakeMaTTS, fakeGiaTri, fakeDonVi];

    connection.query(query, values, (err, results) => {
      if (err) {
        console.error("Error inserting data:", err);
        throw err;
      }
      console.log("Data inserted successfully");
      // Close the connection after inserting data
    });
  };

  // Insert data 10 times (you can adjust the number as needed)
  for (let i = 0; i < 100; i++) {
    insertData();
  }
  connection.end();
});
