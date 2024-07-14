"use strict";
exports.__esModule = true;
exports.database = void 0;
var sqlite3_1 = require("sqlite3");
var filepath = './src/infra/database.db';
function connectDB() {
    var db = new sqlite3_1.Database(filepath);
    createTables(db);
    return db;
}
function createTables(db) {
    db.exec("\n    CREATE TABLE IF NOT EXISTS fleets (\n      ID INTEGER PRIMARY KEY,\n      user_id INTEGER NOT NULL\n    );\n    CREATE TABLE IF NOT EXISTS vehicles (\n      ID INTEGER PRIMARY KEY,\n      plate_number TEXT NOT NULL UNIQUE,\n      latitude DECIMAL(10, 6),\n      longitude DECIMAL(10, 6),\n      altitude DECIMAL(10, 6)\n    );\n    CREATE TABLE IF NOT EXISTS vehicle_fleets (\n      plate_number TEXT,\n      fleet_id INT,\n      FOREIGN KEY (plate_number) REFERENCES vehicles(plate_number) ON DELETE CASCADE,\n      FOREIGN KEY (fleet_id) REFERENCES fleets(ID) ON DELETE CASCADE\n    );\n    ");
}
exports.database = connectDB();
//# sourceMappingURL=database.js.map