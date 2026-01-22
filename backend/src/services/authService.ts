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
    // check does the user have all body fields
    const { user_email, user_password } = req.body as UserRequestBody; 
    // if user_email or user_password is undefined, throw error
    if (!user_email || !user_password) {
        throw new Error("Email and password are required");
    }
    // if there is an error in validationResult, it will throw an error, we do not have to handle it
    // get user by email to check if already registered
    const existingUser = await getUserByEmail(user_email);
    // if there is an existing user, throw new error
    if (existingUser as User) {
        throw new Error("User already registered with this email");
    } 
    // hash password to store in the db
    const hashedPassword = await hashService(user_password);
    const isCreatedUser= await createUser(user_email, hashedPassword);
    //create a refreshToken for the user
    const refreshToken= generaterandomTokenService();
    // hash the refresh token before storing in db
    const hashedRefreshToken = await hashService(refreshToken);
    // now write it to th db
    const isRecordedToDB=await createToken( isCreatedUser.user_id, hashedRefreshToken, new Date(Date.now() + 7*24*60*60*1000).toISOString());
    // if there is an error in recording token to db throw error
    if(!isRecordedToDB){
        throw new Error("Could not create refresh token for the user");
    }
    // create a new user
    return isCreatedUser as User;
    
}
// user login handler service

export const loginUserService = async (req:Request) => {
    // validate required fields (throws if missing)
    const { user_email, user_password } = req.body as UserRequestBody;
    // if user_email or user_password is undefined, throw error
    if (!user_email || !user_password) {
        throw new Error("Email and password are required");
    }
    // verify the email format
    validateEmailService(user_email);
// fetch user by email
    const user: User | null = await getUserByEmail(user_email);
// if the user is not existing throw the error
    if (!user) throw new Error("User not found");
    // if the user is available then validate the password
    const isValid = await verifyService(user_password, user.user_password_hash);
    // log if the user has provided invalid credentials
    if (!isValid) throw new Error("Invalid credentials");
    // if the user has provided correct credentials provide a token
    const accessToken = generateJWT(user.user_id, process.env.ACCESS_TOKEN_SECRET as string, "1d");
    
    // generate refresh token and store hashed version in database

    // first get the user token from the db and check its validity
    const refreshTokenFromDb= await getRefreshTokenByUserId(user.user_id);
    
    // check if the refresh token still valid
    if (refreshTokenFromDb) {
        const isRefreshTokenValid = await checkTokenValidityService(refreshTokenFromDb as RefreshToken);
        if (isRefreshTokenValid) {
            // token still valid - return it (it's hashed in DB, send as-is to frontend)
            return { user, accessToken, refreshToken: refreshTokenFromDb.token };
        }
    }
    
    // token is expired or doesn't exist - create new one
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