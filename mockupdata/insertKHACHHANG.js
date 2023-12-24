const mysql = require("mysql");
const { faker } = require('@faker-js/faker/locale/vi');

// MySQL database configuration
const dbConfig = {
  host: "localhost",
  user: "qltt",
  password: "password",
  database: "QuanLyShowroomOto",
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
    const fakeTenKH = faker.person.fullName();
    const fakeSDT = faker.phone.number();
    const fakeEmail = faker.internet.email();
    const fakeLoaiKH = faker.helpers.arrayElement(['Thường', 'VIP', 'Khách sỉ']);

    const query = 'INSERT INTO KHACHHANG (TenKH, SDT, Email, LoaiKH) VALUES (?, ?, ?, ?)';
    const values = [fakeTenKH, fakeSDT, fakeEmail, fakeLoaiKH];

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
  for (let i = 0; i < 100; i++) {
    insertData();
  }
connection.end();
});
