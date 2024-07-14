export class RegisterVehicleCommand {
    constructor(
        public fleetId: number,
        public plateNumber: string
    ) {}
}
