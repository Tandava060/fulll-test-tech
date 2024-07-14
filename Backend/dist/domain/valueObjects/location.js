"use strict";
exports.__esModule = true;
exports.Location = void 0;
var Location = /** @class */ (function () {
    function Location(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
    Location.prototype.equals = function (location) {
        return (this.latitude === location.latitude &&
            this.longitude === location.longitude);
    };
    return Location;
}());
exports.Location = Location;
//# sourceMappingURL=location.js.map