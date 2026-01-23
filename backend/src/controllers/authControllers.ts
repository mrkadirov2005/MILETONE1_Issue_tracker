import type { Request, Response } from "express";
import { loginUserService, registerUserService } from "../services/authService.ts";
import { getAllUsers } from "../repositories/userRepository.ts";
import type { User } from "../utils/types.ts";


export const registerUser = async (req: Request, res: Response) => {
    try {
       const createdUser:User = await registerUserService(req);
       return res.status(201).json(createdUser);
    } catch (error) {
        return res.status(400).json({ error: (error as Error).message });
    }
}

export const loginUser = async (req: Request, res: Response) => {
   try {
    const isLoggedIn= await loginUserService(req);
    return res.status(200).json(isLoggedIn);
   } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
   }
}

export const getAllUsersController = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: (error as Error).message });
    }
}
