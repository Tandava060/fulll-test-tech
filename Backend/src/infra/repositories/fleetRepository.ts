
import { Fleet } from '../../domain/entities/fleet';
import { Vehicle } from '../../domain/entities/vehicle';
import { database } from '../../infra/database';
import { VehicleRow } from './vehicleRepository'
import { Location } from '../../domain/valueObjects/location'
import { IFleetRepository } from '../../domain/repositories/IFleetRepository';

export type FleetRow = { ID: number; user_id: number }

export class FleetRepository implements IFleetRepository {
    async createFleet(userId: number): Promise<Fleet> {
        return new Promise((resolve, reject) => {
            const statement = database.prepare(
                'INSERT INTO fleets (user_id) VALUES (?)'
            )
            statement.run([userId], function (err: Error) {
                if (err) {
                    reject(err)
                } else {
                    resolve(new Fleet(this.lastID, userId, []))
                }
                statement.finalize()
            })
        })
    }

    async registerVehicle(plateNumber: string, fleetId: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const statement = database.prepare(
                'INSERT INTO vehicle_fleets (plate_number, fleet_id) VALUES (?, ?)'
            )
            statement.run([plateNumber, fleetId], function (err: Error) {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
                statement.finalize()
            })
        })
    }

    async findById(id: number): Promise<Fleet | null> {
        return new Promise((resolve, reject) => {
            database.get(
                'SELECT * FROM fleets WHERE id = ?',
                [id],
                async (err, row: FleetRow) => {
                    if (err) {
                        reject(err)
                    } else {
                        if (!row) {
                            resolve(null)
                        } else {
                            resolve(
                                new Fleet(
                                    row.ID,
                                    row.user_id,
                                    await this.getAllVehiclesOfFleet(row.ID)
                                )
                            )
                        }
                    }
                }
            )
        })
    }

    async getAllVehiclesOfFleet(fleetId: number): Promise<Vehicle[]> {
        return new Promise((resolve, reject) => {
            const query =
                'SELECT v.* FROM vehicles AS v JOIN vehicle_fleets AS vf ON v.plate_number = vf.plate_number AND vf.fleet_id = ?'

            database.all(query, [fleetId], (err, rows: VehicleRow[]) => {
                if (err) {
                    reject(err)
                } else {
                    const vehicles: Vehicle[] = rows.map(
                        (row) => {
                            let vehicle = new Vehicle(
                                row.ID,
                                row.plate_number,
                            )
                            const location = new Location(row.latitude, row.longitude, row.altitude);
                            vehicle.setLocation(location)
                            return vehicle
                        }
                            
                    )
                    resolve(vehicles)
                }
            })
        })
    }

    async deleteByOwnerId(userId: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const statement = database.prepare(
                'DELETE FROM fleets WHERE user_id = ?'
            )
            statement.run(userId, function (err) {
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

export const fleetRepository: FleetRepository = new FleetRepository()
