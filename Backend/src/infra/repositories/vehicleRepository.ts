import { Vehicle } from '../../domain/entities/vehicle'
import { IVehicleRepository } from '../../domain/repositories/IVehicleRepository'

export class VehicleRepository implements IVehicleRepository {
    private vehicles: Vehicle[] = []

    async save(vehicle: Vehicle): Promise<Vehicle> {
        const index = this.vehicles.findIndex(
            (v) => v.getPlateNumber() === vehicle.getPlateNumber()
        )
        if (index !== -1) {
            this.vehicles[index] = vehicle
        } else {
            this.vehicles.push(vehicle)
        }
        return vehicle
    }

    async findByPlateNumber(plateNumber: string): Promise<Vehicle> {
        return this.vehicles.find(
            (vehicle) => vehicle.getPlateNumber() === plateNumber
        )
    }
}

export const vehicleRepository: VehicleRepository = new VehicleRepository()
