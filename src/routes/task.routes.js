const express = require("express");
const router = express.Router();
const taskHandler = require("../handlers/task.handler");

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Operations related to tasks
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         task_id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier of the task.
 *         name:
 *           type: string
 *           description: The name of the task.
 *         description:
 *           type: string
 *           description: The description of the task.
 *         status:
 *           type: string
 *           description: The status of the task.
 *         due_date:
 *           type: string
 *           format: date-time
 *           description: The due date of the task.
 *         category_id:
 *           type: string
 *           format: uuid
 *           description: The ID of the category to which the task belongs.
 *       required:
 *         - name
 *         - status
 */

/**
 * @swagger
 * /todo-api-docs/tasks:
 *   post:
 *     summary: Create a new task
 *     description: Creates a new task.
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Task created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       500:
 *         description: Internal server error.
 */
router.post("/", taskHandler.createTaskHandler);

/**
 * @swagger
 * /todo-api-docs/tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Retrieves a list of all tasks.
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of tasks retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       500:
 *         description: Internal server error.
 */
router.get("/", taskHandler.getAllTasksHandler);

/**
 * @swagger
 * /todo-api-docs/tasks/{taskId}:
 *   get:
 *     summary: Get task by ID
 *     description: Retrieves a task by its ID.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         description: ID of the task to retrieve
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Task retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:taskId", taskHandler.getTaskByIdHandler);

/**
 * @swagger
 * /todo-api-docs/tasks/{taskId}:
 *   put:
 *     summary: Update task
 *     description: Updates an existing task.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         description: ID of the task to update
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Task updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       500:
 *         description: Internal server error.
 */
router.put("/:taskId", taskHandler.updateTaskHandler);

/**
 * @swagger
 * /todo-api-docs/tasks/{taskId}:
 *   delete:
 *     summary: Delete task
 *     description: Deletes an existing task by its ID.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         description: ID of the task to delete
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Task deleted successfully.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:taskId", taskHandler.deleteTaskHandler);

/**
 * @swagger
 * /api/tasks/{taskId}/toggle:
 *   patch:
 *     summary: Toggle task completion status
 *     description: Toggles the completion status of a task.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         description: ID of the task to toggle status
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Task completion status toggled successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message
 *       404:
 *         description: Task not found.
 *       500:
 *         description: Internal server error.
 */
router.patch('/:taskId/toggle', taskHandler.toggleTaskStatusHandler);

/**
 * @swagger
 * /todo-api-docs/tasks/{categoryId}:
 *   get:
 *     summary: Get all tasks by category and user
 *     description: Retrieves all tasks belonging to a specific category and user.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         description: ID of the category to retrieve tasks for
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: userId
 *         description: ID of the user to retrieve tasks for
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: List of tasks retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       404:
 *         description: No tasks found for the category and user.
 *       500:
 *         description: Internal server error.
 */
router.get("/:categoryId", taskHandler.getAllTasksByCategoryAndUserHandler);

/**
 * @swagger
 * /todo-api-docs/tasks/fortoday:
 *   get:
 *     summary: Get task for today
 *     description: Retrieves a task for today based on user ID.
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: userId
 *         description: ID of the user to retrieve the task for
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Task for today retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: No task found for today and user.
 *       500:
 *         description: Internal server error.
 */
router.get('/fortoday', taskHandler.getTaskForTodayHandler);

/**
 * @swagger
 * /todo-api-docs/tasks/completed:
 *   get:
 *     summary: Get all completed tasks for a user
 *     description: Retrieves all completed tasks for a specific user.
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: userId
 *         description: ID of the user to fetch completed tasks
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: List of completed tasks retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       500:
 *         description: Internal server error.
 */
router.get('/completed', taskHandler.getAllCompletedTasksHandler);

module.exports = router;
