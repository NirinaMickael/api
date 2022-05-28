import { User, Users } from "../model/user.model";
import { Request, Response } from "express";
import multiparty from "multiparty";
import uploadImage from "../middlware/uploadImage";
import UserHandleError from "../service/user.service";
const UserControll: any = {
  getUser: async (req: Request, res: Response) => {
    try {
      const user = await Users.findOne({
        _id: req.params.id,
      });
      res.status(200).json(user);
    } catch (error) {
      res.json({
        message: "error",
      });
    }
  },
  LogUser: async (req: Request, res: Response) => {
    try {
      const user = await Users.findOne({
        $and: [{ email: req.body?.email }, { password: req.body?.password }],
        email : req.body?.email
      });
      // const user = await Users.findById("6290bed2dc88645651cf0b14");
      console.log(user,{...req.body})
      if(user)  return res.status(200).json(user);
      return res.status(404).send('user not found');
    } catch (error) {
      res.json({
        message: "error",
      });
    }
  },
  SearchUser: async (req: Request, res: Response) => {
    try {
      const text = "^" + req.params.id;
      await Users.find({ username: { $regex: text, $options: "i" } }).then(
        (data) => {
          res.status(201).json({
            data,
          });
        }
      );
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  },
  updateUser: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
    console.log(id)
      Users.findByIdAndUpdate(
        id, 
         {  image :req.file?.filename },
       function (error: any, success: any) {
             if (error) {
               res.send(error);
             } else {
                 res.json({
                     success,
                     res:true
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
      res.status(200).send("save successfully");
    } catch (error) {
      errorhandler.handleError(error, req, res); 
    }
  },
  GetImage: async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const user = await Users.findById(id);
        if(user) {
            res.download(`upload/${user?.image}`,err=>{
              res.status(404).send(false)
            })
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
