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
