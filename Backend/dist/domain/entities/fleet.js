"use strict";
exports.__esModule = true;
exports.Fleet = void 0;
var result_1 = require("../utility/result");
var Fleet = /** @class */ (function () {
    function Fleet(userId) {
        Fleet.counter++;
        this.id = Fleet.counter;
        this.userId = userId;
        this.vehicles = [];
    }
    Fleet.prototype.getId = function () {
        return this.id;
    };
    Fleet.prototype.getVehicles = function () {
        return this.vehicles;
    };
    Fleet.prototype.getUserId = function () {
        return this.userId;
    };
    Fleet.prototype.hasVehicle = function (searchedVehicule) {
        return this.vehicles.some(function (vehicle) {
            return vehicle.getPlateNumber() === searchedVehicule.getPlateNumber();
        });
    };
    Fleet.prototype.addVehicle = function (vehicleToAdd) {
        if (this.hasVehicle(vehicleToAdd)) {
            return result_1.Result.failure('The vehicle is already in the fleet');
        }
        this.vehicles.push(vehicleToAdd);
        return result_1.Result.success();
    };
    Fleet.counter = 0;
    return Fleet;
}());
exports.Fleet = Fleet;
//# sourceMappingURL=fleet.js.map