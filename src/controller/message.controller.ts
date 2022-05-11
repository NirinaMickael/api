import { msgModel } from "../model/message.models";
import { Request,Response } from "express";
import { MsgDoc } from "../model/message.interface";
export const viewMessage = (req:Request,res:Response)=>{
     msgModel.find({
        'conversationId': req.params.conversationId
    }).select('senderId messages createdAt').then(data=>{
        res.status(200).json({
            success : true,
            response :data
        })
    }).catch(err=>{
        res.status(500).json({
            success : false,
            err
        })
    })
}
export const SendMessage = async(req:Request,res:Response)=>{
    try{
        msgModel.create({
            conversationId : req.params.conversationId,
            ...req.body
        },(err: any,data : MsgDoc)=>{
            if(err) {
                res.json({
                    success :false,
                    err
                })
            }else{
                res.json({
                    success : true,
                    data
                })
            }
        })
    }catch(err){
        res.status(500).json({
            err,
            success :false
        })
    }
}