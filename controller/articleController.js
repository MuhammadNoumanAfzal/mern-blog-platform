import categoryModel from "../models/Category.js";
import userModel from "../models/User.js";
import commentModel from "../models/Comments.js";



const allarticle = async (req, res) => {
    res.render("admin/articles/index", { role: req.role });
 }
const addArticlePage = async (req, res) => { 
    res.render("admin/articles/create", { role: req.role });
}
const addArticle = async (req, res) => { }
const updateArticlePage = async (req, res) => {
        res.render("admin/articles/update", { role: req.role });
 }
const updateArticle = async (req, res) => { }
const deleteArticle = async (req, res) => { }


export  {
    allarticle,
    addArticlePage,
    addArticle,
    updateArticlePage,
    updateArticle,
    deleteArticle
}