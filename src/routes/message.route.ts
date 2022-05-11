import express from "express";
import { viewMessage,SendMessage } from "../controller/message.controller";
const msgRoute = express.Router();

msgRoute.get('/:conversationId',(req,res)=>{
    viewMessage(req,res);
 })
msgRoute.post('/:conversationId/send',(req,res)=>{
   SendMessage(req,res);
})
export default msgRoute;