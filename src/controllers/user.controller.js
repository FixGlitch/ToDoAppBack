const bcrypt = require("bcrypt");
const {
  createUserService,
  findUserByUsernameService,
} = require("../service/user.service");

const createUser = async (userData) => {
  try {
    const { password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    userData.password = hashedPassword;
    return await createUserService(userData);
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

const authenticateUser = async (username, password) => {
  try {
    const user = await findUserByUsernameService(username);
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
  createUser,
  authenticateUser,
};
