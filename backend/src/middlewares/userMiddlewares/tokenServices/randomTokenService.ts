import crypto from 'crypto';

// Helper: Generate a secure random token
export const generaterandomTokenService = (length: number = 32): string => {
    return crypto.randomBytes(length).toString('hex');
}