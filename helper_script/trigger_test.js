const mysql = require("mysql");
const assert = require("assert");
const { faker } = require("@faker-js/faker/locale/vi");
require("dotenv").config();

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

// Function to execute a SQL query with promises
function executeQuery(query, values) {
  const connection = mysql.createConnection(dbConfig);

  return new Promise((resolve, reject) => {
    connection.connect();

    connection.query(query, values, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        reject(err);
      }

      resolve(results);

      connection.end();
    });
  });
}

// Function to generate a fake date
function generateFakeDate() {
  return faker.date.betweens({
    from: "2019-01-01T00:00:00.000Z",
    to: "2023-01-01T00:00:00.000Z",
    count: 1,
  });
}

// Function to generate a fake supplier code
function generateFakeSupplierCode() {
  const rand = faker.number.int({ min: 1, max: 40 });
  return rand > 9 ? `NCC00${rand}` : `NCC000${rand}`;
}

// Your test cases
describe("QuanLyShowroomOto trigger tests", () => {
  it("Tăng số lượng xe khi có ct phiếu nhập", async () => {
    // Insert a record into PHIEUNHAP
    const fakeNgayNhap = generateFakeDate();
    const fakeMaNCC = generateFakeSupplierCode();
    const phieuNhapQuery = `INSERT INTO PHIEUNHAP (NgayNhap, MaNCC) VALUES (?, ?)`;
    const phieuNhapValues = [fakeNgayNhap, fakeMaNCC];

    await executeQuery(phieuNhapQuery, phieuNhapValues);

    // Insert a record into CTPHIEUNHAP
    const ctpQuery = `
      INSERT INTO CTPHIEUNHAP (MaCTPN, MaPN, TenXe, LoaiXe, HangXe, Gia, SoLuong, ThanhTien)
      VALUES ('XE0002', 'PN0001', 'Honda Civic', 'Compact', 'Brand1', 20000, 5, 100000)
    `;
    await executeQuery(ctpQuery);

    // Check if the XE table is updated
    const selectQuery = 'SELECT * FROM XE WHERE TenXe = "Honda Civic"';
    const results = await executeQuery(selectQuery);

    const updatedXERow = results[0];
    assert.ok(updatedXERow.SoLuong > 5, true);
  });

  it("Cập nhật giá trị thông số khi nhập thông số xe", async () => {
    // Insert a record into THONGSOXENHAP
    const insertQuery =
      'INSERT INTO THONGSOXENHAP (MaCTPN, TenTS, GiaTri, DonVi) VALUES ("CTPN0001", "TestTS", "TestValue", "TestUnit")';
    await executeQuery(insertQuery);

    // Check if the giatrithongso table is updated
    const selectQuery =
      "SELECT * FROM GIATRITHONGSO WHERE MaXe = (SELECT MaXe FROM XE WHERE TenXe = (SELECT TenXe FROM CTPHIEUNHAP WHERE MaCTPN = 'CTPN0001'))";
    const results = await executeQuery(selectQuery);

    assert.equal(results.length, 1);
  });
});

