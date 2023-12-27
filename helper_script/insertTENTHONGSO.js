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
  const insertData = (name) => {
    const fakeTTS = name;
    const query = "INSERT INTO TENTHONGSO (TTS) VALUES (?)";
    const values = [fakeTTS];

    connection.query(query, values, (err, results) => {
      if (err) {
        console.error("Error inserting data:", err);
        throw err;
      }
      console.log("Data inserted successfully");
      // Close the connection after inserting data
    });
  };

  const vehicleSpecifications = [
    "Bodywork", // Cơ cấu thân xe
    "Body type", // Loại thân xe
    "Number of seater", // Số chỗ ngồi
    "Length", // Chiều dài
    "Width", // Chiều rộng
    "Height", // Chiều cao
    "Wheelbase", // Chiều cơ sở
    "Front track", // Bề rộng bánh trước
    "Rear track", // Bề rộng bánh sau
    "Engine", // Động cơ
    "Engine type", // Loại động cơ
    "Capacity", // Dung tích
    "Engine power", // Công suất động cơ
    "Max power at RPM", // Công suất tối đa tại vòng tua
    "Maximum torque", // Momen xoắn tối đa
    "Injection type", // Loại phun nhiên liệu
    "Cylinder layout", // Bố trí xi lanh
    "Number of cylinders", // Số xi lanh
    "Fuel", // Nhiên liệu
    "Gearbox and handling", // Hộp số và xử lý
    "Gearbox type", // Loại hộp số
    "Number of gears", // Số số
    "Drive wheels", // Bánh xe động
    "Front brakes", // Phanh trước
    "Rear brakes", // Phanh sau
    "Operating characteristics", // Đặc tính vận hành
    "Max speed", // Tốc độ tối đa
    "Acceleration (0-100 km/h)", // Tăng tốc (0-100 km/h)
    "Curb weight", // Trọng lượng không tải
    "Fuel tank capacity", // Dung tích bình nhiên liệu
    "Emission standards", // Tiêu chuẩn khí thải
    "Ground clearance", // Khoảng trống gầm
    "Valves per cylinder", // Số van trên mỗi xi lanh
    "Suspension and brakes", // Treo và phanh
    "Front suspension", // Treo trước
    "Back suspension", // Treo sau
    "Max trunk capacity", // Dung tích cốp tối đa
    "Min trunk capacity", // Dung tích cốp tối thiểu
    "Boost type", // Loại tăng áp
    "Cylinder bore", // Đường kính xi lanh
    "Stroke cycle", // Hành trình piston
    "City driving fuel consumption per 100 km", // Tiêu thụ nhiên liệu trong thành phố (mỗi 100 km)
    "Highway driving fuel consumption per 100 km", // Tiêu thụ nhiên liệu trên đường cao tốc (mỗi 100 km)
    "Mixed driving fuel consumption per 100 km", // Tiêu thụ nhiên liệu hỗn hợp (mỗi 100 km)
    "Turning circle", // Bán kính quay vòng
    "Full weight", // Trọng lượng toàn bộ
    "Cruising range", // Tầm hoạt động
    "Turnover of maximum torque", // Vòng tua tối đa của moment xoắn
    "Payload", // Tải trọng
    "Presence of intercooler", // Sự có mặt của tản nhiệt trung gian
    "Permitted road-train weight", // Trọng lượng cho phép của xe kéo đường sắt
    "Front/rear axle load", // Tải trục trước/sau
    "Loading height", // Chiều cao đậu hàng
    "Cargo compartment (Length x Width x Height)", // Kích thước khoang chứa hàng (Dài x Rộng x Cao)
    "Cargo compartment volume", // Thể tích khoang chứa hàng
  ];
  for (let i = 0; i < vehicleSpecifications.length; i++) {
    insertData(vehicleSpecifications[i]);
  }
  connection.end();
});
