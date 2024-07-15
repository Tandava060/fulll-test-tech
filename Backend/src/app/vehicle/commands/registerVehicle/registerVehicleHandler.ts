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
        try {
            let vehicle: Vehicle = await this.vehicleRepository.findByPlateNumber(
                command.plateNumber
            )
            const fleet: Fleet = await this.fleetRepository.findById(
                command.fleetId
            )
    
            if (!fleet) {
                return Result.failure('Fleet does not exists!')
            }
    
            if (!vehicle) {
                vehicle = await vehicleRepository.createVehicle(command.plateNumber)
            }
    
            const addVehicleResult = fleet.addVehicle(vehicle)
            if (!addVehicleResult.success) {
                return Result.failure(addVehicleResult.error!)
            }
    
            await this.fleetRepository.registerVehicle(
                command.plateNumber,
                command.fleetId
            )
    
            return Result.success(vehicle)
        } catch (error) {
            return Result.failure('An error occurred while registering the vehicle into fleet')
        }
        
    }
}

export const registerVehicleHandler: RegisterVehicleHandler =
    new RegisterVehicleHandler(fleetRepository, vehicleRepository)
