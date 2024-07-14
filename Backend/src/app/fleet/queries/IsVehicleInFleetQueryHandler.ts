import { Fleet } from '../../../domain/entities/fleet'
import { Vehicle } from '../../../domain/entities/vehicle'
import { Result } from '../../../domain/utility/result'
import {
    FleetRepository,
    fleetRepository,
} from '../../../infra/repositories/fleetRepository'
import {
    VehicleRepository,
    vehicleRepository,
} from '../../../infra/repositories/vehicleRepository'
import { IsVehicleInFleetQuery } from './IsVehicleInFleetQuery'

export class IsVehicleInFleetQueryHandler {
    constructor(
        private fleetRepository: FleetRepository,
        private vehicleRepository: VehicleRepository
    ) {}

    async handle(command: IsVehicleInFleetQuery): Promise<Result<boolean>> {
        const fleet: Fleet | undefined = await this.fleetRepository.findById(
            command.fleetId
        )

        if (!fleet) {
            return Result.failure('Unable to retrieve the requested fleet')
        }

        const vehicle: Vehicle | undefined =
            await this.vehicleRepository.findByPlateNumber(
                command.vehiclePlateNumber
            )

        if (!vehicle) {
            return Result.failure('Unable to retrieve the requested vehicle')
        }

        return Result.success(fleet.hasVehicle(vehicle))
    }
}

export const isVehicleInFleetQueryHandler: IsVehicleInFleetQueryHandler =
    new IsVehicleInFleetQueryHandler(fleetRepository, vehicleRepository)
