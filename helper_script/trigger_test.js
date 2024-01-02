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

    const SLDauQuery =
      'SELECT SoLuong FROM QuanLyShowroomOto.XE where TenXe = "Toyota Camry"';
    const SLDauResult = await executeQuery(SLDauQuery);
    var sl_ban_dau = SLDauResult[0].SoLuong;

    // Insert a record into CTPHIEUNHAP
    const ctpQuery = `
      INSERT INTO CTPHIEUNHAP (MaPN, TenXe, LoaiXe, HangXe, Gia, SoLuong, ThanhTien)
      VALUES ('PN0001', 'Toyota Camry', 'Roadster', 'Volvo', 20000, 5, 100000)
    `;
    await executeQuery(ctpQuery);

    const SLSauQuery =
      'SELECT SoLuong FROM QuanLyShowroomOto.XE where TenXe = "Toyota Camry"';
    const SLSauResult = await executeQuery(SLSauQuery);
    var sl_luc_sau = SLSauResult[0].SoLuong;

    assert.equal(sl_ban_dau + 5, sl_luc_sau);
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

    assert.ok(results.length > 0, true);
  });

  it("Giảm số lượng xe khi có phiếu xuất", async () => {
    // Insert a record into THONGSOXENHAP

    const SLDauQuery =
      'SELECT SoLuong FROM QuanLyShowroomOto.XE where MaXe = "XE0001"';
    const SLDauResult = await executeQuery(SLDauQuery);
    var sl_ban_dau = SLDauResult[0].SoLuong;

    const phieuXuatQuery =
      'INSERT INTO PHIEUXUAT (MaXe, NgayXuat) VALUES ("XE0001", "2024-01-01")';
    await executeQuery(phieuXuatQuery);

    const SLSauQuery =
      'SELECT SoLuong FROM QuanLyShowroomOto.XE where MaXe = "XE0001"';
    const SLSauResult = await executeQuery(SLSauQuery);
    var sl_luc_sau = SLSauResult[0].SoLuong;

    assert.equal(sl_ban_dau, sl_luc_sau + 1);
  });
});
