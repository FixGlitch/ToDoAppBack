const express = require("express");
const router = express.Router();
const userRoutes = require("./user.routes");
const categoryRoutes = require("./category.routes");
const taskRoutes = require("./task.routes");

router.use("/user", userRoutes);
router.use("/category", categoryRoutes);
router.use("/task", taskRoutes);
module.exports = router;
