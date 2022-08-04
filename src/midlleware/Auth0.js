"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.Auth = function (req, res, next) {
    var token = req.headers.authorization.split(' ')[1];
    console.log(token);
    try {
        if (!token)
            return res.status(401).end();
        var playload = void 0;
        try {
            playload = jsonwebtoken_1.default.verify(token, process.env.jwtkey);
            return next();
        }
        catch (err) {
            if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized!!'
                });
            }
            else {
                return res.status(401).json({
                    success: false,
                    message: 'Error server!!'
                });
            }
        }
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Error server!!'
        });
    }
};
