import bcrypt from 'bcrypt';
// Helper: Hash token before storing
export const hashService = async (token: string): Promise<string> => {
    const SALT_ROUNDS = 10;
    return bcrypt.hash(token, SALT_ROUNDS);
};

// Helper: Verify token by comparing plain with hashed
export const verifyService = async (plainToken: string, hashedToken: string): Promise<boolean> => {
    return bcrypt.compare(plainToken, hashedToken);
};
