// routes to connect:
// auth/register
// auth/login

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_email:
 *                 type: string
 *                 example: "muzaffr571181@gmail.com"
 *               user_password:
 *                 type: string
 *                 example: "Ifromurgut2005$"
 *             required:
 *               - user_email
 *               - user_password
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid request or user already exists
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user and get JWT tokens
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_email:
 *                 type: string
 *                 example: "muzaffr571181@gmail.com"
 *               user_password:
 *                 type: string
 *                 example: "Ifromurgut2005$"
 *             required:
 *               - user_email
 *               - user_password
 *     responses:
 *       200:
 *         description: Login successful, returns JWT tokens
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /auth/users:
 *   get:
 *     summary: Get all users (for assignment purposes)
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       401:
 *         description: Unauthorized
 */

import {Router} from "express";
const router=Router();
import { loginUser, registerUser, getAllUsersController } from "../controllers/authControllers.ts";

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/users', getAllUsersController);

export default router;