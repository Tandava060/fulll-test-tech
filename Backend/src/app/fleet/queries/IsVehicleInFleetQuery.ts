export class IsVehicleInFleetQuery {
    constructor(
        public fleetId: number,
        public vehiclePlateNumber: string
    ) {}
}
