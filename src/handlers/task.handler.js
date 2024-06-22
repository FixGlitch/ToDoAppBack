const taskController = require("../controllers/task.controller");

const createTaskHandler = async (req, res) => {
  try {
    const task = await taskController.createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTasksHandler = async (req, res) => {
  try {
    const tasks = await taskController.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTaskByIdHandler = async (req, res) => {
  try {
    const task = await taskController.getTaskById(req.params.taskId);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTaskHandler = async (req, res) => {
  try {
    const task = await taskController.updateTask(req.params.taskId, req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTaskHandler = async (req, res) => {
  try {
    await taskController.deleteTask(req.params.taskId);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTaskHandler,
  getAllTasksHandler,
  getTaskByIdHandler,
  updateTaskHandler,
  deleteTaskHandler,
};
