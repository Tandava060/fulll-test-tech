import { Fleet } from '../../../../domain/entities/fleet'
import { Result } from '../../../../domain/utility/result'
import {
    FleetRepository,
    fleetRepository,
} from '../../../../infra/repositories/fleetRepository'
import { CreateFleetCommand } from './createFleetCommand'

export class CreateFleetHandler {
    private fleetRepository: FleetRepository

    constructor(fleetRepository: FleetRepository) {
        this.fleetRepository = fleetRepository
    }

    async handle(command: CreateFleetCommand): Promise<Result<Fleet>> {
        try {
            const fleet = await this.fleetRepository.createFleet(command.userId)
            return Result.success(fleet)
        } catch (error) {
            return Result.failure('An error occurred while creating the fleet')
        }
    }
}

export const createFleetHandler: CreateFleetHandler = new CreateFleetHandler(
    fleetRepository
)
