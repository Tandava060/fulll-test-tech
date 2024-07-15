"use strict";
exports.__esModule = true;
exports.Result = void 0;
var Result = /** @class */ (function () {
    function Result(success, error, data) {
        this.success = success;
        this.error = error;
        this.data = data;
    }
    Result.success = function (data) {
        return new Result(true, undefined, data);
    };
    Result.failure = function (error) {
        return new Result(false, error);
    };
    return Result;
}());
exports.Result = Result;
//# sourceMappingURL=result.js.map