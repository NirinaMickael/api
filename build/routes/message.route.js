"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var message_controller_1 = require("../controller/message.controller");
var msgRoute = express_1.default.Router();
msgRoute.get('/:conversationId', function (req, res) {
    (0, message_controller_1.viewMessage)(req, res);
});
msgRoute.post('/:conversationId/send', function (req, res) {
    (0, message_controller_1.SendMessage)(req, res);
});
exports.default = msgRoute;
