const categoryController = require("../controllers/category.controller");

const createCategoryHandler = async (req, res) => {
  const categoryData = req.body;
  try {
    const newCategory = await categoryController.createCategory(categoryData);
    res.status(201).json(newCategory);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating category: " + error.message });
  }
};

const getAllCategoriesHandler = async (req, res) => {
  try {
    const categories = await categoryController.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching categories: " + error.message });
  }
};

const getCategoryByIdHandler = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const category = await categoryController.getCategoryById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching category: " + error.message });
  }
};

const updateCategoryHandler = async (req, res) => {
  const { categoryId } = req.params;
  const categoryData = req.body;
  try {
    const updatedCategory = await categoryController.updateCategory(
      categoryId,
      categoryData
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating category: " + error.message });
  }
};

const deleteCategoryHandler = async (req, res) => {
  const { categoryId } = req.params;
  try {
    await categoryController.deleteCategory(categoryId);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting category: " + error.message });
  }
};

module.exports = {
  createCategoryHandler,
  getAllCategoriesHandler,
  getCategoryByIdHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
};
