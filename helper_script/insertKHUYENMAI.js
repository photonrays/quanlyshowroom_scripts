const mysql = require("mysql");
const { faker } = require('@faker-js/faker/locale/vi');
require('dotenv').config();

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
    const fakeTenKM = faker.word.adjective() + " " + faker.word.noun();
    const PhanTram  = faker.number.int({ min: 5, max: 50 });
    const MoTa  = faker.lorem.sentence();
    const NgayBD = faker.date.betweens({ from: '2023-01-01T00:00:00.000Z', to: '2024-01-01T00:00:00.000Z', count: 1 });
    const NgayKT = faker.date.betweens({ from: '2024-02-01T00:00:00.000Z', to: '2025-01-01T00:00:00.000Z', count: 1 });

    const query = 'INSERT INTO KHUYENMAI (TenKM, PhanTram, MoTa, NgayBD, NgayKT ) VALUES (?, ?, ?, ?, ?)';
    const values = [fakeTenKM, PhanTram, MoTa, NgayBD, NgayKT];

    connection.query(query, values, (err, results) => {
      if (err) {
        console.error('Error inserting data:', err);
        throw err;
      }
      console.log("Data inserted successfully");
      // Close the connection after inserting data
    });
  };


  // Insert data 10 times (you can adjust the number as needed)
  for (let i = 0; i < 20; i++) {
    insertData();
  }
connection.end();
});
