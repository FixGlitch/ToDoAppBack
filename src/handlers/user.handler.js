const userController = require("../controllers/user.controller");

const createNewUserHandler = async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await userController.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: `Error creating user: ${error.message}` });
  }
};

const getAllUsersHandler = async (req, res) => {
  try {
    const users = await userController.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: `Error fetching users: ${error.message}` });
  }
};

const getUserByIdHandler = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userController.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: `Error fetching user: ${error.message}` });
  }
};

const updateUserHandler = async (req, res) => {
  const { userId } = req.params;
  const userData = req.body;
  try {
    const updatedUser = await userController.updateUser(userId, userData);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: `Error updating user: ${error.message}` });
  }
};

const deleteUserHandler = async (req, res) => {
  const { userId } = req.params;
  try {
    await userController.deleteUser(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: `Error deleting user: ${error.message}` });
  }
};

const createUserHandler = async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await userController.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    errorHandler(res, error);
  }
};

const loginUserHandler = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userController.authenticateUser(username, password);
    req.session.userId = user.user_id;
    res.json({ message: "Login successful" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const logoutUserHandler = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return errorHandler(res, err);
    }
    res.json({ message: "Logout successful" });
  });
};

const checkAuthHandler = async (req, res) => {
  if (req.session.userId) {
    res.json({ message: "Authenticated" });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
};

const errorHandler = (res, error) => {
  console.error(error);
  res.status(500).json({ message: error.message });
};

module.exports = {
  createNewUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserHandler,
  createUserHandler,
  loginUserHandler,
  logoutUserHandler,
  checkAuthHandler,
};
