import { Fleet } from '../../domain/entities/fleet'
import { IFleetRepository } from '../../domain/repositories/IFleetRepository'

export class FleetRepository implements IFleetRepository {
    private fleets: Fleet[] = []

    async save(fleet: Fleet): Promise<Fleet> {
        const index = this.fleets.findIndex((f) => f.getId() === fleet.getId())
        if (index !== -1) {
            this.fleets[index] = fleet
        } else {
            this.fleets.push(fleet)
        }
        return fleet
    }

    async findById(id: number): Promise<Fleet | null> {
        return this.fleets.find((fleet) => fleet.getId() === id) || null
    }
}

export const fleetRepository: FleetRepository = new FleetRepository()
