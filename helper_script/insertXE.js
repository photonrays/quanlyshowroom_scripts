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

  console.log("Inserting into XE");

  // Insert data into the database using Faker
  const insertData = (name) => {
    const fakeTenXe = name;
    const fakeMaLX = faker.number.int({ min: 1, max: 42 });
    const fakeMaHX = faker.number.int({ min: 1, max: 42 })
    const fakeTongChiTieu = faker.number.float({ min: 10000000, max: 1000000000 });
    const fakeSL = faker.number.int({ min: 1, max: 10 });
    const query = "INSERT INTO XE (TenXe, MaLX, MaHX, Gia, SoLuong) VALUES (?, ?, ?, ?, ?)";
    const values = [fakeTenXe, fakeMaLX, fakeMaHX, fakeTongChiTieu, fakeSL];

    connection.query(query, values, (err, results) => {
      if (err) {
        console.error("Error inserting data:", err);
        throw err;
      }
      // Close the connection after inserting data
    });
  };

const carModels = [
  // Real Car Models
  "Toyota Camry",
  "Honda Civic",
  "Ford Mustang",
  "Chevrolet Silverado",
  "Nissan Altima",
  "Tesla Model S",
  "BMW 3 Series",
  "Mercedes-Benz C-Class",
  "Audi A4",
  "Hyundai Sonata",
  "Kia Sportage",
  "Mazda CX-5",
  "Jeep Wrangler",
  "Volkswagen Golf",
  "Subaru Outback",
  "Porsche 911",
  "Lexus RX",
  "Ford F-150",
  "Chevrolet Malibu",
  "Volvo XC90",
  "Cadillac Escalade",
  "Acura MDX",
  "Jaguar F-Type",
  "Land Rover Discovery",
  "Toyota Prius",
  "Honda Accord",
  "Chevrolet Corvette",
  "Nissan Rogue",
  "Tesla Model 3",
  "Mercedes-Benz E-Class",
  "Audi Q5",
  "Hyundai Tucson",
  "Kia Telluride",
  "Mazda3",
  "Jeep Grand Cherokee",
  "Volkswagen Passat",
  "Subaru Impreza",
  "Porsche Cayenne",
  "Lexus IS",
  "Ford Explorer",
  "Chevrolet Traverse",
  "Volvo S60",
  "Cadillac XT5",
  "Acura TLX",
  "Jaguar I-PACE",
  "Land Rover Range Rover",
  "Toyota RAV4",
  "Honda CR-V",
  "Ford Escape",
  "Nissan Sentra",
  "Tesla Model X",

  // Hypothetical Car Models
  "Quantum QX",
  "EcoDrive E1",
  "FusionTech FT-200",
  "Solaris S1",
  "Velocity V12",
  "AeroX 5000",
  "Nebula N-200",
  "Electra E-Prime",
  "Pegasus P1",
  "InnoVista iX",
  "FutureFleet FF-1",
  "Xplorer X9",
  "EcoJet E-500",
  "StealthX S200",
  "Venture V-9",
  "DreamDrive D-700",
  "AstraTech A-800",
  "NexGen N-3000",
  "Quasar Q-12",
  "Infinity iX2",
  "TechNova T-700",
  "UrbanPulse UP-3",
  "Prestige P-450",
  "EcoLux ELX",
  "Serenity S-600",
  "Xcelerate X-150",
  "Luxor L-800",
  "Orion O-2000",
  "EverGreen E-400",
  "Futura F-1000",
  "Vortex V-800",
  "Xenon X-550",
  "Blitz B-300",
  "RapidX RX-700",
  "EcoChic EC-200",
  "FutureFlow FF-800",
  "Quantum QX3",
  "AeroDrive A-100",
  "Nimbus N-600",
  "ElectraTech ET-300",
  "NovaStar NS-900",
  "Xtreme X-1200",
  "EcoMax EM-700",
  "VistaTech V-450",
  "EvoLux EL-550",
  "SolarFlare SF-200",
];

  for (let i = 0; i < carModels.length; i++) {
    insertData(carModels[i]);
  }
  connection.end();
});
