import type { Request } from "express";
import { createIssueRepository, deleteIssueByIdRepository, getTotalIssuesCountRepository, getIssueByIdRepository, updateIssueByIdRepository, getAllIssuesWithLabelsRepository } from "../repositories/issueRepository.ts";
import { getUserById } from "../repositories/userRepository.ts";
import type { CreateIssueRequestBody } from "../utils/types.ts";

export const createIssueService=async(req: Request)=>{

const { issue_details, issue_status, issue_priority, created_by, assigned_to } = req.body as CreateIssueRequestBody & { assigned_to?: string | null };
if(!issue_details || !issue_status || !issue_priority || !created_by){
    throw new Error("All fields are required to create an issue");
}

const isUserExisting=await getUserById(created_by);
if(!isUserExisting){
    throw new Error("User creating the issue does not exist");
}

if(assigned_to){
    const isAssignedUserExisting=await getUserById(assigned_to);
    if(!isAssignedUserExisting){
        throw new Error("Assigned user does not exist");
    }
}

const isIssueCreated=await createIssueRepository(issue_details, issue_status, issue_priority, created_by, assigned_to || null);

return isIssueCreated;
}

export const getIssueByIdService=async(req:Request)=>{
 console.log(req.query);
    
    const issueId=req.query.issue_id as never as string;
    const issueData=await getIssueByIdRepository(issueId);
    return issueData;
}

export const updateIssueService=async(req:Request)=>{
    const { issue_details, issue_status, issue_priority, created_by, issue_id, assigned_to } = req.body as CreateIssueRequestBody & { issue_id: string, assigned_to?: string | null };
    if(!issue_id || !issue_details || !issue_status || !issue_priority || !created_by){
        throw new Error("All fields are required to update an issue");
    }

    if(assigned_to){
        const isAssignedUserExisting=await getUserById(assigned_to);
        if(!isAssignedUserExisting){
            throw new Error("Assigned user does not exist");
        }
    }

    const updatedIssue=await updateIssueByIdRepository(issue_id, issue_details, issue_status, issue_priority, created_by, assigned_to || null);
    return updatedIssue;
}

export const getAllIssuesService=async(req:Request)=>{
   
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 100);
    const page = Math.max(parseInt(req.query.page as string) || 1, 1);
    const offset = (page - 1) * limit;
    const search = (req.query.search as string) || '';
    const issueStatus= (req.query.status as string) || '';
    const issuePriority= (req.query.priority as string) || '';
    const label_id = (req.query.label as string) || '';

   console.log(label_id)

    const issuesWithLabelsRows = await getAllIssuesWithLabelsRepository(limit, offset, search, issueStatus, issuePriority, label_id);
    const total = await getTotalIssuesCountRepository();
    
    return { issues: issuesWithLabelsRows, page, limit, total };
}


export const deleteIssueService=async(req:Request)=>{
console.log(req.query); 
    // proceed with checking the issue id in params using the function of paramsValidator
    const issueId=req.query.issue_id as never as string;
    const created_by=req.query.created_by as never as string;
    if(!issueId){
        throw new Error("Issue ID is required in query parameters");
    }
    // if all of the user fields are provided now we can continue with deleting teh users

   
    if(!created_by){
        console.log("created_by is missing",created_by);
        throw new Error("User ID is required to delete the issue");
    }
    const isIssueDeleted=await deleteIssueByIdRepository(issueId,created_by);
    return isIssueDeleted;
}

