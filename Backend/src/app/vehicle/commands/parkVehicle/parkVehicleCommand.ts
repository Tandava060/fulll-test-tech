export class ParkVehicleCommand {
    constructor(
        public fleetId: number,
        public plateNumber: string,
        public latitude: number,
        public longitude: number
    ) {}
}
