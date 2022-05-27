import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document {
    id : String;
    name : String ;
    firstName : String;
    email : String;
    telephon : Number;
    gender : String;
    password : String ;
    repassword : String ;
    image : String;
    createdAt : Date;
    updateAt : Date;
}
export interface UsersDocument extends mongoose.Document {
    id : String;
    username : String;
    email : String;
    password : String ;
    image : String;
    status : boolean;
    createdAt : Date;
    updateAt : Date;
}
