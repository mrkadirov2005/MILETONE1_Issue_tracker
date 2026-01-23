import type { Request } from "express";
import { createCommentRepository, deleteCommentByIdRepository, getCommentsByIssueIdRepository, getCommentsByUserIdRepository, updateCommentByIdRepository } from "../repositories/commentsRepository.ts";
import type { CommentRequestBody, UpdateCommentRequestBody } from "../utils/types.ts";

export const createCommentService=async(req: Request)=>{
    const { comment_details, issue_id, user_id } = req.body as CommentRequestBody;
    if(!comment_details || !issue_id || !user_id){
        throw new Error("Comment details, Issue ID and User ID are required");
    }
    const createdComment= await createCommentRepository(issue_id,comment_details,user_id);
    if(!createdComment){
        throw new Error("Could not create comment");
    }
    return createdComment;
}

export const getCommentsByIssueIdService=async(req: Request)=>{ 
    console.log(req.query);
    const issue_id = req.query.issue_id as never as { issue_id: string };
    if(!issue_id){
        throw new Error("Issue ID is required");
    }
    const comments= await getCommentsByIssueIdRepository(issue_id as unknown as string);
    return comments;
}
export const updateCommentService=async(req: Request)=>{
    const { comment_id , comment_details, user_id } = req.body as UpdateCommentRequestBody;
    if(!comment_id || !comment_details || !user_id){
        console.log(req.body)
        console.log("comment_id:", comment_id, "comment_details:", comment_details, "user_id:", user_id)
        throw new Error("Comment ID, Comment details and User ID are required");
    }
    const isUpdated= await updateCommentByIdRepository(comment_id, comment_details, user_id);
    if(!isUpdated){
        throw new Error("Could not update comment");
    }
    return isUpdated;
}

export const deleteCommentService=async(req: Request)=>{
    const  comment_id  = req.query.comment_id as string;
    const user_id = req.query.user_id as string;
    
    if(!comment_id || !user_id){
        throw new Error("Comment ID and User ID are required");
    }
    const isDeleted= await deleteCommentByIdRepository(comment_id, user_id);
    if(!isDeleted){
        throw new Error("Could not delete comment");
    }
    return isDeleted;
}

export const getCommentsByUserIdService=async(req: Request)=>{
    const user_id = req.query.user_id as string;
    if(!user_id){
        throw new Error("User ID is required");
    }
    const comments= await getCommentsByUserIdRepository(user_id);
    return comments;
}