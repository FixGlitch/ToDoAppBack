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

const getAllTasksByCategoryAndUser = async (categoryId, userId) => {
  try {
    const tasks = await Task.findAll({
      where: {
        categoryId,
        userId,
      },
    });
    return tasks;
  } catch (error) {
    throw new Error("Error fetching tasks in service: " + error.message);
  }
};

const getTaskForToday = async (userId, todayStart, todayEnd) => {
  try {
    const task = await Task.findOne({
      where: {
        userId,
        createdAt: {
          $gte: todayStart,
          $lte: todayEnd,
        },
      },
    });
    return task;
  } catch (error) {
    throw new Error(
      "Error fetching task for today in service: " + error.message
    );
  }
};

const getAllCompletedTasks = async (userId) => {
  try {
    return await Task.findAll({
      where: {
        user_id: userId,
        isCompleted: true,
      },
    });
  } catch (error) {
    throw new Error(
      "Error fetching completed tasks in service: " + error.message
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
  getAllCompletedTasks,
};
