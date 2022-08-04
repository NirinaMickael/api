"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserHandleError = /** @class */ (function () {
    function UserHandleError() {
    }
    UserHandleError.prototype.handleError = function (err, req, res) {
        try {
            if (err.name == "ValidationError") {
                this.handleValidationError(req, res, err["errors"]);
            }
            else {
                this.handleDuplicateKeyError(req, res, err);
            }
        }
        catch (err) {
            res.status(500).send(err);
        }
    };
    UserHandleError.prototype.handleValidationError = function (req, res, err) {
        var field = Object.keys(err)[0];
        var errorMessage = err[field].message;
        return res.status(400).json({
            message: errorMessage
        });
    };
    UserHandleError.prototype.handleDuplicateKeyError = function (req, res, err) {
        var field = err.message.split(':')[2].split(' ')[1];
        var code = 409;
        var error = "An account with that " + field + " already exists.";
        return res.status(code).json({
            message: error
        });
    };
    return UserHandleError;
}());
exports.default = UserHandleError;
