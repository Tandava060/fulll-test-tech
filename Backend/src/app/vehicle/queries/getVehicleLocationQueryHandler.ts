import { Vehicle } from '../../../domain/entities/vehicle'
import { Location } from '../../../domain/valueObjects/location'
import { Result } from '../../../domain/utility/result'
import {
    vehicleRepository,
    VehicleRepository,
} from '../../../infra/repositories/vehicleRepository'
import { GetVehicleLocationQuery } from './getVehicleLocationQuery'

export class GetVehicleLocationQueryHandler {
    private vehicleRepository: VehicleRepository

    constructor(vehicleRepository: VehicleRepository) {
        this.vehicleRepository = vehicleRepository
    }

    async handle(command: GetVehicleLocationQuery): Promise<Result<Location>> {
        const vehicle: Vehicle = await this.vehicleRepository.findByPlateNumber(
            command.vehiclePlateNumber
        )

        if (!vehicle) {
            return Result.failure('Unable to retrieve the requested vehicle')
        }

        return Result.success(vehicle.getLocation())
    }
}

export const getVehicleLocationQueryHandler: GetVehicleLocationQueryHandler =
    new GetVehicleLocationQueryHandler(vehicleRepository)
