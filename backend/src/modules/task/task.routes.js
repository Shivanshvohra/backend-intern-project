const express = require("express");
const router = express.Router();
const taskController = require("./task.controller");
const { authenticate } = require("../../middleware/auth.middleware");

router.use(authenticate);

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Finish assignment
 *     responses:
 *       201:
 *         description: Task created
 */
router.post("/", taskController.create);

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get all tasks for logged in user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get("/", taskController.getMyTasks);

router.put("/:id", taskController.update);
router.delete("/:id", taskController.remove);

module.exports = router;