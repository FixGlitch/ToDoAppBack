const bcrypt = require("bcrypt");
const userService = require("../service/user.service");

const createNewUser = async (userData) => {
  try {
    return await userService.createUser(userData);
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

const getAllUsers = async () => {
  try {
    return await userService.getAllUsers();
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

const getUserById = async (userId) => {
  try {
    return await userService.getUserById(userId);
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

const updateUser = async (userId, userData) => {
  try {
    return await userService.updateUser(userId, userData);
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};

const deleteUser = async (userId) => {
  try {
    await userService.deleteUser(userId);
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};

const createUser = async (userData) => {
  try {
    const { password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    userData.password = hashedPassword;
    return await userService.createUser(userData);
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

const authenticateUser = async (username, password) => {
  try {
    const user = await userService.findUserByUsername(username);
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    return user;
  } catch (error) {
    throw new Error(`Error authenticating user: ${error.message}`);
  }
};

module.exports = {
  createNewUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
  authenticateUser,
};
