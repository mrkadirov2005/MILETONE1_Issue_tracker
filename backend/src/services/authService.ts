import { hashService, verifyService } from "../middlewares/userMiddlewares/tokenServices/hashService.ts";
import { generaterandomTokenService } from "../middlewares/userMiddlewares/tokenServices/randomTokenService.ts";
import {  createToken, getRefreshTokenByUserId, updateRefreshToken } from "../repositories/tokenRepository.ts";
import { createUser, getUserByEmail } from "../repositories/userRepository.ts";
import type { RefreshToken, User, UserRequestBody } from "../utils/types.ts";
import { validateEmailService } from "../middlewares/userMiddlewares/validateEmail.ts";
import { generateJWT } from "../middlewares/userMiddlewares/tokenServices/jwtService.ts";
import { checkTokenValidityService } from "../middlewares/userMiddlewares/tokenServices/checkRefreshTokenValidity.ts";

import type {Request} from "express";
// user registration handler service
export const registerUserService = async (req:Request): Promise<User> => {
    const { user_email, user_password } = req.body as UserRequestBody; 
    if (!user_email || !user_password) {
        throw new Error("Email and password are required");
    }
    const existingUser = await getUserByEmail(user_email);
    if (existingUser as User) {
        throw new Error("User already registered with this email");
    } 
    const hashedPassword = await hashService(user_password);
    const isCreatedUser= await createUser(user_email, hashedPassword);
    const refreshToken= generaterandomTokenService();
    const hashedRefreshToken = await hashService(refreshToken);
    const isRecordedToDB=await createToken( isCreatedUser.user_id, hashedRefreshToken, new Date(Date.now() + 7*24*60*60*1000).toISOString());
    if(!isRecordedToDB){
        throw new Error("Could not create refresh token for the user");
    }
    return isCreatedUser as User;
    
}

export const loginUserService = async (req:Request) => {
    const { user_email, user_password } = req.body as UserRequestBody;
    if (!user_email || !user_password) {
        throw new Error("Email and password are required");
    }
    validateEmailService(user_email);
    const user: User | null = await getUserByEmail(user_email);
    if (!user) throw new Error("User not found");
    const isValid = await verifyService(user_password, user.user_password_hash);
    if (!isValid) throw new Error("Invalid credentials");
    const accessToken = generateJWT(user.user_id, process.env.ACCESS_TOKEN_SECRET as string, "1d");
    

    const refreshTokenFromDb= await getRefreshTokenByUserId(user.user_id);
    
    if (refreshTokenFromDb) {
        const isRefreshTokenValid = await checkTokenValidityService(refreshTokenFromDb as RefreshToken);
        if (isRefreshTokenValid) {
            return { user, accessToken, refreshToken: refreshTokenFromDb.token };
        }
    }
    
    const newRefreshToken = generaterandomTokenService();
    const hashedNewToken = await hashService(newRefreshToken);
    const hasUpdatedRefreshToken = await updateRefreshToken(user.user_id, hashedNewToken, "7d");
    
    if(hasUpdatedRefreshToken){
        return { user, accessToken, refreshToken: newRefreshToken };
    }
    else{
        throw new Error("Could not update refresh token");
    }
};