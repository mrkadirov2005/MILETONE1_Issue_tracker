import type { Request } from "express";
export const validateParamFields = (req:Request,mustHaveFields: string[]) => {
    // check are must have fields present in req.params
    for (const field of mustHaveFields) {
        if (!req.params.hasOwnProperty(field)) {
            return new Error(`Missing required param field: ${field}`);
        }   
    }
    return true;    
}