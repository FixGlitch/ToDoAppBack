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
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res
      .status(200)
      .json({ message: "Task completion status toggled successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Error toggling task completion status: " + error.message,
    });
  }
};

const getAllTasksByCategoryAndUserHandler = async (req, res) => {
  const { categoryId } = req.params;
  const { userId } = req.query;
  try {
    const tasks = await taskController.getAllTasksByCategoryAndUser(
      categoryId,
      userId
    );
    if (!tasks || tasks.length === 0) {
      return res
        .status(404)
        .json({ error: "No tasks found for the category and user" });
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks: " + error.message });
  }
};

const getTaskForTodayHandler = async (req, res) => {
  const { userId } = req.query;
  try {
    const task = await taskController.getTaskForToday(userId);
    if (!task) {
      return res
        .status(404)
        .json({ error: "No task found for today and user" });
    }
    res.status(200).json(task);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching task for today: " + error.message });
  }
};

const getAllCompletedTasksHandler = async (req, res) => {
  const { userId } = req.query;
  try {
    const completedTasks = await taskController.getAllCompletedTasks(userId);
    res.status(200).json(completedTasks);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching completed tasks: " + error.message });
  }
};

module.exports = {
  createTaskHandler,
  getAllTasksHandler,
  getTaskByIdHandler,
  updateTaskHandler,
  deleteTaskHandler,
  getAllTasksByCategoryAndUserHandler,
  getTaskForTodayHandler,
  toggleTaskStatusHandler,
  getAllCompletedTasksHandler,
};
