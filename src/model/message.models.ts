import mongoose from "mongoose";
import { ConversationDoc } from "./conversation.interface";
const MsgSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);
export const msgModel = mongoose.model('Message',MsgSchema);