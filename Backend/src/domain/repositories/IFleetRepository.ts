import { Fleet } from '../entities/fleet'
import { Vehicle } from '../entities/vehicle';

export interface IFleetRepository {
    createFleet(userId: number): Promise<Fleet>;
    registerVehicle(plateNumber: string, fleetId: number): Promise<void>;
    findById(id: number): Promise<Fleet | null>;
    getAllVehiclesOfFleet(fleetId: number): Promise<Vehicle[]>
    deleteByOwnerId(userId: number): Promise<void>
}
