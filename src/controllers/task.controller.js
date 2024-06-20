const taskService = require("../services/task.service");

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

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
