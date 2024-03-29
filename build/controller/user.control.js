"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
var user_model_1 = require("../model/user.model");
var user_service_1 = __importDefault(require("../service/user.service"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var fs_1 = __importDefault(require("fs"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var UserControll = {
    getUser: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, user_model_1.Users.findOne({
                            _id: req.params.id,
                        })];
                case 1:
                    user = _a.sent();
                    res.status(200).json({
                        success: true,
                        data: user,
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    res.status(404).json({
                        success: false,
                        message: "error",
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    getAllUsers: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_model_1.Users.find()];
                case 1:
                    users = _a.sent();
                    // Ho ombarina
                    console.log("kuku");
                    res.json(users);
                    return [2 /*return*/];
            }
        });
    }); },
    LogUser: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            user_model_1.Users.findOne({ email: (_a = req.body) === null || _a === void 0 ? void 0 : _a.email }).then(function (user) {
                // const user = await Users.findById("6290bed2dc88645651cf0b14");
                if (user) {
                    var test = bcrypt_1.default.compareSync(req.body.password, user.password);
                    if (test) {
                        var token = jsonwebtoken_1.default.sign(__assign({}, user), process.env.jwtkey, {
                            algorithm: "HS256",
                            expiresIn: 3600,
                        });
                        return res
                            .status(200)
                            .json({
                            success: true,
                            token: token,
                            data: user,
                        })
                            .end();
                    }
                    else {
                        return res.status(404).json({
                            success: false,
                            message: "check you mail or password",
                        });
                    }
                }
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized User not found",
                });
            }).catch(function (error) {
                res.json({
                    succes: false,
                    message: "error",
                });
            });
            return [2 /*return*/];
        });
    }); },
    SearchUser: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var text, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    text = "^" + req.params.id;
                    return [4 /*yield*/, user_model_1.Users.find({ username: { $regex: text, $options: "i" } }).then(function (user) {
                            res.status(201).json({
                                data: user,
                                success: true,
                            });
                        })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    res.status(500).json({
                        success: false,
                        data: error_2,
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    updateUser: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var protocol, host, id;
        var _a;
        return __generator(this, function (_b) {
            console.log(req.protocol, req.get("host"));
            protocol = req.protocol;
            host = req.get("host");
            try {
                id = req.params.id;
                user_model_1.Users.findByIdAndUpdate(id, { image: "".concat(protocol, "://").concat(host, "/").concat((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) }, function (error, user) {
                    if (error) {
                        res.json({
                            data: error,
                            success: false,
                        });
                    }
                    else {
                        res.json({
                            data: user,
                            success: true,
                        });
                    }
                });
            }
            catch (error) {
                res.send("error");
            }
            return [2 /*return*/];
        });
    }); },
    //   `${req.protocol}://${req.get("host")}/${req.file?.filename}`
    createUser: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var errorhandler, data, salt, newUser, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errorhandler = new user_service_1.default();
                    data = req.body;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
                case 2:
                    salt = _a.sent();
                    data.password = bcrypt_1.default.hashSync(data.password, salt);
                    return [4 /*yield*/, user_model_1.Users.create(__assign({}, data))];
                case 3:
                    newUser = _a.sent();
                    res.status(200).json({
                        data: newUser,
                        success: true,
                    });
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _a.sent();
                    errorhandler.handleError(error_3, req, res);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); },
    GetImage: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, user, file, data, read, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    return [4 /*yield*/, user_model_1.Users.findById(id)];
                case 1:
                    user = _a.sent();
                    if (user) {
                        // res.download(`upload/${user?.image}`)
                        file = "upload/" + (user === null || user === void 0 ? void 0 : user.image);
                        data = [];
                        if (user === null || user === void 0 ? void 0 : user.image) {
                            read = fs_1.default.createReadStream(file);
                            read.on("data", function (chunck) {
                                data.push(chunck);
                            });
                            // cette methode declanche qu'on a fini a lire le ficher
                            read.on("end", function () {
                                res.send(data);
                            });
                        }
                        else {
                            file = "upload/avatar.png";
                            read = fs_1.default.createReadStream(file);
                            read
                                .on("data", function (chunck) {
                                data.push(chunck);
                            })
                                .on("end", function () {
                                res.send(data);
                            })
                                .on("error", function () {
                                res.send("error");
                            });
                        }
                    }
                    else {
                        res.json({
                            success: false,
                        });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    res.send(error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
};
exports.default = UserControll;
