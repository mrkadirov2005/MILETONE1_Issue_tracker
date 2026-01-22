import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { Request, Response, NextFunction } from 'express';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const logIncomingRequest = (req: Request, res: Response, next: NextFunction) => {
    const logtxt="../../logs/apiLogs.txt";
    const fullPath = path.resolve(__dirname, logtxt);
    const logEntry = `${new Date().toISOString()} - ${req.method} ${req.originalUrl}\n`;
    fs.appendFile(fullPath, logEntry, (err:any) => {
        if (err) {
            console.error('Error logging request:', err);
        }
        
    });
    next();
};