import { Router ,Request ,Response } from "express";
import UserControll  from "../controller/user.control" 
import uploadImage from "../middlware/uploadImage";
import { Auth } from "../midlleware/Auth0";
const userRoute = Router();
userRoute.post("/user/:id",(req:Request,res:Response)=>{
    UserControll.getUser(req,res);
})
userRoute.get("/alluser",Auth,(req : Request , res : Response)=>{
    UserControll.getAllUsers(req , res);
})
userRoute.get("/:id",Auth,(req : Request , res : Response)=>{
    UserControll.SearchUser(req,res);
})
userRoute.post('/',(req : Request , res : Response)=>{
    UserControll.LogUser(req,res)
})
userRoute.post('/createuser',(req:Request,res:Response)=>{
    UserControll.createUser(req,res);
})
userRoute.put("/edituser/:id",Auth,uploadImage.single("image"),(req : Request , res:Response)=>{
    UserControll.updateUser(req,res);
})
userRoute.get("/getImage/:id",Auth,(req : Request , res : Response )=>{
    UserControll.GetImage(req,res);
})
export default userRoute;