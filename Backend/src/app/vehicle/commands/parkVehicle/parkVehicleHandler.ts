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
        try {
        const vehicle: Vehicle | null =
            await this.vehicleRepository.findByPlateNumber(command.plateNumber)

        if (!vehicle) {
            return Result.failure('Unable to retrieve the requested vehicle')
        }

        const location: Location = new Location(
            command.latitude,
            command.longitude,
            command.altitude
        )

        const setLocationResult = vehicle.setLocation(location)

        if (!setLocationResult.success) {
            return Result.failure(setLocationResult.error!)
        }

        await this.vehicleRepository.parkVehicle(command.plateNumber, location)

        return Result.success(vehicle)
    } catch (error) {
        return Result.failure('An error occurred while parking the vehicle')
    }
    }
}

export const parkVehicleHandler: ParkVehicleHandler = new ParkVehicleHandler(
    vehicleRepository
)
