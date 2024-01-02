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

  console.log("Inserting into KHACHHANG");

  // Insert data into the database using Faker
  const insertData = () => {
    const fakeTenKH = faker.person.fullName();
    const fakeSDT = faker.phone.number();
    const fakeEmail = faker.internet.email();
    const fakeTongChiTieu = faker.number.float({ min: 300000000, max: 2000000000 });

    const query = 'INSERT INTO KHACHHANG (TenKH, SDT, Email, TongChiTieu ) VALUES (?, ?, ?, ?)';
    const values = [fakeTenKH, fakeSDT, fakeEmail, fakeTongChiTieu];

    connection.query(query, values, (err, results) => {
      if (err) {
        console.error('Error inserting data:', err);
        throw err;
      }
      // Close the connection after inserting data
    });
  };


  // Insert data 10 times (you can adjust the number as needed)
  for (let i = 0; i < 100; i++) {
    insertData();
  }
connection.end();
});
