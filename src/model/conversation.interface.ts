import mongoose from "mongoose";

export interface ConversationDoc extends mongoose.Document{
    id : String;
    members : String[];
    createdAt : Date;
    updateAt : Date;
}