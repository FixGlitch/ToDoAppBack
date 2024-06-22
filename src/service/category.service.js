const { Category } = require("../db");

const createCategory = async (categoryData) => {
  try {
    return await Category.create(categoryData);
  } catch (error) {
    throw new Error("Error creating category: " + error.message);
  }
};

const getAllCategories = async () => {
  try {
    return await Category.findAll();
  } catch (error) {
    throw new Error("Error fetching categories: " + error.message);
  }
};

const getCategoryById = async (categoryId) => {
  try {
    return await Category.findByPk(categoryId);
  } catch (error) {
    throw new Error("Error fetching category: " + error.message);
  }
};

const updateCategory = async (categoryId, categoryData) => {
  try {
    await Category.update(categoryData, { where: { category_id: categoryId } });
    return await Category.findByPk(categoryId);
  } catch (error) {
    throw new Error("Error updating category: " + error.message);
  }
};

const deleteCategory = async (categoryId) => {
  try {
    await Category.destroy({ where: { category_id: categoryId } });
  } catch (error) {
    throw new Error("Error deleting category: " + error.message);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
