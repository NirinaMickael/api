import { UserDocument, UsersDocument } from "./user.interface";
import mongoose from "mongoose";
// create hashing passwords
const UserSchema = new mongoose.Schema(
  {
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
        validator: function (this: UserDocument) {
          return this.password == this.repassword;
        },
        message: "password don't match",
      },
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);
const UsersSchema = new mongoose.Schema(
  {
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
    image :{
      type : String
    }
  },
  { timestamps: true }
);
export const User = mongoose.model<UserDocument>("User", UserSchema);
export const Users = mongoose.model<UsersDocument>("Usersignup", UsersSchema);
