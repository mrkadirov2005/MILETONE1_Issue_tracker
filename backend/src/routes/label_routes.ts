// implement the label routes here

/**
 * @swagger
 * /label/add:
 *   post:
 *     summary: Create a new label
 *     tags:
 *       - Labels
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               label_name:
 *                 type: string
 *                 example: "Bug"
 *               user_id:
 *                 type: string
 *                 format: uuid
 *             required:
 *               - label_name
 *               - user_id
 *     responses:
 *       201:
 *         description: Label created successfully
 *       400:
 *         description: Invalid request
 */

/**
 * @swagger
 * /label/all:
 *   get:
 *     summary: Get all labels
 *     tags:
 *       - Labels
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all labels
 */

/**
 * @swagger
 * /label/assign:
 *   post:
 *     summary: Assign label to issue
 *     tags:
 *       - Labels
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
 *               label_id:
 *                 type: string
 *                 format: uuid
 *             required:
 *               - issue_id
 *               - label_id
 *     responses:
 *       200:
 *         description: Label assigned successfully
 *       400:
 *         description: Invalid request
 */

/**
 * @swagger
 * /label/update:
 *   put:
 *     summary: Update a label
 *     tags:
 *       - Labels
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               label_id:
 *                 type: string
 *                 format: uuid
 *               label_name:
 *                 type: string
 *               user_id:
 *                 type: string
 *                 format: uuid
 *             required:
 *               - label_id
 *               - label_name
 *               - user_id
 *     responses:
 *       200:
 *         description: Label updated successfully
 *       403:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /label/delete:
 *   delete:
 *     summary: Delete a label
 *     tags:
 *       - Labels
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               label_id:
 *                 type: string
 *                 format: uuid
 *               user_id:
 *                 type: string
 *                 format: uuid
 *             required:
 *               - label_id
 *               - user_id
 *     responses:
 *       200:
 *         description: Label deleted successfully
 *       403:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /label/unassign:
 *   post:
 *     summary: Unassign label from issue
 *     tags:
 *       - Labels
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
 *               label_id:
 *                 type: string
 *                 format: uuid
 *             required:
 *               - issue_id
 *               - label_id
 *     responses:
 *       200:
 *         description: Label unassigned successfully
 *       400:
 *         description: Invalid request
 */

import {Router} from "express";
import { createLabel, getLabels, updateLabel,deleteLabel, AssignLabelToIssue, UnassignLabelFromIssue } from "../controllers/labelControllers.ts";
const router=Router();
router.post('/add',createLabel)
router.get('/all',getLabels)
router.put('/update',updateLabel);
router.delete('/delete',deleteLabel)
router.post('/assign',AssignLabelToIssue)
router.post('/unassign',UnassignLabelFromIssue)
export default router;