import { User, Users } from "../model/user.model";
import { Request, Response } from "express";
import multiparty from "multiparty";
import uploadImage from "../middlware/uploadImage";
import UserHandleError from "../service/user.service";
import fs from 'fs';
const UserControll: any = {
  getUser: async (req: Request, res: Response) => {
    try {
      const user = await Users.findOne({
        _id: req.params.id,
      });
      res.status(200).json({
        success : true,
        data : user
      });
    } catch (error) {
      res.status(404).json({
        success : false,
        message: "error",
      });
    }
  },
  getAllUsers : async ( req : Request , res :Response) =>{
      const users = await Users.find();
      // Ho ombarina 
      res.json(users);
  },
  LogUser: async (req: Request, res: Response) => {
    try {
      const user = await Users.findOne({
        $and: [{ email: req.body?.email }, { password: req.body?.password }],
        email : req.body?.email
      });
      // const user = await Users.findById("6290bed2dc88645651cf0b14");
      if(user)  return res.status(200).json({
        success : true,
        data : user
      });
      return res.status(401).json({
        success : false,
        message:"Unauthorized User not found"
      });
    } catch (error) {
      res.json({
        succes : false,
        message: "error",
      });
    }
  },
  SearchUser: async (req: Request, res: Response) => {
    try {
      const text = "^" + req.params.id;
      await Users.find({ username: { $regex: text, $options: "i" } }).then(
        (user) => {
          res.status(201).json({
            data : user,
            success: true
          });
        }
      );
    } catch (error) {
      res.status(500).json({
        success : false,
        data : error
      });
    }
  },
  updateUser: async (req: Request, res: Response) => {
    console.log(req.protocol,req.get('host'));
    const protocol = req.protocol;
    const host = req.get('host');
    try {
      const id = req.params.id;
      Users.findByIdAndUpdate(
        id, 
         {  image : `${protocol}://${host}/${req.file?.filename}` },
       function (error: any, user: any) {
             if (error) {
               res.json({
                data :error,
                success: false
               });
             } else {
                 res.json({
                     data:user,
                     success:true
                 })
             }
         });
    } catch (error) {
      res.send("error");
    }
  },
//   `${req.protocol}://${req.get("host")}/${req.file?.filename}`
  createUser: async (req: Request, res: Response) => {
    const errorhandler = new UserHandleError();
    const data = req.body;
    try {
      const newUser = await Users.create({ ...data });
      res.status(200).json({
        data : newUser,
        success : true
      });
    } catch (error) {
      errorhandler.handleError(error, req, res); 
    }
  },
  GetImage: async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const user = await Users.findById(id);
        var file;
        if(user) {
            // res.download(`upload/${user?.image}`)
            file = "upload/"+user?.image;
            var data: (string | Buffer)[] = [];
            var read ;
            if(user?.image){
                read = fs.createReadStream(file);
                read.on('data',(chunck)=>{
                   data.push(chunck);
                });
                // cette methode declanche qu'on a fini a lire le ficher
                read.on('end',()=>{
                  res.send(data);
                })
            }else{
                file = "upload/avatar.png";
                read = fs.createReadStream(file);
                read.on('data',(chunck)=>{
                  data.push(chunck);
                }).on('end',()=>{
                  res.send(data)
                }).on('error',()=>{
                  res.send("error")
                })
            }
        }else{
            res.json({
                success : false
            })
        }
        
    } catch (error) {
      res.send(error);
    }
  },
};

export default UserControll;
