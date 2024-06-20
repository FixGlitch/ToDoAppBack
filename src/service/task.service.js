const { Task } = require("../db");

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
