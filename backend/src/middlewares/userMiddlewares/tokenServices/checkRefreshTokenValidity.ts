import type { RefreshToken } from "../../../utils/types.ts";

export const checkTokenValidityService = async (token:RefreshToken): Promise<boolean> => {
    const currentTime = new Date();
    const expiryTime = new Date(token.expires_at);
    return currentTime < expiryTime;
}