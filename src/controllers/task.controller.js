const taskService = require("../service/task.service");

const createTask = async (taskData) => {
  try {
    return await taskService.createTask(taskData);
  } catch (error) {
    throw new Error("Error creating task: " + error.message);
  }
};

const getAllTasks = async () => {
  try {
    return await taskService.getAllTasks();
  } catch (error) {
    throw new Error("Error fetching tasks: " + error.message);
  }
};

const getTaskById = async (taskId) => {
  try {
    return await taskService.getTaskById(taskId);
  } catch (error) {
    throw new Error("Error fetching task: " + error.message);
  }
};

const updateTask = async (taskId, taskData) => {
  try {
    return await taskService.updateTask(taskId, taskData);
  } catch (error) {
    throw new Error("Error updating task: " + error.message);
  }
};

const deleteTask = async (taskId) => {
  try {
    await taskService.deleteTask(taskId);
  } catch (error) {
    throw new Error("Error deleting task: " + error.message);
  }
};

const toggleTaskStatus = async (taskId) => {
  try {
    const task = await taskService.getTaskById(taskId);
    if (!task) {
      throw new Error("Task not found");
    }
    task.isCompleted = !task.isCompleted;
    await task.save();
    return task;
  } catch (error) {
    throw new Error(
      "Error toggling task status in controller: " + error.message
    );
  }
};

const getAllTasksByCategoryAndUser = async (categoryId, userId) => {
  try {
    return await taskService.getAllTasksByCategoryAndUser(categoryId, userId);
  } catch (error) {
    throw new Error("Error fetching tasks in controller: " + error.message);
  }
};

const getTaskForToday = async (userId) => {
  try {
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    return await taskService.getTaskForToday(userId, todayStart, todayEnd);
  } catch (error) {
    throw new Error(
      "Error fetching task for today in controller: " + error.message
    );
  }
};

const getAllCompletedTasks = async (userId) => {
  try {
    return await taskService.getAllCompletedTasks(userId);
  } catch (error) {
    throw new Error(
      "Error fetching completed tasks in controller: " + error.message
    );
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getAllTasksByCategoryAndUser,
  getTaskForToday,
  toggleTaskStatus,
  getAllCompletedTasks,
};
