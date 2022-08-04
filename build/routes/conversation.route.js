"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var conversation_controller_1 = require("../controller/conversation.controller");
var ConvRoute = express_1.default.Router();
ConvRoute.get('/:senderId/:receiveId', function (req, res) {
    (0, conversation_controller_1.NewConversation)(req, res);
});
ConvRoute.get('/:userId', function (req, res) {
    (0, conversation_controller_1.GetAllconversation)(req, res);
});
ConvRoute.get('/:userId/:otherId', function (req, res) {
    (0, conversation_controller_1.GetConversation)(req, res);
});
exports.default = ConvRoute;
