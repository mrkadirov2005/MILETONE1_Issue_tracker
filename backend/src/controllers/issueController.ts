import type { Request, Response } from "express";
import { createIssueService, deleteIssueService, getAllIssuesService, getIssueByIdService, updateIssueService } from "../services/issueService.ts";
export const createIssue = async (req: Request, res: Response) => {
    try {
       const createIssueServiceResult= await createIssueService(req);
       return res.status(201).json(createIssueServiceResult);
    } catch (error) {
        return res.status(400).json({ error: (error as Error).message });
    }
};


export const updateIssue= async (req: Request, res: Response) => {
    try {
       const updateIssueServiceResult= await updateIssueService(req);
       return res.status(200).json(updateIssueServiceResult);
    } catch (error) {
        return res.status(400).json({ error: (error as Error).message });
    }
};

// get all issues
export const getAllIssues = async (req: Request, res: Response) => {
    try {
        const result=await getAllIssuesService(req);
        return res.status(200).json({ data: result.issues, meta: { page: result.page, limit: result.limit, total: result.total } });
    } catch (error) {
        return res.status(400).json({ error: (error as Error).message });
    }   
};
// delete issue controller
export const deleteIssue= async (req: Request, res: Response) => {
    try {
         const isIssueDeleted= await deleteIssueService(req);
        return res.status(200).json({ message: isIssueDeleted ? "Issue deleted successfully" : "Issue deletion failed" });
    } catch (error) {
        return res.status(400).json({ error: (error as Error).message });
    }
};

export const getIssueById= async (req: Request, res: Response) => {
    try {
        const issue=await getIssueByIdService(req);
        return res.status(200).json(issue);
    }
    catch (error) {
        return res.status(400).json({ error: (error as Error).message });
    }
};

