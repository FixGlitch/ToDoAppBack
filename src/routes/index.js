const express = require("express");
const router = express.Router();
const userRoutes = require("./user.routes");
const categoryRoutes = require("./category.routes");
const taskRoutes = require("./task.routes");

router.use("/user", userRoutes);
router.use("/categories", categoryRoutes);
router.use("/tasks", taskRoutes);

module.exports = router;
