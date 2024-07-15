import { Database } from 'sqlite3'

const filepath = './src/infra/database.db'

function connectDB() {
    const db: Database = new Database(filepath)
    createTables(db)
    return db
}

function createTables(db: Database) {
  db.exec(
    `
    CREATE TABLE IF NOT EXISTS fleets (
      ID INTEGER PRIMARY KEY,
      user_id INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS vehicles (
      ID INTEGER PRIMARY KEY,
      plate_number TEXT NOT NULL UNIQUE,
      latitude DECIMAL(10, 6),
      longitude DECIMAL(10, 6),
      altitude DECIMAL(10, 6)
    );
    CREATE TABLE IF NOT EXISTS vehicle_fleets (
      plate_number TEXT,
      fleet_id INT,
      FOREIGN KEY (plate_number) REFERENCES vehicles(plate_number) ON DELETE CASCADE,
      FOREIGN KEY (fleet_id) REFERENCES fleets(ID) ON DELETE CASCADE
    );
    `
  )
}



export const database: Database = connectDB()