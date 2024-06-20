const userController = require("../controllers/user.controller");

const errorHandler = (res, error) => {
  console.error(error);
  res.status(500).json({ message: error.message });
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

module.exports = {
  createUserHandler,
  loginUserHandler,
  logoutUserHandler,
  checkAuthHandler,
};
