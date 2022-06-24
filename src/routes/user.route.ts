import { Router ,Request ,Response } from "express";
import UserControll  from "../controller/user.control" 
import uploadImage from "../middlware/uploadImage";
const userRoute = Router();
userRoute.post("/user/:id",(req:Request,res:Response)=>{
    UserControll.getUser(req,res);
})
userRoute.get("/alluser",(req : Request , res : Response)=>{
    UserControll.getAllUsers(req , res);
})
userRoute.get("/:id",(req : Request , res : Response)=>{
    UserControll.SearchUser(req,res);
})
userRoute.post('/',(req : Request , res : Response)=>{
    UserControll.LogUser(req,res)
})
userRoute.post('/createuser',(req:Request,res:Response)=>{
    UserControll.createUser(req,res);
})
userRoute.put("/edituser/:id",uploadImage.single("image"),(req : Request , res:Response)=>{
    UserControll.updateUser(req,res);
})
userRoute.get("/getImage/:id",(req : Request , res : Response )=>{
    UserControll.GetImage(req,res);
})
export default userRoute;