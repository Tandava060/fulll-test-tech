import { Fleet } from '../entities/fleet'

export interface IFleetRepository {
    save(fleet: Fleet): Promise<Fleet>
    findById(id: number): Promise<Fleet | null>
}
