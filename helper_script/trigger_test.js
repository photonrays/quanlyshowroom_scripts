const mysql = require("mysql");
const assert = require("assert");
const { faker } = require('@faker-js/faker/locale/vi');
require("dotenv").config();

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

// Function to execute a SQL query
function executeQuery(query, values, callback) {
  const connection = mysql.createConnection(dbConfig);

  connection.connect();

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      throw err;
    }

    callback(results);

    connection.end();
  });
}

// Function to generate a fake date
function generateFakeDate() {
  return faker.date.betweens({ from: '2019-01-01T00:00:00.000Z', to: '2023-01-01T00:00:00.000Z', count: 1 });
}

// Function to generate a fake supplier code
function generateFakeSupplierCode() {
  const rand = faker.number.int({ min: 1, max: 40 });
  return rand > 9 ? `NCC00${rand}` : `NCC000${rand}`;
}

// Your test cases
describe("QuanLyShowroomOto trigger tests", () => {
  it("Tăng số lượng xe khi có ct phiếu nhập", (done) => {
    // Insert a record into CTPHIEUNHAP
    const fakeNgayNhap = generateFakeDate();
    const fakeMaNCC = generateFakeSupplierCode();
    const phieuNhapQuery = `INSERT INTO PHIEUNHAP (NgayNhap, MaNCC) VALUES (?, ?)`;
    const phieuNhapValues = [fakeNgayNhap, fakeMaNCC];

    executeQuery(phieuNhapQuery, phieuNhapValues, () => {
      // Insert a record into CTPHIEUNHAP
      const ctpQuery = `
        INSERT INTO CTPHIEUNHAP (MaCTPN, MaPN, TenXe, LoaiXe, HangXe, Gia, SoLuong, ThanhTien)
        VALUES ('XE0002', 'PN0001', 'Honda Civic', 'Compact', 'Brand1', 20000, 5, 100000)
      `;

      executeQuery(ctpQuery, [], () => {
        // Check if the XE table is updated
        const selectQuery = 'SELECT * FROM XE WHERE TenXe = "Honda Civic"';

        executeQuery(selectQuery, [], (results) => {
          const updatedXERow = results[0];
          assert.ok(updatedXERow.SoLuong > 5, true);

          done();
        });
      });
    });
  });

  // Add more test cases as needed
});
