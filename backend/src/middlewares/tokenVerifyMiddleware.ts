import type { Request } from "express";
import {verifyJWT} from "./userMiddlewares/tokenServices/jwtService.ts";
export const tokenVerifier=async(req:Request):Promise<boolean>=>{
    const token=req.headers.authorization?.split(" ")[1];
    console.log(token)
    if(!token){
        return false;
    }
    else{
        try {
             verifyJWT(token,process.env.ACCESS_TOKEN_SECRET as string);
        } catch (error) {
            return false;
        }
    }
    return true; 
}