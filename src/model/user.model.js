"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
// create hashing passwords
var UserSchema = new mongoose_1.default.Schema({
    lastname: {
        type: String,
        required: [true, "you must enter a name"],
        unique: [true, "this name is already used"],
    },
    firstname: {
        type: String,
        required: [true, "you must enter a firstName"],
        unique: [true, "this FirstName is already used"],
    },
    emwwail: {
        type: String,
        required: [true, "you must enter a mail"],
        unique: [true, "this mail is already used"],
    },
    gender: {
        type: String,
    },
    telephon: {
        type: Number,
        required: [true, "you must enter a number"],
        unique: [true, "choose another number"],
    },
    password: {
        type: String,
        required: [true, "you must enter a password"],
        minlength: [6, "Password should be at least six characters"],
    },
    repassword: {
        type: String,
        validate: {
            validator: function () {
                return this.password == this.repassword;
            },
            message: "password don't match",
        },
    },
    image: {
        type: String,
    },
}, { timestamps: true });
var UsersSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: [true, "you must enter a mail"],
        unique: [true, "this mail is already used"]
    },
    email: {
        type: String,
        required: [true, "you must enter a mail"],
        unique: [true, "this mail is already used"],
    },
    password: {
        type: String,
        required: [true, "you must enter a password"],
        minlength: [6, "Password should be at least six characters"],
    },
    image: {
        type: String
    }
}, { timestamps: true });
exports.User = mongoose_1.default.model("User", UserSchema);
exports.Users = mongoose_1.default.model("Usersignup", UsersSchema);
