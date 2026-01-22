// routes to handle
// comment/add/:issue-id
// comment/delete/:comment-id
// comment/update/:comment-id
// comment/issue-comments/:issue-id
// comment/user-comments/:user-id
// comment/:comment-id

/**
 * @swagger
 * /comment/add:
 *   post:
 *     summary: Create a new comment
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment_details:
 *                 type: string
 *                 example: "This issue needs urgent attention"
 *               issue_id:
 *                 type: string
 *                 format: uuid
 *               user_id:
 *                 type: string
 *                 format: uuid
 *             required:
 *               - comment_details
 *               - issue_id
 *               - user_id
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Invalid request
 */

/**
 * @swagger
 * /comment/issue:
 *   get:
 *     summary: Get all comments for an issue
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: issue_id
 *         in: header
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: List of comments for the issue
 */

/**
 * @swagger
 * /comment/user:
 *   get:
 *     summary: Get all comments by user
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *             required:
 *               - user_id
 *     responses:
 *       200:
 *         description: List of comments by user
 */

/**
 * @swagger
 * /comment/update:
 *   put:
 *     summary: Update a comment
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment_id:
 *                 type: string
 *                 format: uuid
 *               comment_details:
 *                 type: string
 *               user_id:
 *                 type: string
 *                 format: uuid
 *             required:
 *               - comment_id
 *               - comment_details
 *               - user_id
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       403:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /comment/delete:
 *   delete:
 *     summary: Delete a comment
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment_id:
 *                 type: string
 *                 format: uuid
 *               user_id:
 *                 type: string
 *                 format: uuid
 *             required:
 *               - comment_id
 *               - user_id
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       403:
 *         description: Unauthorized
 */

import { Router } from "express";
import { createComment, deleteComment, getCommentsByIssueId, getCommentsByUserId, updateComment} from "../controllers/commentControllers.ts";
const router = Router();
router.post('/add', createComment);
router.put('/update', updateComment);
router.delete('/delete',deleteComment);
router.get('/issue',getCommentsByIssueId);
router.get('/user',getCommentsByUserId);

export default router;