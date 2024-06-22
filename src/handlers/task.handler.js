const taskController = require("../controllers/task.controller");

const createTaskHandler = async (req, res) => {
  const taskData = req.body;
  try {
    const newTask = await taskController.createTask(taskData);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Error creating task: " + error.message });
  }
};

const getAllTasksHandler = async (req, res) => {
  try {
    const tasks = await taskController.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks: " + error.message });
  }
};

const getTaskByIdHandler = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await taskController.getTaskById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error fetching task: " + error.message });
  }
};

const updateTaskHandler = async (req, res) => {
  const { taskId } = req.params;
  const taskData = req.body;
  try {
    const updatedTask = await taskController.updateTask(taskId, taskData);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Error updating task: " + error.message });
  }
};

const deleteTaskHandler = async (req, res) => {
  const { taskId } = req.params;
  try {
    await taskController.deleteTask(taskId);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task: " + error.message });
  }
};

const toggleTaskStatusHandler = async (req, res) => {
  const { taskId } = req.params;
  try {
    const updatedTask = await taskController.toggleTaskStatus(taskId);
    res.status(200).json(updatedTask);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error toggling task status: " + error.message });
  }
};

const getAllTasksByCategoryAndUserHandler = async (req, res) => {
  const { categoryId, userId } = req.params;
  try {
    const tasks = await taskController.getAllTasksByCategoryAndUser(
      categoryId,
      userId
    );
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks: " + error.message });
  }
};

const getTaskForTodayHandler = async (req, res) => {
  const { userId } = req.params;
  try {
    const tasks = await taskController.getTaskForToday(userId);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks: " + error.message });
  }
};

const getAllCompletedTasksHandler = async (req, res) => {
  const { userId } = req.params;
  try {
    const tasks = await taskController.getAllCompletedTasks(userId);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks: " + error.message });
  }
};

module.exports = {
  createTaskHandler,
  getAllTasksHandler,
  getTaskByIdHandler,
  updateTaskHandler,
  deleteTaskHandler,
  toggleTaskStatusHandler,
  getAllTasksByCategoryAndUserHandler,
  getTaskForTodayHandler,
  getAllCompletedTasksHandler,
};
