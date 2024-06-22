const categoryController = require("../controllers/category.controller");

const createCategoryHandler = async (req, res) => {
  try {
    const category = await categoryController.createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCategoriesHandler = async (req, res) => {
  try {
    const categories = await categoryController.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCategoryByIdHandler = async (req, res) => {
  try {
    const category = await categoryController.getCategoryById(
      req.params.categoryId
    );
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCategoryHandler = async (req, res) => {
  try {
    const category = await categoryController.updateCategory(
      req.params.categoryId,
      req.body
    );
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCategoryHandler = async (req, res) => {
  try {
    await categoryController.deleteCategory(req.params.categoryId);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCategoryHandler,
  getAllCategoriesHandler,
  getCategoryByIdHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
};
