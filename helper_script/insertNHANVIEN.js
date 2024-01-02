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

  console.log("Inserting into NHANVIEN");

  // Insert data into the database using Faker
  const insertData = () => {
    const fakeTenNV = faker.person.fullName();
    const fakeDiaChi = faker.location.streetAddress({ useFullAddress: true });
    const fakeSDT = faker.phone.number();
    const fakeEmail = faker.internet.email();
    const fakeBangCap = faker.helpers.arrayElement(['Không', 'Đại học', 'Cao Đẳng', 'Thạc Sĩ']);
    const fakeVT = faker.person.jobType();
    const fakeNVL = faker.date.betweens({ from: '2000-01-01T00:00:00.000Z', to: '2023-01-01T00:00:00.000Z', count: 1 });
    const fakeBD = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });

    const query = 'INSERT INTO NHANVIEN (TenNV, DiaChi, SDT, Email, BangCap, ViTri, NgayVL, NgaySinh) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [fakeTenNV, fakeDiaChi, fakeSDT, fakeEmail, fakeBangCap, fakeVT, fakeNVL, fakeBD];

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
