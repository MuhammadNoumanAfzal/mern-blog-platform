import categoryModel from "../models/Category.js";
import userModel from "../models/User.js";
import commentModel from "../models/Comments.js";
import newsModel from "../models/News.js";



const allarticle = async (req, res) => {
  try {
    const filter = req.role === "admin" ? {} : { author: req.user._id };

    const articles = await newsModel
      .find(filter)
      .populate("category", "categoryName")
      .populate("author", "fullName")
      .sort({ createdAt: -1 }); 

    return res.render("admin/articles/index", {
      role: req.role,
      articles,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
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
  try {
    const article = await newsModel
      .findById(req.params.id)
      .populate("category", "categoryName")
      .populate("author", "fullName");
    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }
    const categories = await categoryModel.find();
    res.render("admin/articles/update", {
      role: req.role,
      article,
      categories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const updateArticle = async (req, res) => {};
const deleteArticle = async (req, res) => {
  try {
    const article = await newsModel.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Article deleted",
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
  allarticle,
  addArticlePage,
  addArticle,
  updateArticlePage,
  updateArticle,
  deleteArticle,
};
