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

function generateFakeCode(prefix, minValue, maxValue) {
  const rand = faker.number.int({ min: minValue, max: maxValue });
  const paddedRand = rand > 9 ? rand : "0" + rand;
  return prefix + paddedRand;
}

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    throw err;
  }

  console.log("Inserting into THONGTINDATCOC");

  // Insert data into the database using Faker
  const insertData = () => {
    var fakeMaKH = generateFakeCode("KH00", 1, 40);
    var fakeMaXe = generateFakeCode("XE00", 1, 40);
    var fakeMaNV = generateFakeCode("NV00", 1, 40);
    var fakeSoTienDC = faker.number.float({ min: 20000, max: 200000 });
    var fakeNgayNhanXe = faker.date.betweens({
      from: "2000-01-01T00:00:00.000Z",
      to: "2023-01-01T00:00:00.000Z",
      count: 1,
    });
    var fakeNgayKy = faker.date.betweens({
      from: "2000-01-01T00:00:00.000Z",
      to: "2023-01-01T00:00:00.000Z",
      count: 1,
    });
    var fakePTTT = faker.helpers.arrayElement([
      "Cash",
      "Banking",
      "Visa",
      "Momo",
    ]);
    var fakeMaKM = generateFakeCode("KM00", 1, 20);

    const query =
      "INSERT INTO THONGTINDATCOC (MaKH, MaXe, MaNV, SoTienDC, NgayNhanXe, NgayKy, PTTT, MaKM) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      fakeMaKH,
      fakeMaXe,
      fakeMaNV,
      fakeSoTienDC,
      fakeNgayNhanXe,
      fakeNgayKy,
      fakePTTT,
      fakeMaKM,
    ];

    connection.query(query, values, (err, results) => {
      if (err) {
        console.error("Error inserting data:", err);
        throw err;
      }
      // Close the connection after inserting data
    });
  };

  // Insert data 10 times (you can adjust the number as needed)
  for (let i = 0; i < 50; i++) {
    insertData();
  }
  connection.end();
});
