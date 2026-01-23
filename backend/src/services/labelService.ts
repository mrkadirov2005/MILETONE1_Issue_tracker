import type {Request} from "express";
import { assignLabelToIssueRepository, createLabelRepository, deleteLabelRepository, getlabelsRepository, unassignLabelFromIssueRepository, updateLabelRepository } from "../repositories/labelRepository.ts";
export const createLabelService=async(req: Request)=>{

const { label_name, user_id } = req.body as { label_name: string, user_id: string };
if(!label_name || !user_id){
    throw new Error("Label name and User ID are required");
}
const isCreated= await createLabelRepository(label_name, user_id);
if(!isCreated){
    throw new Error("Could not create label");
};
return isCreated;
}

export const getLabelsService=async()=>{
   
    const labels=await getlabelsRepository();
    return labels;
}

export const updateLabelService=async(req: Request)=>{
    
    const {user_id}=req.body;
    if(!user_id){
        throw new Error("User ID is required in headers");
    }
    const { label_id, label_name } = req.body as { label_id: string, label_name: string };
    console.log(label_id,label_name)
    if(!label_id || !label_name){
        throw new Error("Label ID and Label name are required");
    }
    const isUpdated= await updateLabelRepository(user_id, label_id, label_name);
    if(!isUpdated){
        throw new Error("Could not update label");
    }
    return isUpdated;

}

export const deleteLabelService=async(req: Request)=>{
   
    const { label_id, user_id } = req.body as { label_id: string, user_id: string };
    if(!label_id || !user_id){
        throw new Error("Label ID and User ID are required");
    }

   
    const isDeleted= await deleteLabelRepository(user_id, label_id);
    if(!isDeleted){
        throw new Error("Could not delete label");
    }
    return isDeleted;
}


// assign label to issue service
export const assignLabelToIssueService=async(req: Request)=>{
  
    // proceed with assign label to issue logic
    const { issue_id, label_id } = req.body as { issue_id: string, label_id: string };    
    // double check for the issue_id and label_id
    if(!issue_id || !label_id){
        throw new Error("Issue ID and Label ID are required");
    }
    // now implement the assign label to issue logic in the repository
    const isAssigned= await assignLabelToIssueRepository(issue_id, label_id);
    if(!isAssigned){
        throw new Error("Could not assign label to issue");
    }
    return isAssigned;
}

export const unassignLabelFromIssueService=async(req: Request)=>{
   
    // proceed with unassign label from issue logic
    const { issue_id, label_id } = req.body as { issue_id: string, label_id: string };    
    // double check for the issue_id and label_id
    if(!issue_id || !label_id){
        throw new Error("Issue ID and Label ID are required");
    }
    // now implement the unassign label from issue logic in the repository
    const isUnassigned= await unassignLabelFromIssueRepository(issue_id, label_id);
    if(!isUnassigned){
        throw new Error("Could not unassign label from issue");
    }
    return isUnassigned;
}   
