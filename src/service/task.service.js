const { Task } = require("../db");

const createTask = async (taskData) => {
  try {
    taskData.isCompleted = false;
    return await Task.create(taskData);
  } catch (error) {
    throw new Error("Error creating task: " + error.message);
  }
};

const getAllTasks = async () => {
  try {
    const tasks = await Task.findAll();
    return tasks;
  } catch (error) {
    throw new Error("Error fetching tasks in service: " + error.message);
  }
};

const getTaskById = async (taskId) => {
  try {
    const task = await Task.findByPk(taskId);
    return task;
  } catch (error) {
    throw new Error("Error fetching task in service: " + error.message);
  }
};

const updateTask = async (taskId, taskData) => {
  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      throw new Error("Task not found");
    }
    const updatedTask = await task.update(taskData);
    return updatedTask;
  } catch (error) {
    throw new Error("Error updating task in service: " + error.message);
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
    throw new Error("Error deleting task in service: " + error.message);
  }
};

const getAllTasksByCategoryAndUser = async (categoryId, userId) => {
  try {
    const tasks = await Task.findAll({
      where: {
        category_id: categoryId,
        user_id: userId,
      },
    });
    return tasks;
  } catch (error) {
    throw new Error("Error fetching tasks in service: " + error.message);
  }
};

const getTaskForToday = async (userId, startDate, endDate) => {
  try {
    const tasks = await Task.findAll({
      where: {
        user_id: userId,
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    return tasks;
  } catch (error) {
    throw new Error(
      "Error fetching tasks for today in service: " + error.message
    );
  }
};

const getAllCompletedTasks = async (userId) => {
  try {
    const tasks = await Task.findAll({
      where: {
        user_id: userId,
        isCompleted: true,
      },
    });
    return tasks;
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
