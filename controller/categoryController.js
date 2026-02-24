import categoryModel from "../models/Category.js";
const allCategory = async (req, res) => {
    const categories = await categoryModel.find();

  res.render("admin/category/index", {categories,  role: req.role });
};
const addCategoryPage = async (req, res) => {
  res.render("admin/category/create", {role: req.role });
};
const addCategory = async (req, res) => {
  const { categoryName, description } = req.body;

  try {
    if (!categoryName || !categoryName.trim()) {
      return res.status(400).send("Category name is required");
    }

    await categoryModel.create({
      categoryName: categoryName.trim(),
      description,
    });

    return res.redirect("/admin/category");
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(409).send("Category already exists");
    }
    return res.status(500).send(error.message);
  }
};
const updateCategoryPage = async (req, res) => {
  res.render("admin/category/update", { role: req.role });
};
const updateCategory = async (req, res) => {};
const deleteCategory = async (req, res) => {
  try {
    const category = await categoryModel.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export {
  allCategory,
  addCategoryPage,
  addCategory,
  updateCategoryPage,
  updateCategory,
  deleteCategory,
};
