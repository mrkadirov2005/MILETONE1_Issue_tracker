import type { Request } from "express";
import { createIssueRepository, deleteIssueByIdRepository, getTotalIssuesCountRepository, getIssueByIdRepository, updateIssueByIdRepository, getAllIssuesWithLabelsRepository } from "../repositories/issueRepository.ts";
import { getUserById } from "../repositories/userRepository.ts";
import type { CreateIssueRequestBody, Issue } from "../utils/types.ts";

export const createIssueService=async(req: Request)=>{
// create the logic to create an issue

// proceed with issue creation logic here
// check the body fields
const { issue_details, issue_status, issue_priority, created_by } = req.body as CreateIssueRequestBody;
// double check for the required fields
if(!issue_details || !issue_status || !issue_priority || !created_by){
    throw new Error("All fields are required to create an issue");
}

// before creating an issue, check is the user existing
const isUserExisting=await getUserById(created_by);
if(!isUserExisting){
    throw new Error("User creating the issue does not exist");
}
// use create issue from the repository
const isIssueCreated=await createIssueRepository(issue_details, issue_status, issue_priority, created_by);

return isIssueCreated;
}

export const getIssueByIdService=async(req:Request)=>{
 
    // proceed with checking the issue id in params using the function of paramsValidator
    // sample token format
    // http://localhost:5000/issue/6f639b9-cd16-4647-af97-431a89f8af2e
    // extract the id
    const issueId=req.headers["issue_id"] as never as string
    // now get the issue from the repository
    const issueData=await getIssueByIdRepository(issueId);
    return issueData;
}

export const updateIssueService=async(req:Request)=>{
   
    // proceed with checking the issue id in params using the function of paramsValidator
    // validateParamFields(req, ['issue-id']);
  
    // validate the body fields for update
    // if the fields are valid
    // exract the fields from the body
    const { issue_details, issue_status, issue_priority, created_by, issue_id } = req.body as CreateIssueRequestBody & { issue_id: string };
    // double check for the required fields
    if(!issue_id || !issue_details || !issue_status || !issue_priority || !created_by){
        throw new Error("All fields are required to update an issue");
    }

    // now update the issue in the repository
    const updatedIssue=await updateIssueByIdRepository(issue_id, issue_details, issue_status, issue_priority, created_by);
    return updatedIssue;
}

export const getAllIssuesService=async(req:Request)=>{
   
    // proceed with getting all issues from the repository
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
    // add the label by filtering to the issues
    // Group rows by issue_id to organize labels
    const issuesMap = new Map();
    issuesWithLabelsRows.forEach((row: any) => {
        if (!issuesMap.has(row.issue_id)) {
            issuesMap.set(row.issue_id, {
                issue_id: row.issue_id,
                issue_details: row.issue_details,
                issue_status: row.issue_status,
                issue_priority: row.issue_priority,
                created_at: row.created_at,
                updated_at: row.updated_at,
                created_by: row.created_by,
                labels: []
            });
        }
        if (row.label_id) {
            issuesMap.get(row.issue_id).labels.push({
                label_id: row.label_id,
                label_name: row.label_name
            });
        }
    });
    
    const issues = Array.from(issuesMap.values());
    console.log(issues)
    return { issues, page, limit, total };
}


export const deleteIssueService=async(req:Request)=>{

    // proceed with checking the issue id in params using the function of paramsValidator
    const issueId=req.headers["issue_id"] as never as string;
    if(!issueId){
        throw new Error("Issue ID is required in headers");
    }
    // if all of the user fields are provided now we can continue with deleting teh users

    const { created_by } = req.body as CreateIssueRequestBody;
    if(!created_by){
        throw new Error("User ID is required to delete the issue");
    }
    const isIssueDeleted=await deleteIssueByIdRepository(issueId,created_by);
    return isIssueDeleted;
}

export const getIssuesByLabel=async(label_id:string):Promise<Issue>=>{
    // implement the get issues by label service here
    // proceed with getting the issues from the repository
    const issues=await getIssuesByLabel(label_id);
    return issues;
}