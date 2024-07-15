import { Vehicle } from '../entities/vehicle'
import { Location } from '../valueObjects/location'

export interface IVehicleRepository {
    findByPlateNumber(plateNumber: string): Promise<Vehicle | null>
    createVehicle(plateNumber: string): Promise<Vehicle>
    deleteByPlateNumber(plateNumber: string): Promise<void>
    parkVehicle(plateNumber: string, location: Location): Promise<void>
}
