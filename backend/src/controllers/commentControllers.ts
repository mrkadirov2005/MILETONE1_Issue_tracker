// comment controllers to manage the comment CRUD
import type { Request,Response } from "express";
import { createCommentService, getCommentsByIssueIdService, updateCommentService, deleteCommentService, getCommentsByUserIdService } from "../services/commentService.ts";

export const createComment=async(req: Request, res: Response)=>{    
    try {
        const createdComment=await createCommentService(req);
        return res.status(201).json({ success: true, data: createdComment });
    } catch (error) {
        return res.status(400).json({ error: (error as Error).message });
    }  
}

export const getCommentsByIssueId=async(req: Request, res: Response)=>{
    try {
        const comments=await getCommentsByIssueIdService(req);
        return res.status(200).json({ success: true, data: comments });
    } catch (error) {
        return res.status(400).json({ error: (error as Error).message });
    }
}
export const updateComment=async(req: Request, res: Response)=>{
    try {
        const updatedComment=await updateCommentService(req);
        return res.status(200).json({ success: true, data: updatedComment });
    } catch (error) {
        return res.status(400).json({ error: (error as Error).message });
    }
}
export const deleteComment=async(req: Request, res: Response)=>{
    try {
        const isDeleted=await deleteCommentService(req);
        return res.status(200).json({ success: true, data: isDeleted });
    } catch (error) {
        return res.status(400).json({ error: (error as Error).message });
    }   
}

export const getCommentsByUserId=async(req: Request, res: Response)=>{
    try {
       const comments=await getCommentsByUserIdService(req);
        return res.status(200).json({ success: true, data: comments });
    } catch (error) {
        return res.status(400).json({ error: (error as Error).message });
    }
}