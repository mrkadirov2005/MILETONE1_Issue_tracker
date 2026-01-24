import jwt from "jsonwebtoken";

export function generateJWT(userId: string, secretKey: string, expiresIn: string): string {
    const token = jwt.sign({ userId }, secretKey, { expiresIn: expiresIn } as jwt.SignOptions);
    return token;
}

export const verifyJWT = (token: string, secretKey: string): string | jwt.JwtPayload => {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    }
    catch (error) {
        throw new Error("Invalid token");
    }
}
