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
    const category = await Category.findByPk(categoryId);
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  } catch (error) {
    throw new Error("Error fetching category: " + error.message);
  }
};

const updateCategory = async (categoryId, categoryData) => {
  try {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      throw new Error("Category not found");
    }
    await category.update(categoryData);
    return category;
  } catch (error) {
    throw new Error("Error updating category: " + error.message);
  }
};

const deleteCategory = async (categoryId) => {
  try {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      throw new Error("Category not found");
    }
    await category.destroy();
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
