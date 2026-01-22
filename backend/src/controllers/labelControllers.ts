import { assignLabelToIssueService, createLabelService, deleteLabelService, getLabelsService, unassignLabelFromIssueService, updateLabelService } from "../services/labelService.ts";
import type { Request,Response } from "express";

export const createLabel=async(req: Request, res: Response)=>{
    try {
        const result = await createLabelService(req);
       return res.status(201).json({ success: true, data: result });
    } catch (error) {
        return res.status(400).json({ error: (error as Error).message });
    }
    // implement the create label service here
}
export const getLabels=async(req:Request,res: Response)=>{
    // implement the logicn here
    
    try {
        const labels=await getLabelsService();
        return res.status(200).json({ success: true, data: labels });
    } catch (error) {
        return res.status(400).json({ error: (error as Error).message });
    }
}
export const updateLabel=async(req: Request, res: Response)=>{
    // implement the logic here
    try
    {
        const result = await updateLabelService(req);
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        
        return res.status(403).json({ error: "You are not allowed to update this label" });

    }
}   


export const deleteLabel=async(req: Request, res: Response)=>{
    // implement the delete label controller here
    try {
        const isDeleted=await deleteLabelService(req);
        return res.status(200).json({ success: true, data: isDeleted });
    } catch (error) {
        return res.status(400).json({ error: (error as Error).message });
    }
}        

export const AssignLabelToIssue=async(req: Request, res: Response)=>{
    // implement the assign label to issue controller here
    try {
        const isAssignedInService=await assignLabelToIssueService(req);
        return res.status(200).json({ success: true, data: isAssignedInService });
    } catch (error) {
        return res.status(400).json({ error: (error as Error).message });
    }
}


export const UnassignLabelFromIssue=async(req: Request, res: Response)=>{
    // implement the unassign label from issue controller here
    try {
        const isUnassignedInService=await unassignLabelFromIssueService(req);
        return res.status(200).json({ success: true, data: isUnassignedInService });
    } catch (error) {
        return res.status(400).json({ error: (error as Error).message });
    }   
}