import { Result } from '../utility/result'
import { Vehicle } from './vehicle'

export class Fleet {
    private id: number
    private vehicles: Vehicle[]
    private userId: number

    constructor(id: number, userId: number, vehicles: Vehicle[]) {
        this.id = id
        this.userId = userId
        this.vehicles = vehicles
    }

    getId(): number {
        return this.id
    }

    getVehicles(): Vehicle[] {
        return this.vehicles
    }

    getUserId(): number {
        return this.userId
    }

    hasVehicle(searchedVehicule: Vehicle): boolean {
        return this.vehicles.some(
            (vehicle: Vehicle) =>
                vehicle.getPlateNumber() === searchedVehicule.getPlateNumber()
        )
    }

    addVehicle(vehicleToAdd: Vehicle): Result {
        if (this.hasVehicle(vehicleToAdd)) {
            return Result.failure('The vehicle is already in the fleet')
        }

        this.vehicles.push(vehicleToAdd)
        return Result.success()
    }
}
