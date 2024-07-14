import { Vehicle } from '../entities/vehicle'

export interface IVehicleRepository {
    save(vehicle: Vehicle): Promise<Vehicle>
    findByPlateNumber(plateNumber: string): Promise<Vehicle | null>
}
