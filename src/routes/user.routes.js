const express = require("express");
const userRouter = express.Router();
const userHandler = require("../Handlers/user.handler");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations related to users
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserPostData:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *       required:
 *         - username
 *         - password
 */

/**
 * @swagger
 * /todo-api-docs/user/register:
 *   post:
 *     summary: Create user
 *     description: Creates a new user.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPostData'
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPostData'
 *       500:
 *         description: Internal server error.
 */
userRouter.post("/register", userHandler.createUserHandler);

/**
 * @swagger
 * /todo-api-docs/user/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and starts a session.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPostData'
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *       401:
 *         description: Invalid username or password.
 *       500:
 *         description: Internal server error.
 */
userRouter.post("/login", userHandler.loginUserHandler);

/**
 * @swagger
 * /todo-api-docs/user/logout:
 *   post:
 *     summary: User logout
 *     description: Logs out a user and ends the session.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Logout successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logout successful
 *       500:
 *         description: Internal server error.
 */
userRouter.post("/logout", userHandler.logoutUserHandler);

/**
 * @swagger
 * /todo-api-docs/user/auth-check:
 *   get:
 *     summary: Check authentication
 *     description: Checks if the user is authenticated.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Authenticated
 *       401:
 *         description: Not authenticated.
 *       500:
 *         description: Internal server error.
 */
userRouter.get("/auth-check", userHandler.checkAuthHandler);

module.exports = userRouter;
