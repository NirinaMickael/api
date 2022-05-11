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
                    ...response
                )
            }else{
                conversationModels.create({
                    members : [req.params.senderId,req.params.receiveId]
                },(err,data)=>{
                    if(err){
                        res.json({
                            success : false,
                            err
                        })
                    }else{
                        res.json(data)
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
    }).then(data=>{
        res.status(200).json({
            success : true, 
            response :data
        })
    }).catch(err=>{
        res.status(500).json({
            err
        })
    })
}
