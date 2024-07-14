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
exports.fleetRepository = exports.FleetRepository = void 0;
var fleet_1 = require("../../domain/entities/fleet");
var vehicle_1 = require("../../domain/entities/vehicle");
var database_1 = require("../../infra/database");
var location_1 = require("../../domain/valueObjects/location");
var FleetRepository = /** @class */ (function () {
    function FleetRepository() {
    }
    FleetRepository.prototype.createFleet = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var statement = database_1.database.prepare('INSERT INTO fleets (user_id) VALUES (?)');
                        statement.run([userId], function (err) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(new fleet_1.Fleet(this.lastID, userId, []));
                            }
                            statement.finalize();
                        });
                    })];
            });
        });
    };
    FleetRepository.prototype.registerVehicle = function (plateNumber, fleetId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var statement = database_1.database.prepare('INSERT INTO vehicle_fleets (plate_number, fleet_id) VALUES (?, ?)');
                        statement.run([plateNumber, fleetId], function (err) {
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
    FleetRepository.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        database_1.database.get('SELECT * FROM fleets WHERE id = ?', [id], function (err, row) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b, _c;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        if (!err) return [3 /*break*/, 1];
                                        reject(err);
                                        return [3 /*break*/, 4];
                                    case 1:
                                        if (!!row) return [3 /*break*/, 2];
                                        resolve(null);
                                        return [3 /*break*/, 4];
                                    case 2:
                                        _a = resolve;
                                        _b = fleet_1.Fleet.bind;
                                        _c = [void 0, row.ID,
                                            row.user_id];
                                        return [4 /*yield*/, this.getAllVehiclesOfFleet(row.ID)];
                                    case 3:
                                        _a.apply(void 0, [new (_b.apply(fleet_1.Fleet, _c.concat([_d.sent()])))()]);
                                        _d.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                    })];
            });
        });
    };
    FleetRepository.prototype.getAllVehiclesOfFleet = function (fleetId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var query = 'SELECT v.* FROM vehicles AS v JOIN vehicle_fleets AS vf ON v.plate_number = vf.plate_number AND vf.fleet_id = ?';
                        database_1.database.all(query, [fleetId], function (err, rows) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                var vehicles = rows.map(function (row) {
                                    var vehicle = new vehicle_1.Vehicle(row.ID, row.plate_number);
                                    var location = new location_1.Location(row.latitude, row.longitude, row.altitude);
                                    vehicle.setLocation(location);
                                    return vehicle;
                                });
                                resolve(vehicles);
                            }
                        });
                    })];
            });
        });
    };
    FleetRepository.prototype.deleteByOwnerId = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var statement = database_1.database.prepare('DELETE FROM fleets WHERE user_id = ?');
                        statement.run(userId, function (err) {
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
    return FleetRepository;
}());
exports.FleetRepository = FleetRepository;
exports.fleetRepository = new FleetRepository();
//# sourceMappingURL=fleetRepository.js.map