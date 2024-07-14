"use strict";
exports.__esModule = true;
exports.Location = void 0;
var Location = /** @class */ (function () {
    function Location(latitude, longitude, altitude) {
        if (altitude === void 0) { altitude = null; }
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
    }
    Location.prototype.equals = function (location) {
        return (this.latitude === location.latitude &&
            this.longitude === location.longitude &&
            (this.altitude === location.altitude || !this.altitude || !location.altitude));
    };
    return Location;
}());
exports.Location = Location;
//# sourceMappingURL=location.js.map