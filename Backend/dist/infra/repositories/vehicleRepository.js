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
exports.vehicleRepository = exports.VehicleRepository = void 0;
var vehicle_1 = require("../../domain/entities/vehicle");
var database_1 = require("../database");
var location_1 = require("../../domain/valueObjects/location");
var VehicleRepository = /** @class */ (function () {
    function VehicleRepository() {
    }
    VehicleRepository.prototype.findByPlateNumber = function (plateNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        database_1.database.get('SELECT * FROM vehicles WHERE plate_number = ?', [plateNumber], function (err, row) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                if (!row) {
                                    resolve(null);
                                }
                                else {
                                    var vehicle = new vehicle_1.Vehicle(row.ID, row.plate_number);
                                    var location_2 = new location_1.Location(row.latitude, row.longitude, row.altitude);
                                    vehicle.setLocation(location_2);
                                    resolve(vehicle);
                                }
                            }
                        });
                    })];
            });
        });
    };
    VehicleRepository.prototype.createVehicle = function (plateNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var statement = database_1.database.prepare('INSERT INTO vehicles (plate_number, latitude, longitude, altitude) VALUES (?, ?, ?, ?)');
                        statement.run([plateNumber, null, null, null], function (err) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(new vehicle_1.Vehicle(this.lastID, plateNumber));
                            }
                            statement.finalize();
                        });
                    })];
            });
        });
    };
    VehicleRepository.prototype.parkVehicle = function (plateNumber, location) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var statement = database_1.database.prepare('UPDATE vehicles SET latitude = ?, longitude = ?, altitude =? WHERE plate_number = ?');
                        statement.run([location.latitude, location.longitude, location.altitude, plateNumber], function (err) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve();
                            }
                            statement.finalize();
                        });
                    })];
            });
        });
    };
    VehicleRepository.prototype.deleteByPlateNumber = function (plateNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var statement = database_1.database.prepare('DELETE FROM vehicles WHERE plate_number = ?');
                        statement.run(plateNumber, function (err) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve();
                            }
                            statement.finalize();
                        });
                    })];
            });
        });
    };
    return VehicleRepository;
}());
exports.VehicleRepository = VehicleRepository;
exports.vehicleRepository = new VehicleRepository();
//# sourceMappingURL=vehicleRepository.js.map