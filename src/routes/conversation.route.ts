import express, { Response , Request} from 'express';
import { NewConversation, GetAllconversation, GetConversation } from '../controller/conversation.controller';
const ConvRoute = express.Router();
ConvRoute.get('/:senderId/:receiveId',(req:Request,res:Response)=>{
    NewConversation(req,res);    
})
ConvRoute.get('/:userId',(req:Request,res:Response)=>{
    GetAllconversation(req,res)
})
ConvRoute.get('/:userId/:otherId',(req : Request, res: Response)=>{
    GetConversation(req,res);
})
export default ConvRoute;