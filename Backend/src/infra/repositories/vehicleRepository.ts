import { Vehicle } from "../../domain/entities/vehicle"
import { database } from "../database"
import { Location } from "../../domain/valueObjects/location"
import { IVehicleRepository } from "../../domain/repositories/IVehicleRepository"


export type VehicleRow = {
    ID: number
    plate_number: string
    latitude: number
    longitude: number
    altitude: number | null
}

export class VehicleRepository implements IVehicleRepository {
    async findByPlateNumber(plateNumber: string): Promise<Vehicle | null> {
        return new Promise((resolve, reject) => {
            database.get(
                'SELECT * FROM vehicles WHERE plate_number = ?',
                [plateNumber],
                (err, row: VehicleRow) => {
                    if (err) {
                        reject(err)
                    } else {
                        if (!row) {
                            resolve(null)
                        } else {
                          let vehicle =  new Vehicle(
                                row.ID,
                                row.plate_number,
                            )
                            const location = new Location(row.latitude, row.longitude, row.altitude);
                            vehicle.setLocation(location)
                            resolve(
                                vehicle
                            )
                        }
                    }
                }
            )
        })
    }

    async createVehicle(plateNumber: string): Promise<Vehicle> {
        return new Promise((resolve, reject) => {
            const statement = database.prepare(
                'INSERT INTO vehicles (plate_number, latitude, longitude, altitude) VALUES (?, ?, ?, ?)'
            )
            statement.run(
                [plateNumber, null, null, null],
                function (err: Error) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(
                            new Vehicle(
                                this.lastID,
                                plateNumber
                            )
                        )
                    }
                    statement.finalize()
                }
            )
        })
    }

    async parkVehicle(
        plateNumber: string,
        location: Location
    ): Promise<void> {
        return new Promise((resolve, reject) => {
            const statement = database.prepare(
                'UPDATE vehicles SET latitude = ?, longitude = ?, altitude =? WHERE plate_number = ?'
            )
            statement.run(
                [location.latitude, location.longitude, location.altitude, plateNumber],
                function (err: Error) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                    statement.finalize()
                }
            )
        })
    }

    async deleteByPlateNumber(plateNumber: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const statement = database.prepare(
                'DELETE FROM vehicles WHERE plate_number = ?'
            )
            statement.run(plateNumber, function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
                statement.finalize()
            })
        })
    }
}

export const vehicleRepository: VehicleRepository = new VehicleRepository()
