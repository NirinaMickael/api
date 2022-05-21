import mongoose from "mongoose";
import { ConversationDoc } from "./conversation.interface";

const conversationSchema =  new mongoose.Schema (
    {
        members : [
            {
                type:String,
                unique:false
            }

        ]
    },
    {
        timestamps:true
    }
)
export default mongoose.model<ConversationDoc>('Convesation',conversationSchema);