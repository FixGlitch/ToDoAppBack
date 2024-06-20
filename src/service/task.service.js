const { Task } = require("../db/models");

const createTask = async (taskData) => {
  try {
    return await Task.create(taskData);
  } catch (error) {
    throw new Error("Error creating task: " + error.message);
  }
};

const getAllTasks = async () => {
  try {
    return await Task.findAll();
  } catch (error) {
    throw new Error("Error fetching tasks: " + error.message);
  }
};

const getTaskById = async (taskId) => {
  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      throw new Error("Task not found");
    }
    return task;
  } catch (error) {
    throw new Error("Error fetching task: " + error.message);
  }
};

const updateTask = async (taskId, taskData) => {
  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      throw new Error("Task not found");
    }
    await task.update(taskData);
    return task;
  } catch (error) {
    throw new Error("Error updating task: " + error.message);
  }
};

const deleteTask = async (taskId) => {
  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      throw new Error("Task not found");
    }
    await task.destroy();
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
