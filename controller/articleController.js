import categoryModel from "../models/Category.js";
import userModel from "../models/User.js";
import commentModel from "../models/Comments.js";
import newsModel from "../models/News.js";

const allarticle = async (req, res) => {
  try {
    const articles = await newsModel
      .find()
      .populate("category","categoryName")
      .populate("author","fullName");
    // res.json(articles);
    res.render("admin/articles/index", { role: req.role, articles });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const addArticlePage = async (req, res) => {
  const categories = await categoryModel.find();
  res.render("admin/articles/create", { role: req.role, categories });
};
const addArticle = async (req, res) => {
  const { newsTitle, newsDescription, category } = req.body;
  const article = new newsModel({
    newsTitle,
    newsDescription,
    category,
    author: req.user._id,
    newsImage: req.file ? req.file.filename : null,
  });
  await article.save();
  res.redirect("/admin/article");
};
const updateArticlePage = async (req, res) => {
  res.render("admin/articles/update", { role: req.role });
};
const updateArticle = async (req, res) => {};
const deleteArticle = async (req, res) => {};

export {
  allarticle,
  addArticlePage,
  addArticle,
  updateArticlePage,
  updateArticle,
  deleteArticle,
};
