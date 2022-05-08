import { Router ,Request ,Response } from "express";
import multer from "multer";
import UserControll  from "../controller/user.control" 
import uploadImage from "../middlware/uploadImage";
const userRoute = Router();
userRoute.get("/:id",(req : Request , res : Response)=>{
    UserControll.SearchUser(req,res);
})
userRoute.get('/',(req : Request , res : Response)=>{
    UserControll.LogUser(req,res)
})
userRoute.post('/createuser',(req:Request,res:Response)=>{
    UserControll.createuser(req,res);
})
userRoute.put("/newuser",uploadImage.single("image"),(req : Request , res:Response)=>{
    UserControll.updateUser(req,res);
})
userRoute.get("/getImage/:id",(req : Request , res : Response )=>{
    UserControll.GetImage(req,res);
})
export default userRoute;