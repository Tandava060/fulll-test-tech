import { ParkVehicleCommand } from './parkVehicleCommand'
import { Location } from '../../../../domain/valueObjects/location'
import {
    vehicleRepository,
    VehicleRepository,
} from '../../../../infra/repositories/vehicleRepository'
import { Vehicle } from '../../../../domain/entities/vehicle'
import { Result } from '../../../../domain/utility/result'

export class ParkVehicleHandler {
    constructor(private vehicleRepository: VehicleRepository) {}

    async handle(command: ParkVehicleCommand): Promise<Result<Vehicle>> {
        const vehicle: Vehicle | null =
            await this.vehicleRepository.findByPlateNumber(command.plateNumber)

        if (!vehicle) {
            return Result.failure('Unable to retrieve the requested vehicle')
        }

        const location: Location = new Location(
            command.latitude,
            command.longitude
        )

        const setLocationResult = vehicle.setLocation(location)

        if (!setLocationResult.success) {
            return Result.failure(setLocationResult.error!)
        }

        const savedVehicle = await this.vehicleRepository.save(vehicle)

        return Result.success(savedVehicle)
    }
}

export const parkVehicleHandler: ParkVehicleHandler = new ParkVehicleHandler(
    vehicleRepository
)
