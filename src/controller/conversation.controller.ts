import conversationModels from "../model/conversation.models";
import { Request,Response } from "express";
export const NewConversation =async (req:Request,res:Response) => {
    try {
        conversationModels.find({
            members : {
                $all : [req.params.senderId,req.params.receiveId]
            }
        }).then(response=>{
            if(response.length){
                res.json(
                   {
                    success : true ,
                    data : response
                   }
                )
            }else{
                conversationModels.create({
                    members : [req.params.senderId,req.params.receiveId]
                },(err,conv)=>{
                    if(err){
                        res.json({
                            success : false,
                            data : err
                        })
                    }else{
                        res.json({
                            success : true,
                            data : conv
                        })
                    }
                })
            }
        }).catch(err=>{
            res.status(500).json({
                err
            })
        })
    } catch (error) {
        res.json({
            success : false,
            error
        })
    }
}
export const GetAllconversation = async (req : Request,res:Response) =>{
    conversationModels.find({
        members : {$in :[req.params.userId]}
    }).then(conv=>{
        res.status(200).json({
            success: true,
            data : conv
        })
    }).catch(err=>{
        res.status(500).json({
            success : false ,
            data : err
        })
    })
}

export const GetConversation = async (req : Request , res: Response) => {
    try {
        conversationModels.findOne({
            members : {
                $all : [req.params.userId , req.params.otherId] 
            }
        }).then( response => {
            res.json({
                success: true,
                data : response
            })
        })
    } catch (error) {
        res.json(error);
    }
}