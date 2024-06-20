const { User } = require("../db");

const createUserService = async ({ username, password }) => {
  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      throw new Error("Username is already in use");
    }
    const user = await User.create({ username, password });
    return user;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

const findUserByUsernameService = async (username) => {
  try {
    return await User.findOne({ where: { username } });
  } catch (error) {
    throw new Error(`Error finding user: ${error.message}`);
  }
};

module.exports = {
  createUserService,
  findUserByUsernameService,
};
