/**
 * @swagger
 * /token/verify:
 *   get:
 *     summary: Verify JWT token validity
 *     tags:
 *       - Token
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token is valid
 *       401:
 *         description: Token is invalid or expired
 */

import {Router} from "express";
import {verifyTokenController} from "../controllers/tokenControllers.ts";

const router=Router();

router.get('/verify',verifyTokenController);

export default router;