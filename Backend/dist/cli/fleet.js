#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var commander_1 = require("commander");
var createFleetHandler_1 = require("../app/fleet/commands/createFleet/createFleetHandler");
var createFleetCommand_1 = require("../app/fleet/commands/createFleet/createFleetCommand");
var registerVehicleCommand_1 = require("../app/vehicle/commands/registerVehicle/registerVehicleCommand");
var registerVehicleHandler_1 = require("../app/vehicle/commands/registerVehicle/registerVehicleHandler");
var parkVehicleCommand_1 = require("../app/vehicle/commands/parkVehicle/parkVehicleCommand");
var parkVehicleHandler_1 = require("../app/vehicle/commands/parkVehicle/parkVehicleHandler");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            commander_1.program
                .command('create <userId>')
                .description('Create a new fleet')
                .action(function (userId) { return __awaiter(_this, void 0, void 0, function () {
                var createFleetCommand, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!userId) {
                                console.error('User ID is required');
                                return [2 /*return*/];
                            }
                            userId = Number(userId);
                            if (Number.isNaN(userId)) {
                                console.error('User ID must be a number');
                                return [2 /*return*/];
                            }
                            createFleetCommand = new createFleetCommand_1.CreateFleetCommand(userId);
                            return [4 /*yield*/, createFleetHandler_1.createFleetHandler.handle(createFleetCommand)];
                        case 1:
                            result = _a.sent();
                            if (!result.success) {
                                console.error(result.error);
                                return [2 /*return*/];
                            }
                            console.log("The fleet has been created, it has the following ID : ".concat(result.data.getId()));
                            return [2 /*return*/];
                    }
                });
            }); });
            commander_1.program
                .command('register-vehicle <fleetId> <vehiclePlateNumber>')
                .description('Register a vehicle to a fleet')
                .action(function (fleetId, vehiclePlateNumber) { return __awaiter(_this, void 0, void 0, function () {
                var registerVehicleCommand, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!fleetId) {
                                console.error('Fleet ID is required');
                                return [2 /*return*/];
                            }
                            if (!vehiclePlateNumber) {
                                console.error('Vehicle plate number is required');
                                return [2 /*return*/];
                            }
                            fleetId = Number(fleetId);
                            if (Number.isNaN(fleetId)) {
                                console.error('Fleet ID must be a number');
                                return [2 /*return*/];
                            }
                            registerVehicleCommand = new registerVehicleCommand_1.RegisterVehicleCommand(fleetId, vehiclePlateNumber);
                            return [4 /*yield*/, registerVehicleHandler_1.registerVehicleHandler.handle(registerVehicleCommand)];
                        case 1:
                            result = _a.sent();
                            if (!result.success) {
                                console.error(result.error);
                                return [2 /*return*/];
                            }
                            console.log("The vehicle with the plate number ".concat(vehiclePlateNumber, " has been registered in the fleet with the ID ").concat(fleetId, " !"));
                            return [2 /*return*/];
                    }
                });
            }); });
            commander_1.program
                .command('localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]')
                .description('Localize a vehicle')
                .action(function (fleetId, vehiclePlateNumber, lat, lng, alt) { return __awaiter(_this, void 0, void 0, function () {
                var parkVehicleIntoLocationCommand, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!fleetId) {
                                console.error('Fleet ID is required');
                                return [2 /*return*/];
                            }
                            if (!vehiclePlateNumber) {
                                console.error('Vehicle plate number is required');
                                return [2 /*return*/];
                            }
                            if (!lat) {
                                console.error('Latitude is required');
                                return [2 /*return*/];
                            }
                            if (!lng) {
                                console.error('Longitude is required');
                                return [2 /*return*/];
                            }
                            fleetId = Number(fleetId);
                            lat = Number(lat);
                            lng = Number(lng);
                            if (Number.isNaN(fleetId)) {
                                console.error('Fleet ID must be a number');
                                return [2 /*return*/];
                            }
                            if (Number.isNaN(lat)) {
                                console.error('Latitude must be a number');
                                return [2 /*return*/];
                            }
                            if (Number.isNaN(lng)) {
                                console.error('Longitude must be a number');
                                return [2 /*return*/];
                            }
                            parkVehicleIntoLocationCommand = new parkVehicleCommand_1.ParkVehicleCommand(fleetId, vehiclePlateNumber, lat, lng);
                            return [4 /*yield*/, parkVehicleHandler_1.parkVehicleHandler.handle(parkVehicleIntoLocationCommand)];
                        case 1:
                            result = _a.sent();
                            if (!result.success) {
                                console.error(result.error);
                                return [2 /*return*/];
                            }
                            if (alt) {
                                console.log("The vehicle with the plate number ".concat(vehiclePlateNumber, " has been parked at the following location: [ lat: ").concat(lat, " ; lng: ").concat(lng, " ; alt: ").concat(alt, " ] !"));
                                return [2 /*return*/];
                            }
                            console.log("The vehicle with the plate number ".concat(vehiclePlateNumber, " has been parked at the following location: [ lat: ").concat(lat, " ; lng: ").concat(lng, " ] !"));
                            return [2 /*return*/];
                    }
                });
            }); });
            commander_1.program.parse(process.argv);
            return [2 /*return*/];
        });
    });
}
main()["catch"](function (error) {
    console.error('An error occurred:', error);
    process.exit(1);
});
//# sourceMappingURL=fleet.js.map