import {Request,Response} from "express"
export default class UserHandleError {
    constructor () {}
    handleError (err : any , req:Request , res : Response) {
        try {
            if(err.name == "ValidationError"){
                this.handleValidationError(req,res,err["errors"])
            }else{
                this.handleDuplicateKeyError(req,res,err)
            }  
        } catch(err){
            res.status(500).send(err)
        }
    }
    handleValidationError(req : Request,res :Response ,err : any) {
         const field  = Object.keys(err)[0] as any;
        const errorMessage = err[field].message;
        return res.status(400).json({
            message : errorMessage
        } )
    }
     handleDuplicateKeyError (req:Request, res:Response ,err : any){
        const field = err.message.split(':')[2].split(' ')[1];
        const code = 409;
        const error = `An account with that ${field} already exists.`;
       return  res.status(code).json({
           message : error
       });
    }
}
