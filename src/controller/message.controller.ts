import { msgModel } from "../model/message.models";
import { Request,Response } from "express";
import { MsgDoc } from "../model/message.interface";
export const viewMessage = (req:Request,res:Response)=>{
     msgModel.find({
        'conversationId': req.params.conversationId
    }).select('senderId messages createdAt').then(resp=>{
        res.status(200).json({
            success: true,
            data : resp
        })
    }).catch(err=>{
        res.status(500).json({
            success : false,
            data : err
        })
    })
}
export const SendMessage = async(req:Request,res:Response)=>{
    try{
        msgModel.create({
            conversationId : req.params.conversationId,
            ...req.body
        },(err: any,msg : MsgDoc)=>{
            if(err) {
                res.json({
                    success :false,
                    data : err
                })
            }else{
                res.json({
                    success : true,
                    data : msg
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