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
        const fleet: Fleet = new Fleet(command.userId)
        const savedFleet = await this.fleetRepository.save(fleet)
        return Result.success(savedFleet)
    }
}

export const createFleetHandler: CreateFleetHandler = new CreateFleetHandler(
    fleetRepository
)
