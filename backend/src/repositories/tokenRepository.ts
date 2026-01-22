import client from "../config/dbClient.ts";
import type { RefreshToken } from "../utils/types.ts";

// function to create the token
export const createToken = async (userId: string, token: string, expiresAt: string): Promise<boolean> => {
    const result = await client.query(
        'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
        [userId, token, expiresAt]
    );
    return result.rowCount as number > 0;
}

// function to get token by user id
export const getRefreshTokenByUserId = async (userId: string): Promise<RefreshToken | null> => {
    const result = await client.query(
        'SELECT token, expires_at FROM refresh_tokens WHERE user_id = $1',
        [userId]
    );
    return result.rows[0];
}
export const updateRefreshToken = async (userId: string, token: string, expiresAt: string): Promise<boolean> => {
    const result = await client.query(
        'UPDATE refresh_tokens SET token = $1, expires_at = $2 WHERE user_id = $3',
        [token, expiresAt, userId]
    );
    return result.rowCount as number > 0;
}