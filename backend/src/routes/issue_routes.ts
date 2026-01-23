// issue/add
// issue/delete/:issue-id
// issue/update/:issue-id
// issue/user-issues/:user-id
// issue/label-issues/:label-id
// issue/:issue-id

/**
 * @swagger
 * /issue/add:
 *   post:
 *     summary: Create a new issue
 *     tags:
 *       - Issues
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               issue_details:
 *                 type: string
 *                 example: "Fix login button styling"
 *               issue_status:
 *                 type: string
 *                 enum: ['todo', 'in-progress', 'done', 'cancelled']
 *                 example: "todo"
 *               issue_priority:
 *                 type: string
 *                 enum: ['low', 'medium', 'high']
 *                 example: "high"
 *               created_by:
 *                 type: string
 *                 format: uuid
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *               assigned_to:
 *                 type: string
 *                 format: uuid
 *                 nullable: true
 *                 example: "550e8400-e29b-41d4-a716-446655440001"
 *             required:
 *               - issue_details
 *               - issue_status
 *               - issue_priority
 *               - created_by
 *     responses:
 *       201:
 *         description: Issue created successfully
 *       400:
 *         description: Invalid request
 */

/**
 * @swagger
 * /issue/all:
 *   get:
 *     summary: Get all issues with optional filters
 *     tags:
 *       - Issues
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: search
 *         in: query
 *         schema:
 *           type: string
 *       - name: status
 *         in: query
 *         schema:
 *           type: string
 *           enum: ['todo', 'in-progress', 'done', 'cancelled']
 *       - name: priority
 *         in: query
 *         schema:
 *           type: string
 *           enum: ['low', 'medium', 'high']
 *       - name: label
 *         in: query
 *         schema:
 *           type: string
 *           description: Filter by label name
 *     responses:
 *       200:
 *         description: List of issues with pagination
 */

/**
 * @swagger
 * /issue/by_id:
 *   get:
 *     summary: Get issue by ID
 *     tags:
 *       - Issues
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: issue_id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Issue details with associated labels
 *       404:
 *         description: Issue not found
 */

/**
 * @swagger
 * /issue/update:
 *   put:
 *     summary: Update an issue by ID
 *     tags:
 *       - Issues
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               issue_id:
 *                 type: string
 *                 format: uuid
 *               issue_details:
 *                 type: string
 *               issue_status:
 *                 type: string
 *                 enum: ['todo', 'in-progress', 'done', 'cancelled']
 *               issue_priority:
 *                 type: string
 *                 enum: ['low', 'medium', 'high']
 *               created_by:
 *                 type: string
 *                 format: uuid
 *             required:
 *               - issue_id
 *               - issue_details
 *               - issue_status
 *               - issue_priority
 *               - created_by
 *     responses:
 *       200:
 *         description: Issue updated successfully
 *       403:
 *         description: Unauthorized - can only update your own issues
 */

/**
 * @swagger
 * /issue/delete:
 *   delete:
 *     summary: Delete an issue by ID
 *     tags:
 *       - Issues
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: issue_id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - name: created_by
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Issue deleted successfully
 *       403:
 *         description: Unauthorized - can only delete your own issues
 */

import {Router} from "express";
const router=Router();

import { createIssue, deleteIssue, getAllIssues, getIssueById, updateIssue } from "../controllers/issueController.ts";

router.post('/add',createIssue);
router.get('/by_id',getIssueById);
router.get('/all',getAllIssues);
router.delete('/delete',deleteIssue);
router.put('/update',updateIssue);
export default router;
