const categoryService = require("../service/category.service");

const createCategory = async (categoryData) => {
  try {
    return await categoryService.createCategory(categoryData);
  } catch (error) {
    throw new Error("Error creating category: " + error.message);
  }
};

const getAllCategories = async () => {
  try {
    return await categoryService.getAllCategories();
  } catch (error) {
    throw new Error("Error fetching categories: " + error.message);
  }
};

const getCategoryById = async (categoryId) => {
  try {
    return await categoryService.getCategoryById(categoryId);
  } catch (error) {
    throw new Error("Error fetching category: " + error.message);
  }
};

const updateCategory = async (categoryId, categoryData) => {
  try {
    return await categoryService.updateCategory(categoryId, categoryData);
  } catch (error) {
    throw new Error("Error updating category: " + error.message);
  }
};

const deleteCategory = async (categoryId) => {
  try {
    await categoryService.deleteCategory(categoryId);
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
