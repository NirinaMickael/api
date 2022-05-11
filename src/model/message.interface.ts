import mongoose from "mongoose";
export interface MsgDoc extends mongoose.Document{
    conversationId : String,
    senderId : String,
    messages : String,
    createdAt : Date;
    updateAt : Date;
}