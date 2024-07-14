import { Vehicle } from '../../../../domain/entities/vehicle'
import { Fleet } from '../../../../domain/entities/fleet'
import {
    VehicleRepository,
    vehicleRepository,
} from '../../../../infra/repositories/vehicleRepository'
import {
    FleetRepository,
    fleetRepository,
} from '../../../../infra/repositories/fleetRepository'
import { RegisterVehicleCommand } from './registerVehicleCommand'
import { Result } from '../../../../domain/utility/result'

export class RegisterVehicleHandler {
    constructor(
        private fleetRepository: FleetRepository,
        private vehicleRepository: VehicleRepository
    ) {}

    async handle(command: RegisterVehicleCommand): Promise<Result<Vehicle>> {
        let vehicle: Vehicle = await this.vehicleRepository.findByPlateNumber(
            command.plateNumber
        )
        const fleet: Fleet = await this.fleetRepository.findById(
            command.fleetId
        )

        if (!vehicle) {
            vehicle = new Vehicle(command.plateNumber)
            await vehicleRepository.save(vehicle)
        }

        if (!fleet) {
            return Result.failure('Unable to retrieve the requested fleet')
        }

        const addVehicleResult = fleet.addVehicle(vehicle)
        if (!addVehicleResult.success) {
            return Result.failure(addVehicleResult.error!)
        }

        await this.fleetRepository.save(fleet)
        return Result.success(vehicle)
    }
}

export const registerVehicleHandler: RegisterVehicleHandler =
    new RegisterVehicleHandler(fleetRepository, vehicleRepository)
