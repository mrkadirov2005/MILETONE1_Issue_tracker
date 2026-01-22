import type {Request} from "express";
import { assignLabelToIssueRepository, createLabelRepository, deleteLabelRepository, getlabelsRepository, unassignLabelFromIssueRepository, updateLabelRepository } from "../repositories/labelRepository.ts";
export const createLabelService=async(req: Request)=>{

// check the body parameters which are required for creating a label
const { label_name, user_id } = req.body as { label_name: string, user_id: string };
// doubel check  the label_name and the user_id
if(!label_name || !user_id){
    throw new Error("Label name and User ID are required");
}
// time to implement the label repository
// use the createLabelRepository function to create a label
const isCreated= await createLabelRepository(label_name, user_id);
if(!isCreated){
    throw new Error("Could not create label");
};
return isCreated;
}

export const getLabelsService=async()=>{
    // implement the get labels service here
   
    // proceed with getting the labels from the repository
    const labels=await getlabelsRepository();
    return labels;
}

export const updateLabelService=async(req: Request)=>{
    // implement the update label service here
    
    // proceed with update logic
    // in order to update the label we need to clarify that the only user is updating
    const {user_id}=req.body;
    if(!user_id){
        throw new Error("User ID is required in headers");
    }
    const { label_id, label_name } = req.body as { label_id: string, label_name: string };
    console.log(label_id,label_name)
    // double check the label_id and label_name
    if(!label_id || !label_name){
        throw new Error("Label ID and Label name are required");
    }
    // now implement the update logic in the repository
    const isUpdated= await updateLabelRepository(user_id, label_id, label_name);
    if(!isUpdated){
        throw new Error("Could not update label");
    }
    return isUpdated;

}

// delete Label service
export const deleteLabelService=async(req: Request)=>{
   
    // proceed with delete logic
    const { label_id, user_id } = req.body as { label_id: string, user_id: string };
    // double check for the label_id and user_id
    if(!label_id || !user_id){
        throw new Error("Label ID and User ID are required");
    }

    // check the body fields validity
    // no need to double check because the validate checks 
    // now implement the delete logic in the repository
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

// 