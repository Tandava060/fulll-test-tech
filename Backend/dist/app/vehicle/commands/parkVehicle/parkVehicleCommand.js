"use strict";
exports.__esModule = true;
exports.ParkVehicleCommand = void 0;
var ParkVehicleCommand = /** @class */ (function () {
    function ParkVehicleCommand(fleetId, plateNumber, latitude, longitude, altitude) {
        if (altitude === void 0) { altitude = null; }
        this.fleetId = fleetId;
        this.plateNumber = plateNumber;
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
    }
    return ParkVehicleCommand;
}());
exports.ParkVehicleCommand = ParkVehicleCommand;
//# sourceMappingURL=parkVehicleCommand.js.map