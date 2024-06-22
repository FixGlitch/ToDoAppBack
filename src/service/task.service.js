const { Task } = require("../db");

const createTask = async (taskData) => {
  return await Task.create(taskData);
};

const getAllTasks = async () => {
  return await Task.findAll();
};

const getTaskById = async (taskId) => {
  return await Task.findByPk(taskId);
};

const updateTask = async (taskId, taskData) => {
  await Task.update(taskData, { where: { task_id: taskId } });
  return await Task.findByPk(taskId);
};

const deleteTask = async (taskId) => {
  return await Task.destroy({ where: { task_id: taskId } });
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
