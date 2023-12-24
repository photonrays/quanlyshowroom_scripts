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
  const insertData = (name) => {
    const fakeTenNCC = name;
    const fakeSDT = faker.phone.number();
    const fakeDiaChi = faker.location.streetAddress({ useFullAddress: true });
    const query = 'INSERT INTO NHACUNGCAP (TenNCC, DiaChi, SDT) VALUES (?, ?, ?)';
    const values = [fakeTenNCC, fakeDiaChi ,fakeSDT];

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
let TenNCC = [
  'Toyota',
  'Ford',
  'Chevrolet',
  'Honda',
  'Volkswagen',
  'Nissan',
  'Mercedes-Benz',
  'BMW',
  'Audi',
  'Hyundai',
  'Kia',
  'Tesla',
  'Volvo',
  'Mazda',
  'Fiat',
  'Subaru',
  'Jaguar',
  'Land Rover',
  'Porsche',
  'Lexus',
  'Mitsubishi',
  'Jeep',
  'Chrysler',
  'Buick',
  'Cadillac',
  'Acura',
  'Infiniti',
  'GMC',
  'Ram',
  'Mini',
  'Smart',
  'Ferrari',
  'Lamborghini',
  'Maserati',
  'Alfa Romeo',
  'Bentley',
  'Bugatti',
  'McLaren',
  'Rolls-Royce',
  'Aston Martin',
  'Lotus',
  'Koenigsegg'
];
  for (let i = 0; i < TenNCC.length; i++) {
    insertData(TenNCC[i]);
  }
connection.end();
});
