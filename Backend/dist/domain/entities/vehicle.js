"use strict";
exports.__esModule = true;
exports.Vehicle = void 0;
var result_1 = require("../utility/result");
var Vehicle = /** @class */ (function () {
    function Vehicle(plateNumber) {
        Vehicle.counter++;
        this.id = Vehicle.counter;
        this.plateNumber = plateNumber;
    }
    Vehicle.prototype.setLocation = function (location) {
        if (this.location && this.location.equals(location)) {
            return result_1.Result.failure('The vehicle is already parked in the indicated location');
        }
        this.location = location;
        return result_1.Result.success();
    };
    Vehicle.prototype.getLocation = function () {
        return this.location;
    };
    Vehicle.prototype.getPlateNumber = function () {
        return this.plateNumber;
    };
    Vehicle.counter = 0;
    return Vehicle;
}());
exports.Vehicle = Vehicle;
//# sourceMappingURL=vehicle.js.map