const { Category } = require("../db");

const createCategory = async (categoryData) => {
  return await Category.create(categoryData);
};

const getAllCategories = async () => {
  return await Category.findAll();
};

const getCategoryById = async (categoryId) => {
  return await Category.findByPk(categoryId);
};

const updateCategory = async (categoryId, categoryData) => {
  await Category.update(categoryData, { where: { category_id: categoryId } });
  return await Category.findByPk(categoryId);
};

const deleteCategory = async (categoryId) => {
  return await Category.destroy({ where: { category_id: categoryId } });
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
