// all user based repository level actions are here
import client from "../config/dbClient.ts";
import { v4 as uuidv4 } from 'uuid';
import type { User } from "../utils/types.ts";
// function to create a new user
export const createUser = async (email: string, hashedPassword: string): Promise<User> => {
    const userId = uuidv4();
    // implement try catch to catch db errors
    try {
        const result = await client.query(
            'INSERT INTO users (user_id, user_email, user_password_hash) VALUES ($1, $2, $3) RETURNING *',
            [userId, email, hashedPassword]
        );
        return result.rows[0];
    }
    catch (error) {
        throw new Error("Error creating user: " + (error as Error).message);
    }
  
}
// to get a user by email or by id
export const getUserByEmail = async (email: string): Promise<User | null> => {
    const result = await client.query(
        'SELECT * FROM users WHERE user_email = $1',
        [email]
    );
    return result.rows[0] || null;
}
// to get user by id
export const getUserById = async (userId: string): Promise<User | null> => {
    const result = await client.query(
        'SELECT * FROM users WHERE user_id = $1',
        [userId]
    );
    return result.rows[0] || null;
}
// deleting the user by id
export const deleteUserById = async (userId: string): Promise<boolean> => {
    const result = await client.query(
        'DELETE FROM users WHERE user_id = $1',
        [userId]
    );
    return result.rowCount as number > 0;
}

// Get all users (for assignment purposes)
export const getAllUsers = async (): Promise<User[]> => {
    const result = await client.query(
        'SELECT user_id, user_email, created_at FROM users ORDER BY user_email'
    );
    return result.rows;
}