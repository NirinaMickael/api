"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_control_1 = __importDefault(require("../controller/user.control"));
var uploadImage_1 = __importDefault(require("../middlware/uploadImage"));
var Auth0_1 = require("../midlleware/Auth0");
var userRoute = express_1.Router();
userRoute.post("/user/:id", function (req, res) {
    user_control_1.default.getUser(req, res);
});
userRoute.get("/alluser", Auth0_1.Auth, function (req, res) {
    user_control_1.default.getAllUsers(req, res);
});
userRoute.get("/:id", Auth0_1.Auth, function (req, res) {
    user_control_1.default.SearchUser(req, res);
});
userRoute.post('/', function (req, res) {
    user_control_1.default.LogUser(req, res);
});
userRoute.post('/createuser', function (req, res) {
    user_control_1.default.createUser(req, res);
});
userRoute.put("/edituser/:id", Auth0_1.Auth, uploadImage_1.default.single("image"), function (req, res) {
    user_control_1.default.updateUser(req, res);
});
userRoute.get("/getImage/:id", Auth0_1.Auth, function (req, res) {
    user_control_1.default.GetImage(req, res);
});
exports.default = userRoute;
