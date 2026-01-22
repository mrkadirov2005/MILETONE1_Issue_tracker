// comment service to manage the CRUD operation success or failure
import type { Request } from "express";
import { createCommentRepository, deleteCommentByIdRepository, getCommentsByIssueIdRepository, getCommentsByUserIdRepository, updateCommentByIdRepository } from "../repositories/commentsRepository.ts";
import type { CommentRequestBody, deleteCommentRequestBody, UpdateCommentRequestBody } from "../utils/types.ts";

export const createCommentService=async(req: Request)=>{
    // validate the body fields
    const { comment_details, issue_id, user_id } = req.body as CommentRequestBody;
    // double check for the required fields
    if(!comment_details || !issue_id || !user_id){
        throw new Error("Comment details, Issue ID and User ID are required");
    }
    // now implement the create comment logic in the repository
    const createdComment= await createCommentRepository(issue_id,comment_details,user_id);
    if(!createdComment){
        throw new Error("Could not create comment");
    }
    return createdComment;
}

export const getCommentsByIssueIdService=async(req: Request)=>{ 
    console.log(req.query);
    // validate the body fields
    const issue_id = req.query.issue_id as never as { issue_id: string };
    // double check for the issue_id
    if(!issue_id){
        throw new Error("Issue ID is required");
    }
    // now implement the get comments by issue id logic in the repository
    const comments= await getCommentsByIssueIdRepository(issue_id as unknown as string);
    return comments;
}
export const updateCommentService=async(req: Request)=>{
    // validate the body fields
    const { comment_id , comment_details, user_id } = req.body as UpdateCommentRequestBody;
    // double check for the required fields
    if(!comment_id || !comment_details || !user_id){
        console.log(req.body)
        console.log("comment_id:", comment_id, "comment_details:", comment_details, "user_id:", user_id)
        throw new Error("Comment ID, Comment details and User ID are required");
    }
    // now implement the update comment logic in the repository
    const isUpdated= await updateCommentByIdRepository(comment_id, comment_details, user_id);
    if(!isUpdated){
        throw new Error("Could not update comment");
    }
    return isUpdated;
}

export const deleteCommentService=async(req: Request)=>{
    // validate the body fields
    const  comment_id  = req.query.comment_id as string;
    const user_id = req.query.user_id as string;
    
    // double check for the required fields
    if(!comment_id || !user_id){
        throw new Error("Comment ID and User ID are required");
    }
    // now implement the delete comment logic in the repository
    const isDeleted= await deleteCommentByIdRepository(comment_id, user_id);
    if(!isDeleted){
        throw new Error("Could not delete comment");
    }
    return isDeleted;
}

// function to get the issues by user_id
export const getCommentsByUserIdService=async(req: Request)=>{
    // proceed with checking the user id in query params
    const user_id = req.query.user_id as string;
    // double check for the user_id
    if(!user_id){
        throw new Error("User ID is required");
    }
    // now get the comments from the repository
    const comments= await getCommentsByUserIdRepository(user_id);
    return comments;
}