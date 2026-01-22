import { Request } from "express";
export const validateHeaderFields = (req:Request,mustHaveFields: string[]) => {
    // check are must have fields present in req.headers
    for (const field of mustHaveFields) {
        if (!req.headers.hasOwnProperty(field)) {
            return new Error(`Missing required header field: ${field}`);
        }
    }
    return true;    
}