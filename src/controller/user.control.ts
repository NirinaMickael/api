import {User,Users} from "../model/user.model";
import {Request , Response } from "express"
import multiparty from "multiparty"
import uploadImage from "../middlware/uploadImage"
import UserHandleError from "../service/user.service";
const UserControll : any  = {
    LogUser :async (req:Request , res : Response) => {
        try {
            await User.find()
        } catch (error) {
            
        }
    },
    SearchUser  : async (req : Request , res : Response ) =>{
        try{
            const text = "^"+req.params.id;
            await User.find({"name" : {$regex: text , "$options": "i"} } ).then((data)=>{
                res.status(201).json({
                    user : data
                })
            })
        } catch(error) {
            res.status(500).json({
                error
            })
        }
    },
    updtadeUser : async ( req : Request , res : Response ) => {
        const errorhandler = new UserHandleError();
        const form = new multiparty.Form();
        form.parse(req,async(err,fields,files)=>{
            try {
                uploadImage.single("image");
                const data = {...fields};
                console.log(data,files)
                for(var key in data){
                    if(data.hasOwnProperty(key)){
                        data[key]=data[key].join('');
                    }
                    console.log(data[key])
                }
                const userData = {...data,image : req.file?.filename};
                const newUser  = await User.create({...userData});
                res.status(200).json(
                    newUser
                )
            } catch (error) {
                    errorhandler.handleError(error,req,res);
            }
        })
    },
    createUser : async (req : Request ,res : Response ) =>{
        res.json(req.body)
    },
    GetImage : async ( req : Request , res : Response ) => {
        try {
            res.download(`upload/${req.params.id}`)
        } catch (error) {
            res.send(error)
        }
    }
}

export default UserControll;