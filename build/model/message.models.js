"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.msgModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var MsgSchema = new mongoose_1.default.Schema({
    conversationId: {
        type: String,
        unique: false,
    },
    senderId: {
        type: String,
    },
    messages: {
        type: String,
    },
}, {
    timestamps: true,
});
exports.msgModel = mongoose_1.default.model('Message', MsgSchema);
