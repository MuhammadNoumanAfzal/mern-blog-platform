import categoryModel from "../models/Category.js";
const allCategory = async (req, res) => { 
    res.render("admin/category/index", { role: req.role });
}
const addCategoryPage = async (req, res) => {
    res.render("admin/category/create", { role: req.role });
 }
const addCategory = async (req, res) => { }
const updateCategoryPage = async (req, res) => {
        res.render("admin/category/update", { role: req.role });
 }
const updateCategory = async (req, res) => { }
const deleteCategory = async (req, res) => { }

export {
    allCategory,
    addCategoryPage,
    addCategory,
    updateCategoryPage,
    updateCategory,
    deleteCategory
}
