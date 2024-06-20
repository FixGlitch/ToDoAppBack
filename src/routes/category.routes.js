const express = require("express");
const router = express.Router();
const categoryHandler = require("../handlers/category.handler");

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Operations related to categories
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         category_id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier of the category.
 *         name:
 *           type: string
 *           description: The name of the category.
 *         isEditable:
 *           type: boolean
 *           description: Indicates if the category is editable or not.
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: The ID of the user who owns the category.
 *       required:
 *         - name
 *         - user_id
 */

/**
 * @swagger
 * /todo-api-docs/categories:
 *   post:
 *     summary: Create a new category
 *     description: Creates a new category.
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Category created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: Internal server error.
 */
router.post("/", categoryHandler.createCategoryHandler);

/**
 * @swagger
 * /todo-api-docs/categories:
 *   get:
 *     summary: Get all categories
 *     description: Retrieves a list of all categories.
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Internal server error.
 */
router.get("/", categoryHandler.getAllCategoriesHandler);

/**
 * @swagger
 * /todo-api-docs/categories/{categoryId}:
 *   get:
 *     summary: Get category by ID
 *     description: Retrieves a category by its ID.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         description: ID of the category to retrieve
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Category retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:categoryId", categoryHandler.getCategoryByIdHandler);

/**
 * @swagger
 * /todo-api-docs/categories/{categoryId}:
 *   put:
 *     summary: Update category
 *     description: Updates an existing category.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         description: ID of the category to update
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: Internal server error.
 */
router.put("/:categoryId", categoryHandler.updateCategoryHandler);

/**
 * @swagger
 * /todo-api-docs/categories/{categoryId}:
 *   delete:
 *     summary: Delete category
 *     description: Deletes an existing category by its ID.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         description: ID of the category to delete
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Category deleted successfully.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:categoryId", categoryHandler.deleteCategoryHandler);

module.exports = router;
