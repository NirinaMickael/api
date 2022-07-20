import jwt  from 'jsonwebtoken';
import {Request,Response} from 'express'
export const Auth = (req:Request,res:Response,next:any)=>{
    const token = (req.headers.authorization as string).split(' ')[1];
    console.log(token)
    try {
        if(!token) return res.status(401).end();
        let playload;
        try {
            playload = jwt.verify(token,process.env.jwtkey as string);
            return next();
        } catch (err) {
            if(err instanceof jwt.JsonWebTokenError){
                return res.status(401).json({
                    success : false,
                    message : 'Unauthorized!!'
                })
            }else{
                return res.status(401).json({
                    success : false,
                    message : 'Error server!!'
                })
            }
        }
    } catch (error) {
        return res.status(401).json({
            success : false,
            message : 'Error server!!'
        })
    }
}