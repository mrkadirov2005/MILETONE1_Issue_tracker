import type { Request, Response, NextFunction } from "express";
import { tokenVerifier } from "../middlewares/tokenVerifyMiddleware.ts";
export const verifyTokenController=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const isValidToken= await tokenVerifier(req);
        if(!isValidToken){
            return res.status(401).json({message:"Invalid token"});
        }
        return res.status(200).json({message:"Valid token"});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",error});
    }
}